import Component from '~/core/components/Component';

interface RouteType {
  path: string;
  element: typeof Component;
}

class Router {
  private static instance: Router;
  private routes: RouteType[];
  static route: typeof Component;

  constructor(routes: RouteType[]) {
    this.routes = routes;

    if (!Router.instance) {
      Router.instance = this;
      this.init();
    }

    return Router.instance;
  }

  init() {
    this.routing();
  }

  routing() {
    const currentRoute = this.routes.find((route) => {
      if (route.path === '') {
        return route;
      }

      const LocationPathName = '/' + location.pathname.split('/')[1];
      return LocationPathName === route.path;
    });

    if (currentRoute) {
      Router.route = currentRoute.element;
    }
  }
}

export default Router;
