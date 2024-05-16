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

  template(): string {
    this.state?.forEach((documentItem) =>
      this.children(SidebarItem, '.sidebar__list', {
        props: { documentItem, depth: 0 },
      })
    );

    return '';
  }
}

export default SidebarList;
