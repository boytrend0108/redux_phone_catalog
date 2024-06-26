const BASE_URL
  = 'https://boytrend0108.github.io/redux_phone_catalog/api';

function handleResponce(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const client = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(BASE_URL + url);

    return handleResponce(response);
  },
};
