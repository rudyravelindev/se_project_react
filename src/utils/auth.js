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

// Register a new user
export const register = async ({ name, avatar, email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, avatar, email, password }),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(
      error.message ||
        'Failed to register. Please check your network connection and try again.'
    );
  }
};

// Login user
export const login = async ({ email, password }) => {
  console.log('About to make login request to:', BASE_URL); // Adding this line for test
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(
      error.message ||
        'Login failed. Please check your credentials and try again.'
    );
  }
};

// Validate token (check if user is logged in)
export const checkToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await handleApiResponse(response);
  } catch (error) {
    console.error('Token validation error:', error);
    throw new Error(
      error.message || 'Session validation failed. Please log in again.'
    );
  }
};
