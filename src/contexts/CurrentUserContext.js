import { createContext } from 'react';

const CurrentUserContext = createContext({
  currentUser: null,
  isLoggedIn: false,
});

export default CurrentUserContext;
