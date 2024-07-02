import Component, { ComponentProps } from '~/core/components/Component';
import SidebarItem from '../SidebarItem';
import { navigate } from '~/core/router';
import { DocumentItem } from '~/types';
import { notionAPI } from '~/service';

class SidebarList extends Component<
  { [key: string]: string },
  DocumentItem[] | undefined
> {
  constructor({ $target }: ComponentProps) {
    super({ $target });

    this.$target?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement) {
        const $ul = event.target.closest('ul');

        if (
          $ul instanceof HTMLElement &&
          event.target.classList.contains('sidebar__item-title')
        ) {
          const { id } = $ul.dataset;
          id && navigate(`/documents/${id}`);
        }
      }
    });
  }

  async mounted(): Promise<void> {
    const data = await notionAPI.getDocuments();

    this.setState(data);
  }

  updated() {
    this.state?.forEach((documentItem) =>
      this.children(SidebarItem, `#sidebar__item-${documentItem.id}`, {
        props: { documentItem, depth: 0 },
      })
    );
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
