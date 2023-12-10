
export const url = 'https://norma.nomoreparties.space/api';

export async function makeRequest(url, options = {}) {
  const response = await fetch(url, options);
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}