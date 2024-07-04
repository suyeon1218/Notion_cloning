import Component from '~/core/components/Component';
import { navigate } from '~/core/router';

class SidebarHeader extends Component {
  template(): string {
    return `
      <div data-link='/' class='sidebar__container'>
        <div class='sidebar__header-img'>
          <img src='/src/assets/propfile.png' />
        </div>
        <div class='sidebar__header-title'>
          수연의 Notion
        </div>
      </div>
      `;
  }

  updated(): void {
    if (this.$target === null) return;

    this.$target.addEventListener('click', (event) => {
      event.stopPropagation();

      if (event.target instanceof HTMLDivElement) {
        const { link } = event.target.dataset;

        if (link) {
          navigate(link);
        }
      }
    });
  }
}

export default SidebarHeader;
