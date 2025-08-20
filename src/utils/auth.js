const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
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

// Register a new user
export const register = async ({ name, avatar, email, password }) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return handleApiResponse(response);
};

// Login user
export const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleApiResponse(response);
};

// Validate token
export const checkToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return handleApiResponse(response);
};
