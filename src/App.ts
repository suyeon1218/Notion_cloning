import SideBar from './components/SideBar';

class App {
	$target: Element;

	constructor($target: Element) {
		this.$target = $target;
	}

	render() {
		new SideBar(this.$target);
	}
}

export default App;
