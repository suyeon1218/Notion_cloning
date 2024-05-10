class SidebarList {
	$target: Element;
	$sidebarList: HTMLUListElement | null;

	constructor($target: Element) {
		this.$target = $target;
		this.$sidebarList = null;
		this.init();
		this.render();
	}

	init() {
		this.$sidebarList = document.createElement('ul');
		this.$sidebarList.classList.add('sidebar__list');
		this.$target.appendChild(this.$sidebarList);
	}

	render() {
		if (this.$sidebarList) {
		}
	}
}

export default SidebarList;
