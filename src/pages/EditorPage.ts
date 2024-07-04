import Emoji from '~/components/Emoji';
import Component, { ComponentProps } from '~/core/components/Component';
import { getParams } from '~/core/router';
import { notionAPI } from '~/service';
import { DocumentItem } from '~/types';

class EditorPage extends Component {
  id: string | undefined;
  document: DocumentItem | undefined;

  constructor({ $target }: ComponentProps) {
    super({ $target });

    this.render();
  }

  async mounted() {
    const params = getParams();

    if (params) {
      this.id = params.id;
      this.document = await notionAPI.getDocumentById(this.id as string);
    }
  }

  updated() {
    this.children(Emoji, '#emoji');
  }

  template(): string {
    // 하위 컴포넌트 전달
    return `<main>
      <h1>
        <span id='emoji'></span>
        <span id='title'></span>
      </h1>
    </main>`;
  }
}

export default EditorPage;
