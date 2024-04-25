import { useContext, useState, createContext } from "react";
const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const logIn = (token) => {
    setToken(token);
  };
  const logOut = () => {
    setToken(null);
    setDecodedToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ token, logIn, logOut, decodedToken, setDecodedToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
