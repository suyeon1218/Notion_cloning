export interface ComponentProps<Props = any, State = any> {
  $target: Element;
  props?: Props;
  state?: State;
}

type ChildComponent = new ({ ...args }: ComponentProps) => Component;

class Component<Props = { [key: string]: any }, State = any> {
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

  template() {
    return ``;
  }

  children(
    ChildComponent: ChildComponent,
    selector: string,
    props?: Omit<ConstructorParameters<ChildComponent>[0], '$target'>
  ) {
    const $element = document.querySelector(selector) as Element;

    return new ChildComponent({ $target: $element, ...props });
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Component;
