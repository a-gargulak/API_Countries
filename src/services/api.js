import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
});

// Vyhledání států podle jména (např. "Germany")
export const searchCountryByName = async (name) => {
  const response = await api.get(`/name/${name}`);
  return response.data;
};