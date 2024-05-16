import SideBar from './components/SideBar';
import Component from './core/components/Component';

class App extends Component {
  template(): string {
    return `<div class='sidebar'></div>`;
  }

  mounted() {
    this.children(SideBar, '.sidebar');
  }
}

export default App;
