import SideBar from './components/SideBar';
import Component from './core/components/Component';
import MainPage from './pages/MainPage.js';
import EditorPage from './pages/EditorPage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import { createRouter } from './core/router';

const router = createRouter([
  {
    path: '/',
    element: MainPage,
  },
  {
    path: '/documents',
    element: EditorPage,
  },
  {
    path: '',
    element: NotFoundPage,
  },
]);

class App extends Component {
  template(): string {
    return `
      <div class='sidebar'></div>
      <div class='main'></div>
      `;
  }

  mounted() {
    this.children(SideBar, '.sidebar');
    router.render('.main');
  }
}

export default App;
