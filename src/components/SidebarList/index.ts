import { requestRootDocument } from '~/api/request';
import Component from '~/core/components/Component';
import SidebarItem from '../SidebarItem';

export interface DocumentItemType {
  id: string;
  title: string;
  documents: DocumentItemType[];
}

class SidebarList extends Component<
  { [key: string]: string },
  DocumentItemType[]
> {
  async beforeMount(): Promise<void> {
    const data = (await requestRootDocument()) as DocumentItemType[];
    this.setState(data);
  }

  updated() {
    this.state?.forEach((documentItem) =>
      this.children(SidebarItem, `#side__item-${documentItem.id}`, {
        props: { documentItem, depth: 0 },
      })
    );
  }

  template(): string {
    return this.state
      ? this.state
          .map(
            (documentItem) =>
              `<div id='side__item-${documentItem.id}' class='sidebar__item sidebar__item--0'></div>`
          )
          .join('')
      : '';
  }
}

export default SidebarList;
