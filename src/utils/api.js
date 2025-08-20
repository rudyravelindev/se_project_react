const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001';

const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Request failed with status ${response.status}: ${response.statusText}`
    );
  }
  return response.json();
};

// Items
export const getItems = () =>
  fetch(`${BASE_URL}/items`).then(handleApiResponse);

export const addItem = (item, token) =>
  fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(handleApiResponse);

export const deleteItem = (id, token) =>
  fetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleApiResponse);

export const updateProfile = (data, token) =>
  fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(handleApiResponse);

// Likes
export const addLike = (itemId, token) =>
  fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleApiResponse);

export const removeLike = (itemId, token) =>
  fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleApiResponse);
