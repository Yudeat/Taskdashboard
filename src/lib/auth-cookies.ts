
export function setAuthCookie() {
  document.cookie = 'isAuthenticated=true; path=/';
}

export function clearAuthCookie() {
  document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
