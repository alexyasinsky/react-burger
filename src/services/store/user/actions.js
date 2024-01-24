import {createAsyncThunk} from "@reduxjs/toolkit";
import {makeRequest, makeRequestWithRefreshToken, BURGER_API} from "../../../utils/api";
import {setAuthChecked} from "./reducers";

export const register = createAsyncThunk('user/register', async (body) => {
  const response = await makeRequest(`${BURGER_API}/auth/register`, {
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
  const response = await makeRequest(`${BURGER_API}/auth/login`, {
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
  const response = await makeRequest(`${BURGER_API}/auth/logout`, {
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
  const response = await makeRequestWithRefreshToken(`${BURGER_API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
  })
  if (!response.success) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
  return response;
})

export const editUser = createAsyncThunk('user/patchUser', async (body) => {
  return await makeRequestWithRefreshToken(`${BURGER_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({...body})
  });
})

export const checkUserAuth = () => (dispatch) => {
  if (localStorage.getItem("accessToken")) {
    dispatch(getUser());
  } else {
    dispatch(setAuthChecked(true));
  }
}
