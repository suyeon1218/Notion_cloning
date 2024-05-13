class SidebarHeader {
  $target: Element;
  $sidebarHeader: HTMLDivElement | null;

  constructor($target: Element) {
    this.$target = $target;
    this.$sidebarHeader = null;
    this.init();
    this.render();
  }

  init() {
    this.$sidebarHeader = document.createElement('div');
    this.$sidebarHeader.classList.add('sidebar__header');
    this.$target.appendChild(this.$sidebarHeader);
  }

  render() {
    if (this.$sidebarHeader) {
      this.$sidebarHeader.innerHTML = `
				<a>Notion Cloning</a>
			`;
    }
  }
}

export default SidebarHeader;
