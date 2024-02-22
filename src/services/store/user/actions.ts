import {createAsyncThunk} from "@reduxjs/toolkit";
import {makeRequest, makeRequestWithRefreshToken} from "../../../utils/api";
import {setAuthChecked} from "./reducers";
import {TMonoTypeObject} from "../../../utils/types";
import {AppDispatch} from "../types";
import {BURGER_API} from "../../../utils/constants";

type TAuthRequestBody = {
  email: string;
  password: string;
  name?: string;
}

type TAuthResponse = {
  success: boolean;
  user: {
    "email": string;
    "name": string;
  };
  accessToken: string;
  refreshToken: string;
}

export const register = createAsyncThunk('profile-user/register', async (body: TAuthRequestBody) => {
  const response = await makeRequest<TAuthResponse>(`${BURGER_API}/auth/register`, {
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


export const login = createAsyncThunk('profile-user/login', async (body: TAuthRequestBody) => {
  const response = await makeRequest<TAuthResponse>(`${BURGER_API}/auth/login`, {
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

type TLogoutResponse = {
  success: boolean;
  message: string;
}
export const logout = createAsyncThunk('profile-user/logout', async () => {
  const response = await makeRequest<TLogoutResponse>(`${BURGER_API}/auth/logout`, {
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

type TUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  }
}
export const getUser = createAsyncThunk('profile-user/getUser', async () => {
  return await makeRequestWithRefreshToken<TUserResponse>(`${BURGER_API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken') || ''
    },
  });
})


export const editUser = createAsyncThunk('profile-user/editUser', async (body: TMonoTypeObject<string>) => {
  return await makeRequestWithRefreshToken<TUserResponse>(`${BURGER_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken') || ''
    },
    body: JSON.stringify({...body})
  });
})

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  if (localStorage.getItem("accessToken")) {
    dispatch(getUser());
    dispatch(setAuthChecked(true));
  } else {
    dispatch(setAuthChecked(true));
  }
}
