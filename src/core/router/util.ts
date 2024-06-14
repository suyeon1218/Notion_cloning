import { Route, CurrRoute, Params } from './Router';

function getPurePathString(path: string) {
  const pathToken = path.split('/');
  const purePath: string[] = [];

  for (const token of pathToken) {
    if (token.startsWith(':')) {
      break;
    }
    purePath.push(token);
  }

  return purePath.join('/');
}

export function findRoute(
  URL: string,
  startPath: string,
  rootRoutes: Route[] | undefined
) {
  const currRoutes: CurrRoute[] = [];

  function find(prevPath: string, subRoutes: Route[] | undefined) {
    if (subRoutes === undefined) return null;

    for (const route of subRoutes) {
      const { path, children } = route;
      const currPath = (prevPath + path).replace('//', '/');
      const { isMatched, params, paramId } = isMathcedPath(URL, currPath);
      const purePath = getPurePathString(path);
      const pathString = paramId ? `${purePath}/${params[paramId]}` : purePath;

      if (isMatched) {
        currRoutes.push({ ...route, path: pathString, params });
        return route;
      }
      if (children) {
        const matchedRoute = find(currPath, children);

        if (matchedRoute !== null) {
          currRoutes.push({
            ...route,
            path: pathString,
            params,
          });

          return route;
        }
      }
    }
    return null;
  }
  find(startPath, rootRoutes);

  return currRoutes;
}

function isMathcedPath(URL: string, startPath: string) {
  const result: {
    params: Params;
    isMatched: boolean;
    paramId: string | undefined;
  } = { params: {}, isMatched: false, paramId: undefined };

  if (URL === startPath) {
    result.isMatched = true;
    return result;
  }

  const URLTokens = URL.split('/');
  const startPathTokens = startPath.split('/');

  result.isMatched =
    startPathTokens.length === URLTokens.length &&
    startPathTokens.every((token, index) => {
      if (token.startsWith(':')) {
        const [param, value] = [token.slice(1), URLTokens[index]];
        result.params[param] = value;
        result.paramId = token.slice(1);

        return true;
      }
      if (token === URLTokens[index]) {
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

  while (
    outlets.length > depth &&
    currRoutes &&
    nextRoutes[nextPointer] &&
    currRoutes[currPointer]
  ) {
    if (nextRoutes[nextPointer].path !== currRoutes[currPointer].path) {
      break;
    }
    nextPointer -= 1;
    currPointer -= 1;
    depth += 1;
  }

  return [outlets[depth], nextRoutes[nextPointer].element] as const;
}
