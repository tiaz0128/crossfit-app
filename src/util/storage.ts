export const setCurrentUserUidLocalStorage = (uid: string) => {
  localStorage.setItem('uid', uid);
};

export const getCurrentUserUidLocalStorage = () => {
  return localStorage.getItem('uid');
};
