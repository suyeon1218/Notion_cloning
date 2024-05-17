import Component from '~/core/components/Component';
import { DocumentItemType } from '../SidebarList';

interface SidebarItemProps {
  documentItem: DocumentItemType;
  depth: number;
}

interface SidebarItemState {
  isOpen: boolean;
}

class SidebarItem extends Component<SidebarItemProps, SidebarItemState> {
  beforeMount(): void {
    this.setState({
      ...this.state,
      isOpen: false,
    });
  }

  updated(): void {
    const { documentItem, depth } = this.props as SidebarItemProps;
    const { isOpen } = this.state as SidebarItemState;

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

  addEvent() {
    this.$target.addEventListener('click', (event) => {
      event.stopPropagation();

      if (event.target instanceof Element) {
        const $button = event.target.closest('button');

        if ($button?.className === 'sidebar__item-toggle') {
          const { isOpen } = this.state as SidebarItemState;

          this.setState({
            ...this.state,
            isOpen: !isOpen,
          });
        }
      }
    });
  }

  template(): string {
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
                  `<ul id='sidebar__item-${childDocument.id}'></ul>`
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
