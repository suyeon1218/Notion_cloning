import { requestRootDocument } from '~/api/request';
import SidebarItem from '../SidebarItem';

interface DocumentItem {
  id: string;
  title: string;
  documents: DocumentItem[];
}

interface SidbarListState {
  documents: DocumentItem[] | undefined;
}

class SidebarList {
  $target: Element;
  $sidebarList: HTMLUListElement | null;
  state: SidbarListState;

  constructor($target: Element) {
    this.$target = $target;
    this.$sidebarList = null;
    this.state = { documents: undefined };
    this.initUI();
    this.initState();
  }

  setState(nextState: SidbarListState) {
    this.state = nextState;
    this.render();
  }

  initUI() {
    this.$sidebarList = document.createElement('ul');
    this.$sidebarList.classList.add('sidebar__list');
    this.$target.appendChild(this.$sidebarList);
  }

  async initState() {
    const data = await requestRootDocument();
    this.setState({
      ...this.state,
      documents: data,
    });
  }

  render() {
    if (this.state && this.state.documents) {
      const { documents } = this.state;

      documents.forEach((documentItem: DocumentItem) => {
        if (this.$sidebarList instanceof Element) {
          new SidebarItem({
            $target: this.$sidebarList,
            props: { documentItem },
          });
        }
      });
    }
  }
}

export default SidebarList;
