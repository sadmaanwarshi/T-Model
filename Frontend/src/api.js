const API_BASE = 'https://t-model-self.vercel.app/api';

export async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem('token');
  const headers = opts.headers || {};
  headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(API_BASE + path, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'API Error');
  }
  return res.json();
}
