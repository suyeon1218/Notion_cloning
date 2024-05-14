export const request = async (path: string, options?: any) => {
  try {
    const response = await fetch(`/api/documents/${path}`, {
      ...options,
      headers: {
        'x-username': 'suyeon',
      },
    });

    if (response.ok) {
      const data = response.json();

      return data;
    }
  } catch (error) {
    throw new Error('API ERROR');
  }
};

export const requestRootDocument = async () => {
  return await request('');
};
