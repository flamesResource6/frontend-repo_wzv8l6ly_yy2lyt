const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export async function api(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

export function getClientId() {
  let id = localStorage.getItem('client_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('client_id', id);
  }
  return id;
}
