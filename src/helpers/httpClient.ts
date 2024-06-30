const BASE_URL = import.meta.env.VITE_BASE_URL;


function handleResponce(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const client = {
  async get<T>(url: string): Promise<T> {
    console.log(BASE_URL)
    const response = await fetch(BASE_URL + url);

    return handleResponce(response);
  },
};
