interface DocumentItem {
  id: string;
  title: string;
  documents: DocumentItem[];
}

interface Component {
  $target: Element;
  props: any;
}

class SidebarItem {
  $target: Element;
  $sidebarItem: HTMLLIElement | null;
  props: {
    documentItem: DocumentItem;
  };

  constructor({ $target, props }: Component) {
    this.$target = $target;
    this.$sidebarItem = null;
    this.props = props;
    this.init();
    this.render();
  }

  init() {
    this.$sidebarItem = document.createElement('li');
    this.$sidebarItem.classList.add('sidebar__item');
    this.$target.appendChild(this.$sidebarItem);
  }

  render() {
    const { documentItem } = this.props;

    if (this.$sidebarItem instanceof Element) {
      this.$sidebarItem.innerHTML = `
        <span>${documentItem.title}</span>
      `;
    }
  }
}

export default SidebarItem;
