import SideBar from './components/SideBar';
import Component from './core/components/Component';

interface AppProps {
  Outlet: typeof Component;
}

class App extends Component<AppProps, any> {
  template(): string {
    return `
      <div class='sidebar'></div>
      <div class='main'></div>
      `;
  }

  mounted() {
    const { Outlet } = this.props as AppProps;

    this.children(SideBar, '.sidebar');
    this.children(Outlet, '.main');
  }
}

export default App;
