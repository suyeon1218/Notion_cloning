import Component from '~/core/components/Component';
import { findRoute } from './Util';

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
    if (this.routes === undefined) return;

    const nextRoutes = findRoute(location.pathname, '/', this.routes);
    const outlets = document.querySelectorAll('#outlet');
    let depth = 0;
    let nextPointer = nextRoutes.length - 1;
    let currPointer = this.currRoutes.length - 1;

    while (this.currRoutes && nextPointer > 0 && currPointer > 0) {
      if (nextRoutes[nextPointer].path !== this.currRoutes[currPointer].path) {
        break;
      }
      nextPointer -= 1;
      currPointer -= 1;
      depth += 1;
    }

    if (outlets[depth]) {
      outlets[depth].innerHTML = '';
      new nextRoutes[nextPointer].element({ $target: outlets[depth] });
    } else {
      const $app = document.querySelector('.App') as Element;
      new nextRoutes[nextPointer].element({ $target: $app });
    }

    this.currRoutes = [...nextRoutes];
  }
}

const router = new Router();

export default router;
