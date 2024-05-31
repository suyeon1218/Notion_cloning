import SideBar from './components/SideBar';
import Component from './core/components/Component';
import { Outlet } from './core/router';

class App extends Component {
  template(): string {
    return `
      <div class='sidebar'></div>
      <div class='main' id='outlet'></div>
      `;
  }

  updated() {
    this.children(SideBar, '.sidebar');
    this.children(Outlet(), '#outlet');
  }
}

export default App;
