import { requestNotionAPI } from '~/api';
import { DocumentItem } from '~/types';

const notionAPI = {
  getDocuments: async () => {
    const data = await requestNotionAPI.get<DocumentItem[]>('');

    return data;
  },
  getDocumentById: async (id: string) => {
    const data = await requestNotionAPI.get<DocumentItem>(`/${id}`);

    return data;
  },
};

export default notionAPI;
