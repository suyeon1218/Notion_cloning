import SideBar from './components/SideBar';

class App {
  $target: Element;

  constructor($target: Element) {
    this.$target = $target;
    this.render();
  }

  render() {
    new SideBar(this.$target);
  }
}

export default App;
