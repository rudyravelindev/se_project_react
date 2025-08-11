const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'put the URL for your deployed backend here, including https://api.rudyravelinwtwr.crabdance.com'
    : 'http://localhost:3001';

// import { BASE_URL } from './constants';

export const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  return res.json();
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${BASE_URL}/items`);
}

export const addItem = (item, token) => {
  return request(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};

export const deleteItem = (id, token) => {
  // Added token parameter
  return request(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export function register({ name, avatar, email, password }) {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

export function login({ email, password }) {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

export const updateProfile = (data, token) => {
  return request(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const addLike = (itemId, token) => {
  return request(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeLike = (itemId, token) => {
  return request(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
