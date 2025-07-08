const baseUrl = 'http://localhost:3001';

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
  return request(`${baseUrl}/items`);
}

export const addItem = (item) => {
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
};

export const deleteItem = (_id) => {
  if (_id === 0 || _id === '0') {
    return Promise.reject(new Error('Cannot delete item with ID 0'));
  }
  // Mock the API call - just return a resolved promise
  return Promise.resolve({ success: true });
};

// ✅ THESE GO OUTSIDE, at top-level
export function register(email, password) {
  return request(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

export function login(email, password) {
  return request(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken(token) {
  return request(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
