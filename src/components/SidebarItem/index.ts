import Component from '~/core/components/Component';
import { DocumentItemType } from '../SidebarList';

interface SidebarItemProps {
  documentItem: DocumentItemType;
  depth: number;
}

class SidebarItem extends Component<SidebarItemProps, DocumentItemType> {
  template(): string {
    const { depth, documentItem } = this.props as SidebarItemProps;

    return `<div class='sidebar__item sidebar__item--${depth}'>${documentItem.title}</div>`;
  }
}

export default SidebarItem;
