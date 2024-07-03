import { EMOJI } from '~/constants';
import Component, { ComponentProps } from '~/core/components/Component';
import { emojiAPI } from '~/service';
import { Emoji } from '~/types';
import observer from '~/utils/observer';

interface EmojiSelectorState {
  emojis: {
    name: keyof typeof EMOJI.CATEGORY;
    emoji: Emoji[];
  }[];
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

export default class EmojiSelector extends Component<
  undefined,
  EmojiSelectorState
> {
  static emojiCategory: typeof EMOJI.CATEGORY = EMOJI.CATEGORY;
  static categoryKeys = Object.keys(EMOJI.CATEGORY);
  emojiIndex: number;
  prevScroll: number;

  constructor({
    $target,
    props,
    state,
  }: ComponentProps<undefined, EmojiSelectorState>) {
    super({ $target, props, state });
    this.state = {
      emojis: [],
    };
    this.emojiIndex = 0;
    this.prevScroll = 0;

    this.updateIndex(0);
  }

  async updateIndex(nextIndex: number) {
    if (this.state === undefined) return;
    if (nextIndex >= EmojiSelector.categoryKeys.length) return;

    this.emojiIndex = nextIndex;
    const $emojiBody = document.querySelector('.emoji-body');
    const emojiData = await emojiAPI.getEmojiByGroup(
      EmojiSelector.categoryKeys[this.emojiIndex]
    );
    const categoryKey = EmojiSelector.categoryKeys[this.emojiIndex];
    const scroll = $emojiBody?.scrollTop;

    if (emojiData === undefined) return;
    if (isCategoryKeys(categoryKey)) {
      this.prevScroll = scroll ?? 0;
      this.setState({
        ...this.state,
        emojis: [...this.state.emojis, { name: categoryKey, emoji: emojiData }],
      });
    }
  }

  async updated() {
    const $emojiItems = document.querySelectorAll('.emoji-item');
    const $emojiBody = document.querySelector('.emoji-body');

    if ($emojiItems && $emojiBody) {
      const lastEmoji = $emojiItems[$emojiItems.length - 1];
      $emojiBody.scrollTo(0, this.prevScroll);

      if (lastEmoji instanceof HTMLElement) {
        observer({
          target: lastEmoji,
          callback: () => {
            this.updateIndex(this.emojiIndex + 1);
          },
        });
      }
    }
  }

  template(): string {
    return `
      <div class='emoji-container'>
        <div class='emoji-header'>
          <div class='emoji-input-container'>
            <input class='emoji-input' placeholder='키워드로 이모지를 검새해보세요!' />
          </div>
          <div class='emoji-button-container'>
            <button class='emoji-button'>삭제</button>
          </div>
        </div>
        ${
          this.state
            ? `<div class='emoji-body'>
                ${this.state.emojis
                  .map(
                    (emoji) =>
                      `<div class='emoji-ul'>
                        <div class='emoji-category'>${
                          EMOJI.CATEGORY[emoji.name]
                        }</div>
                        <div class='emoji-li'>${emoji.emoji
                          .map(
                            (emoji) =>
                              `<span class='emoji-item'>${emoji.character}</span>`
                          )
                          .join('')}</div>
                      </div> `
                  )
                  .join('')}
                </div>`
            : `<div class='emoji-none'>이모지를 불러오는 중이에요...</div>`
        }

      </div>
    `;
  }
}
