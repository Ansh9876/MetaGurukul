// src/utils/auth.js

import jwtDecode from "jwt-decode";               // 1

const TOKEN_KEY = "token";                        // 2

export const getToken = () =>                     // 3
  localStorage.getItem(TOKEN_KEY) || null;        // 4

export const setToken = (token) => {              // 5
  if (typeof token === "string" && token.length) {
    localStorage.setItem(TOKEN_KEY, token);       // 6
  }
};

export const clearToken = () => {                 // 7
  localStorage.removeItem(TOKEN_KEY);
};

export const getUser = () => {                    // 8
  const token = getToken();                       // 9
  if (!token) return null;                        // 10
  try {
    const payload = jwtDecode(token);             // 11
    // payload typically looks like: { id: "...", role: "admin"|"user", exp: 1712345678 }
    return payload;                               // 12
  } catch (e) {
    return null;                                  // 13
  }
};

export const isAuthenticated = () => {            // 14
  const user = getUser();                         // 15
  if (!user) return false;                        // 16
  if (!user.exp) return true;                     // 17
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return user.exp > nowInSeconds;                 // 18
};

export const hasRole = (requiredRole) => {        // 19
  const user = getUser();                         // 20
  if (!user) return false;                        // 21
  if (!requiredRole) return true;                 // 22
  return user.role === requiredRole;              // 23
};
