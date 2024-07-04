export default function debounce<T, U>(
  callback: (...args: T[]) => void | Promise<void>,
  thisObj?: ThisParameterType<U>
) {
  let timer: string | number | undefined | NodeJS.Timeout;

  return (...args: T[]) => {
    clearTimeout(timer);

    timer = setTimeout(function () {
      thisObj ? callback.apply(thisObj, args) : callback(...args);
    }, 1000);
  };
}
