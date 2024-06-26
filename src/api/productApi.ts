import { client } from '../helpers/httpClient';

export function getAllProducts<T>(): Promise<T> {
  return client.get('/products.json');
}

export function getProduct<T>(id: string): Promise<T> {
  return client.get(`/products/${id}.json`);
}

export function getPhones<T>(): Promise<T[]> {
  return client.get('/products.json');
}

export function getTablets<T>(): Promise<T[]> {
  return client.get('/tablets.json');
}
