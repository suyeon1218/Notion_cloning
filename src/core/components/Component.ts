export interface ComponentProps<Props = any, State = any> {
  $target: Element | null;
  props?: Props;
  state?: State;
}

type ChildComponent = new ({ ...args }: ComponentProps) => Component;

class Component<Props = any, State = any> {
  $target;
  props;
  state;

  constructor({ $target, props, state }: ComponentProps<Props, State>) {
    this.$target = $target;
    this.props = props;
    this.state = state;

    this.beforeMount();
    this.render();
    this.mounted();
  }

  setState(nextState: State) {
    this.state = nextState;
    this.render();
  }

  beforeMount() {}

  mounted() {}

  updated() {}

  template() {
    return ``;
  }

  children(
    ChildComponent: ChildComponent | null,
    selector: string,
    props?: Omit<ConstructorParameters<ChildComponent>[0], '$target'>
  ) {
    const $element = this.$target?.querySelector(selector);
    if ($element instanceof Element && ChildComponent) {
      new ChildComponent({ $target: $element, ...props });
    }
  }

  initComponent() {
    if (this.$target instanceof HTMLElement) {
      this.$target.innerHTML = '';
    }
  }

  render() {
    if (this.$target instanceof Element) {
      this.initComponent();
      this.$target.insertAdjacentHTML('beforeend', this.template());
      this.updated();
    }
  }
}

export default Component;
