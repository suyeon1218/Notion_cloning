import Component, { ComponentProps } from '~/core/components/Component';
import { Emoji } from '~/types';
import { EMOJI } from '~/constants';
import { emojiAPI } from '~/service';
import { observer } from '~/utils';
import { EmojiError } from '~/service/emojiAPI';

interface EmojiListProps {
  keyword: string;
}

interface EmojiListState {
  emojis: {
    name: string;
    emoji: Emoji[];
  }[];
}

function isEmojiData(emojiData: Emoji[] | EmojiError): emojiData is Emoji[] {
  if (Array.isArray(emojiData)) {
    return true;
  }

  return false;
}

function isCategoryKeys(key: string): key is keyof typeof EMOJI.CATEGORY {
  const categoryKeys = Object.keys(EMOJI.CATEGORY);

  for (const categoryKey of categoryKeys) {
    if (categoryKey === key) {
      return true;
    }
  }

  return false;
}

export default class EmojiList extends Component<
  EmojiListProps,
  EmojiListState
> {
  static emojiCategory: typeof EMOJI.CATEGORY = EMOJI.CATEGORY;
  static categoryKeys = Object.keys(EMOJI.CATEGORY);
  emojiIndex: number;
  prevScroll: number;

  constructor({ $target, props }: ComponentProps<EmojiListProps>) {
    super({ $target, props });
    this.emojiIndex = 0;
    this.prevScroll = 0;
    this.state = {
      emojis: [],
    };

    this.mounted();
  }

  async mounted() {
    if (this.props === undefined) return;
    const { keyword } = this.props;

    if (keyword.trim().length === 0) {
      this.updateIndex();
      return;
    }

    const emojiData = await emojiAPI.getEmojiByKeyword(keyword);

    if (emojiData !== undefined && isEmojiData(emojiData)) {
      this.emojiIndex = 0;
      this.setState({
        emojis: [
          {
            name: keyword,
            emoji: emojiData,
          },
        ],
      });
    }
  }

  async updateIndex() {
    if (this.$target === null || this.state === undefined) return;

    const emojiData = await emojiAPI.getEmojiByGroup(
      EmojiList.categoryKeys[this.emojiIndex]
    );
    const categoryKey = EmojiList.categoryKeys[this.emojiIndex];
    const scroll = this.$target.scrollTop;

    if (emojiData === undefined) return;
    if (isCategoryKeys(categoryKey)) {
      this.prevScroll = scroll ?? 0;
      this.setState({
        ...this.state,
        emojis: [...this.state.emojis, { name: categoryKey, emoji: emojiData }],
      });
    }
  }

  updated() {
    const $emojiItems = document.querySelectorAll('.emoji-item');

    if ($emojiItems && this.$target) {
      const lastEmoji = $emojiItems[$emojiItems.length - 1];
      this.$target.scrollTo(0, this.prevScroll);

      if (lastEmoji instanceof HTMLElement) {
        observer({
          target: lastEmoji,
          callback: () => {
            this.emojiIndex += 1;
            this.emojiIndex < EmojiList.categoryKeys.length &&
              this.updateIndex();
          },
        });
      }
    }
  }

  template(): string {
    return `
    ${
      this.state
        ? this.state.emojis
            .map(
              (emoji) =>
                `<div class='emoji-ul'>
              <div class='emoji-category'>${
                isCategoryKeys(emoji.name)
                  ? EMOJI.CATEGORY[emoji.name]
                  : emoji.name
              }</div>
              <div class='emoji-li'>${emoji.emoji
                .map(
                  (emoji) =>
                    `<span class='emoji-item'>${emoji.character}</span>`
                )
                .join('')}</div>
              </div> `
            )
            .join('')
        : ''
    }
    `;
  }
}
