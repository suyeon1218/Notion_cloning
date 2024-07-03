interface observerProps {
  target: HTMLElement;
  callback: (...args: unknown[]) => void;
}

export default function observer({ target, callback }: observerProps) {
  const observerCallback: IntersectionObserverCallback = (
    entries,
    observer
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(entry);
        callback();
        observer.unobserve(target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5,
  });
  observer.observe(target);
}
