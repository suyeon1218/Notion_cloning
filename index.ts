import App from './src/App.ts';

const $app = document.querySelector('.App') as Element;
new App({ $target: $app });
