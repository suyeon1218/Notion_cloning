import Component from '~/core/components/Component';
import SidebarHeader from '../SidebarHeader';
import SidebarList from '../SidebarList';

class SideBar extends Component {
  template(): string {
    return `
      <div class='sidebar__header'></div>
      <div class='sidebar__list'></div>
    `;
  }

  mounted(): void {
    this.children(SidebarHeader, '.sidebar__header');
    this.children(SidebarList, '.sidebar__list');
  }
}

export default SideBar;
