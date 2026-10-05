import { useFetch } from './useFetch';
import { Dev } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export function useDevs() {
  return useFetch<Dev[]>(API_URL);
}
