import { Route, CurrRoute, Params } from './Router';
import { navigate } from './Service';

export function findRoute(URL: string, currPath: string, routes: Route[]) {
  const currRoute: CurrRoute[] = [];

  function find(currPath: string, childrenRoutes: Route[]) {
    for (const route of childrenRoutes) {
      const { path, children } = route;
      const nextPath = (currPath + path).replace('//', '/');
      const { pathToken, isMatched, params, paramId } = isMathcedPath(
        URL,
        nextPath
      );

      if (isMatched) {
        const pathString = pathToken.join('/');
        paramId
          ? currRoute.push({
              ...route,
              path: `${pathString}/${params[paramId]}`,
              params,
            })
          : currRoute.push({ ...route, path: pathString, params });
        return currRoute;
      }
      if (children) {
        const matchedRoute = find(nextPath, children);

        if (matchedRoute) {
          paramId
            ? currRoute.push({ ...route, path: `/${params[paramId]}`, params })
            : currRoute.push({ ...route, params });
          return route;
        }
      }
    }
    return null;
  }

  find(currPath, routes);

  if (currRoute.length === 0) {
    navigate('/404');
  }

  return currRoute;
}

function isMathcedPath(URL: string, currPath: string) {
  const result: {
    pathToken: string[];
    params: Params;
    isMatched: boolean;
    paramId: string | undefined;
  } = { pathToken: [], params: {}, isMatched: false, paramId: undefined };

  if (URL === currPath) {
    result.isMatched = true;
    return result;
  }
  const URLTokens = URL.split('/');
  const currPathTokens = currPath.split('/');

  result.isMatched =
    currPathTokens.length === URLTokens.length &&
    currPathTokens.every((token, index) => {
      if (token.startsWith(':')) {
        const [param, value] = [token.slice(1), URLTokens[index]];
        result.params[param] = value;
        result.paramId = token.slice(1);

        return true;
      }
      if (token === URLTokens[index]) {
        result.pathToken.push(token);
        return true;
      }

      return false;
    });

  return result;
}

export function findRenderNode(
  nextRoutes: CurrRoute[],
  currRoutes: CurrRoute[]
) {
  const outlets = document.querySelectorAll('#outlet');
  let depth = 0;
  let nextPointer = nextRoutes.length - 1;
  let currPointer = currRoutes.length - 1;

  while (currRoutes && nextPointer > 0 && currPointer > 0) {
    if (nextRoutes[nextPointer].path !== currRoutes[currPointer].path) {
      break;
    }
    nextPointer -= 1;
    currPointer -= 1;
    depth += 1;
  }

  return [outlets[depth], nextRoutes[nextPointer].element] as const;
}
