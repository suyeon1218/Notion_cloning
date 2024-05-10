class SidebarItem {
	$target: Element;
	$sidebarItem: HTMLLIElement | null;

	constructor($target: Element) {
		this.$target = $target;
		this.$sidebarItem = null;
		this.init();
		this.render();
	}

	init() {
		this.$sidebarItem = document.createElement('li');
		this.$sidebarItem.classList.add('sidebar__item');
		this.$target.appendChild(this.$sidebarItem);
	}

	render() {
		if (this.$sidebarItem) {
		}
	}
}
