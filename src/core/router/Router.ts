import Component from '~/core/components/Component';

export interface RouteType {
  path: string;
  element: typeof Component;
}

class Router {
  private static instance: Router;
  private routes: RouteType[] | undefined;
  route?: typeof Component;

  constructor() {
    if (!Router.instance) {
      Router.instance = this;
    }

    return Router.instance;
  }

  createRouter(routes: RouteType[]) {
    this.routes = routes;
    this.routing();

    return this.route as typeof Component;
  }

  navigate(url: string) {
    history.pushState(null, '', url);
    this.routing();
  }

  routing() {
    const currentRoute = this.routes?.find((route) => {
      if (route.path === '') {
        return route;
      }

      const LocationPathName = '/' + location.pathname.split('/')[1];
      return LocationPathName === route.path;
    });

    if (currentRoute) {
      this.route = currentRoute.element;
    }

    return this.route;
  }
}

const router = new Router();

export default router;
