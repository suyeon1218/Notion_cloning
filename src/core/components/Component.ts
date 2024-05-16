export interface ComponentProps<Props = any, State = any> {
  $target: Element;
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
    this.initComponent();
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

  initComponent() {
    this.$target.innerHTML = ``;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
  }
}

export default Component;
