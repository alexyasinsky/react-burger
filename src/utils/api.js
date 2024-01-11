
export const url = 'https://norma.nomoreparties.space/api';
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export async function makeRequest(url, options = {}) {
  const response = await fetch(url, options);
  return checkResponse(response);
}

export const refreshToken = async (url) => {
  return makeRequest(`${url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};
export const makeRequestWithRefreshToken = async (url, options) => {
  try {
    const response = await fetch(url, options);
    return await checkResponse(response);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(url); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(url, options); //повторяем запрос
      return await checkResponse(response);
    } else {
      return Promise.reject(err);
    }
  }
};