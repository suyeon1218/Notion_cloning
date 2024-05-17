import App from './App.js';
import MainPage from './pages/MainPage.js';
import EditorPage from './pages/EditorPage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import { createRouter } from './core/router';

const route = createRouter([
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
      Outlet: route,
    },
  });
}
