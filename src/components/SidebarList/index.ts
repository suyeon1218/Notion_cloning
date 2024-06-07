import { requestRootDocument } from '~/api/request';
import Component from '~/core/components/Component';
import SidebarItem from '../SidebarItem';
import { navigate } from '~/core/router';

export interface DocumentItemType {
  id: string;
  title: string;
  documents: DocumentItemType[];
}

class SidebarList extends Component<
  { [key: string]: string },
  DocumentItemType[]
> {
  async beforeMount(): Promise<void> {
    const data = (await requestRootDocument()) as DocumentItemType[];
    this.setState(data);
  }

  updated() {
    this.state?.forEach((documentItem) =>
      this.children(SidebarItem, `#sidebar__item-${documentItem.id}`, {
        props: { documentItem, depth: 0 },
      })
    );
  }

  addEvent(): void {
    this.$target?.addEventListener('click', (event) => {
      if (event.target instanceof Element) {
        const { target } = event;
        const $ul = event.target.closest('ul') as HTMLUListElement;

        if (target && target.classList.contains('sidebar__item-title')) {
          const { id } = $ul.dataset;
          navigate(`/documents/${id}`);
        }
      }
    });
  }

  template(): string {
    return this.state
      ? this.state
          .map(
            (documentItem) =>
              `<ul data-id=${documentItem.id} id='sidebar__item-${documentItem.id}'></ul>`
          )
          .join('')
      : '';
  }
}

export default SidebarList;
