import Component from '~/core/components/Component';
import EmojiList from './EmojiList';
import { debounce } from '~/utils';

export default class EmojiSelector extends Component {
  $emojiInput: HTMLInputElement | null = null;

  mounted(): void {
    const debounceUpdate = debounce(this.updated, this);

    if (this.$emojiInput instanceof HTMLInputElement) {
      this.$emojiInput.addEventListener('input', (event) => {
        if (event.target instanceof HTMLInputElement) {
          debounceUpdate();
        }
      });
    }
  }

  updated(): void {
    this.$emojiInput = document.querySelector('.emoji-input');

    this.children(EmojiList, '.emoji-body', {
      props: {
        keyword: this.$emojiInput ? this.$emojiInput.value : '',
      },
    });
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
        <div class='emoji-body'></div>
      </div>
    `;
  }
}
