import App from './App.js';

const $app = document.querySelector('.App');

if ($app instanceof Element) {
  new App({
    $target: $app,
  });
}
