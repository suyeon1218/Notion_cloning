const request = async <T>(
  path: string,
  options?: Partial<RequestInit>
): Promise<T | undefined> => {
  try {
    const response = await fetch(`/api/documents/${path}`, {
      ...options,
      headers: {
        'x-username': 'suyeon',
      },
    });

    if (response.ok) {
      const data: Promise<T> = response.json();

      return data;
    }
    return undefined;
  } catch (error) {
    throw new Error('API ERROR');
  }
};

export default request;
