import {createAsyncThunk} from "@reduxjs/toolkit";
import {makeRequest, url} from "../../../utils/api";
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