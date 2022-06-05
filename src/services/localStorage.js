export const getIsLogged = () => {
  const authState = localStorage.getItem("auth");
  return authState ? JSON.parse(authState) : { isLogged: false };
};

export const setIsLogged = (data) => {
  const token = localStorage.setItem("auth", data);
};
