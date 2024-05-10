import SidebarHeader from '../SidebarHeader';
import SidebarList from '../SidebarList';

class SideBar {
	$target: Element;
	$sidebar: HTMLDivElement | null;

	constructor($target: Element) {
		this.$target = $target;
		this.$sidebar = null;
		this.init();
		this.render();
	}

	init() {
		this.$sidebar = document.createElement('div');
		this.$sidebar.classList.add('sidebar');
		this.$target.appendChild(this.$sidebar);
	}

	render() {
		if (this.$sidebar) {
			new SidebarHeader(this.$sidebar);
			new SidebarList(this.$sidebar);
		}
	}
}

export default SideBar;
