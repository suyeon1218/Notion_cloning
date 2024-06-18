import { makeRequest } from '~/api';
import { DocumentItem } from '~/types';

const documentAPI = {
  getDocuments: async () => {
    const data = await makeRequest.get<DocumentItem[]>('');

    return data;
  },
  getDocumentById: async (id: string) => {
    const data = await makeRequest.get<DocumentItem>(`/${id}`);

    return data;
  },
};

export default documentAPI;
