const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001';

export const checkResponse = (res) => {
  if (!res.ok) {
    return res
      .json()
      .then((err) => {
        throw new Error(
          err.message || `Request failed with status ${res.status}`
        );
      })
      .catch(() => {
        throw new Error(`Request failed with status ${res.status}`);
      });
  }
  return res.json();
};

function request(url, options = {}) {
  const headers = options.headers || {};
  if (
    !headers['Content-Type'] &&
    (options.method === 'POST' ||
      options.method === 'PATCH' ||
      options.method === 'PUT')
  ) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  }).then(checkResponse);
}

export const getItems = () => request(`${BASE_URL}/items`);

export const addItem = (item, token) =>
  request(`${BASE_URL}/items`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(item),
  });

export const deleteItem = (id, token) =>
  request(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

export const register = ({ name, avatar, email, password }) =>
  request(`${BASE_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({ name, avatar, email, password }),
  });

export const login = ({ email, password }) =>
  request(`${BASE_URL}/signin`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const updateProfile = (data, token) =>
  request(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

export const addLike = (itemId, token) =>
  request(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });

export const removeLike = (itemId, token) =>
  request(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
