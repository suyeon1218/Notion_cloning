import Component, { ComponentProps } from '~/core/components/Component';
import { DocumentItem } from '~/types';

interface SidebarItemProps {
  documentItem: DocumentItem;
  depth: number;
}

interface SidebarItemState {
  isOpen: boolean;
}

class SidebarItem extends Component<SidebarItemProps, SidebarItemState> {
  constructor({ $target, props }: ComponentProps) {
    super({ $target, props });
    this.state = { isOpen: false };

    this.$target?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement) {
        const $button = event.target.closest('button');

        if (
          $button instanceof HTMLElement &&
          $button.className === 'sidebar__item-toggle'
        ) {
          event.stopPropagation();
          const { isOpen } = this.state as SidebarItemState;

          this.setState({
            ...this.state,
            isOpen: !isOpen,
          });
        }
      }
    });

    this.render();
  }

  updated(): void {
    if (this.props === undefined || this.state === undefined) return;

    const { documentItem, depth } = this.props;
    const { isOpen } = this.state;

    if (isOpen) {
      documentItem.documents.forEach((childDocument) =>
        this.children(SidebarItem, `#sidebar__item-${childDocument.id}`, {
          props: {
            documentItem: childDocument,
            depth: depth + 1,
          },
        })
      );
    }
  }

  template(): string {
    if (this.props === undefined || this.state === undefined) return ``;

    const { documentItem, depth } = this.props as SidebarItemProps;
    const { isOpen } = this.state as SidebarItemState;

    return `
      <li 
        class='sidebar__item' 
        style='padding-left: ${depth * 15}px'>
        <button class='sidebar__item-toggle'>${isOpen ? '▼' : '▶︎'}</button>
        <div class='sidebar__item-title'>${documentItem.title}</div>
        <div class='sidebar__item-buttons'>
          <button class='sidebar__item-create'>+</button>
          <button class='sidebar__item-delete'>X</button>
        </div>
      </li>
      ${
        isOpen && documentItem.documents.length > 0
          ? documentItem.documents
              .map(
                (childDocument) =>
                  `<ul data-id=${childDocument.id} id='sidebar__item-${childDocument.id}'></ul>`
              )
              .join('')
          : isOpen && documentItem.documents.length === 0
          ? `<li 
              class='sidebar__item sidebar__item--none'
              style='padding-left: ${(depth + 1) * 15}px'>
                하위 페이지 없음
              </li>`
          : ''
      }
      `;
  }
}

export default SidebarItem;
