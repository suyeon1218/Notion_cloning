import { makeRequest } from '~/api';
import { DocumentItem } from '~/types';

const documentAPI = {
  getDocuments: async () => {
    const data = await makeRequest.get<DocumentItem[]>('');

    return data;
  },
};

export default documentAPI;
