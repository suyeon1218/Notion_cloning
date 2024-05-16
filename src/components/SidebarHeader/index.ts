import Component from '~/core/components/Component';

class SidebarHeader extends Component {
  template(): string {
    return `
      <div class='sidebar__container'>
        <div class='sidebar__header-img'>
          <img src='/src/assets/propfile.png' />
        </div>
        <div class='sidebar__header-title'>
          수연의 Notion
        </div>
      </div>
      `;
  }
}

export default SidebarHeader;
