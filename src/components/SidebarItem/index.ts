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

  template(): string {
    const { documentItem } = this.props as SidebarItemProps;
    const { isOpen } = this.state as SidebarItemState;

    return `
        <div class='sidebar__item-toggle'>${isOpen ? '▼' : '▶︎'}</div>
        <div class='sidebar__item-title'>${documentItem.title}</div>
        <div class='sidebar__item-buttons'>
          <div class='sidebar__item-create'>+</div>
          <div class='sidebar__item-delete'>X</div>
        </div>
      `;
  }
}

export default SidebarItem;
