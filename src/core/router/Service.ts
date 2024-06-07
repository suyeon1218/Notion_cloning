import Component from '../components/Component';
import Router, { Params, Route } from './Router';

interface Outlet {
  $outlet: typeof Component | null;
  params: undefined | Params;
}

export function createRouter(routes: Route[]) {
  return Router.createRouter(routes);
}

export function navigate(url: string) {
  return Router.navigate(url);
}

export function Outlet() {
  const outletIndex = document.querySelectorAll('#outlet').length;
  const targetRoute = Router.currRoutes[Router.currRoutes.length - outletIndex];

  return targetRoute ? targetRoute.element : null;
}

export function getParams() {
  const outletIndex = document.querySelectorAll('#outlet').length;
  const targetRoute = Router.currRoutes[Router.currRoutes.length - outletIndex];

  return targetRoute ? targetRoute.params : undefined;
}
