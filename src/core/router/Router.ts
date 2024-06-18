import Component from '~/core/components/Component';
import { findRenderNode, findRoute } from './util';

export interface Route {
  path: string;
  element: typeof Component;
  children?: Route[];
}

export interface Params {
  [key: string]: any;
}

export type CurrRoute = Omit<Route, 'children'> & {
  params: Params | undefined;
};

class Router {
  private routes: Route[] | undefined;
  currRoutes: CurrRoute[];

  constructor() {
    this.currRoutes = [];

    window.addEventListener('popstate', () => {
      this.routing();
    });
  }

  setCurrRoutes(nextRoutes: CurrRoute[]) {
    const prevRoutes = [...this.currRoutes];
    this.currRoutes = [...nextRoutes];

    this.optimizeRouting(prevRoutes);
  }

  optimizeRouting(prevRoutes: CurrRoute[]) {
    const [renderNode, $element] = findRenderNode(this.currRoutes, prevRoutes);

    if (renderNode instanceof HTMLElement) {
      renderNode.innerHTML = '';
      new $element({ $target: renderNode });
    } else {
      const $app = document.querySelector('.App');
      new $element({ $target: $app });
    }
  }

  createRouter(routes: Route[]) {
    this.routes = routes;
    this.routing();

    return this;
  }

  navigate(url: string) {
    if (url === location.pathname) return;

    history.pushState(null, '', url);
    this.routing();
  }

  routing() {
    const nextRoutes = findRoute(location.pathname, '/', this.routes);

    if (nextRoutes.length === 0) {
      this.navigate('/404');
      return;
    }
    if (this.currRoutes === undefined) {
      this.currRoutes = [...nextRoutes];
      return;
    }

    this.setCurrRoutes(nextRoutes);
  }
}

const router = new Router();

export default router;
