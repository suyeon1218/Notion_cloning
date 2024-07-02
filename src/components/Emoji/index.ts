import { EMOJI } from '~/constants';
import Component, { ComponentProps } from '~/core/components/Component';
import { emojiAPI } from '~/service';
import { Emoji } from '~/types';

interface EmojiState {
  emojiIndex: number;
  emojis: Emoji[];
}

export default class EmojiSelector extends Component<undefined, EmojiState> {
  static emojiCategory: typeof EMOJI.CATEGORY = EMOJI.CATEGORY;

  constructor({
    $target,
    props,
    state,
  }: ComponentProps<undefined, EmojiState>) {
    super({ $target, props, state });
    this.state = {
      emojis: [],
      emojiIndex: 0,
    };

    this.mounted();
  }

  async mounted(): Promise<void> {
    if (this.state === undefined) return;
    const categoryKeys = Object.keys(EmojiSelector.emojiCategory);

    const initialEmoji = await emojiAPI.getEmojiByGroup(
      categoryKeys[this.state.emojiIndex]
    );

    if (initialEmoji) {
      this.setState({
        ...this.state,
        emojis: [...initialEmoji],
      });
    }
  }

  updated() {}

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
                      `<span class='emoji-item'>${emoji.character}</span>`
                  )
                  .join('')}
                </div>`
            : `<div class='emoji-none'>이모지를 불러오는 중이에요...</div>`
        }

      </div>
    `;
  }
}
