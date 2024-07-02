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

    const params = getParams();
    this.id = params?.id;

    this.render();
  }

  async mounted() {
    if (this.id === undefined) return;
    this.document = await notionAPI.getDocumentById(this.id);
  }

  // update 로 하위 컴포넌트 연결
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
