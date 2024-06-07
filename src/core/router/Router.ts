import Component from '~/core/components/Component';
import { findRenderNode, findRoute } from './Util';

export interface Route {
  path: string;
  element: typeof Component;
  children?: Route[];
}

export interface Params {
  [key: string]: any;
}

export type CurrRoute = Route & { params: Params | undefined };

class Router {
  private routes: Route[] | undefined;
  currRoutes: CurrRoute[];

  constructor() {
    this.currRoutes = [];

    window.addEventListener('popstate', () => {
      this.routing();
    });
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

    const [renderNode, $element] = findRenderNode(nextRoutes, this.currRoutes);
    this.currRoutes = [...nextRoutes];

    if (renderNode instanceof HTMLElement) {
      renderNode.innerHTML = '';
      new $element({ $target: renderNode });
    } else {
      const $app = document.querySelector('.App');
      new $element({ $target: $app });
    }
  }
}

const router = new Router();

export default router;
