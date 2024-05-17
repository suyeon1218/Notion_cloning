import App from './App.js';
import Router from './core/router/Router.js';
import MainPage from './pages/MainPage.js';
import EditorPage from './pages/EditorPage.js';
import NotFoundPage from './pages/NotFoundPage.js';

new Router([
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

const $app = document.querySelector('.App');

if ($app instanceof Element) {
  new App({
    $target: $app,
    props: {
      Outlet: Router.route,
    },
  });
}
