import { DCIClient } from './dist/DCI.js';

let options = {
    baseURL: 'https://dci.org',
    timeout: 30000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
};

  const DCI = new DCIClient(options);

  try {
    let data = await DCI.getEvent('2026-dci-broken-arrow');
    console.log(data);
  } catch (err) {
    console.error(err);
  }