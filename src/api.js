import axios from 'axios';
import { getConfig } from './config.js';

const BASE_URL = 'https://ai.biztoc.com';

function getClient() {
  const apiKey = getConfig('apiKey');
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-Api-Key': apiKey || '',
      'Content-Type': 'application/json'
    }
  });
}

// News
export async function getNews(params = {}) {
  const client = getClient();
  const res = await client.get('/ai/news', { params });
  return res.data;
}
