import {createAsyncThunk} from "@reduxjs/toolkit";
import {makeRequest, makeRequestWithRefreshToken, url} from "../../../utils/api";

export const register = createAsyncThunk('user/register', async (body) => {
    const response = await makeRequest(`${url}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({...body})
    })
    localStorage.setItem("refreshToken", response.refreshToken);
    localStorage.setItem("accessToken", response.accessToken);
    return response;
})

export const login = createAsyncThunk('user/login', async (body) => {
  const response = await makeRequest(`${url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({...body})
  })
  localStorage.setItem("refreshToken", response.refreshToken);
  localStorage.setItem("accessToken", response.accessToken);
  return response;
})

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await makeRequest(`${url}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  return response;
})

export const getUser = createAsyncThunk('user/getUser', async () => {
  return await makeRequestWithRefreshToken(`${url}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
  });
})

export const editUser = createAsyncThunk('user/patchUser', async (body) => {
  return await makeRequestWithRefreshToken(`${url}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({...body})
  });
})
