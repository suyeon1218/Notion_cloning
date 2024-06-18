import Component, { ComponentProps } from '~/core/components/Component';
import { getParams } from '~/core/router';
import { documentAPI } from '~/service';
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
    this.document = await documentAPI.getDocumentById(this.id);
  }

  // update 로 하위 컴포넌트 연결

  template(): string {
    // 하위 컴포넌트 전달
    return `<main>
      <h1>${this.id} 페이지</h1>
    </main>`;
  }
}

export default EditorPage;
