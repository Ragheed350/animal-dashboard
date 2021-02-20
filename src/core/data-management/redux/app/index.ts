import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';

import { RequestStatus } from 'src/core/constants';
import { Login_Req, User } from 'src/core/data-management/models';
import { appServices, authServices } from '@core';
import { isError, ApiErrorNotification, isResponseError } from 'src/core/utils';

type loginError = 'username&password' | 'verify';

interface AppState {
  login: {
    status: RequestStatus;
    error?: loginError;
  };
  // register: {
  //   status: RequestStatus;
  // };
  // verify: {
  //   status: RequestStatus;
  // };
  status: RequestStatus;
  user?: User;
  admin: boolean;
  verified: boolean;
  authenticated: boolean;
}

let initialState: AppState = {
  login: {
    status: 'no-thing',
  },
  // register: {
  //   status: 'no-thing',
  // },
  // verify: {
  //   status: 'no-thing',
  // },
  status: 'no-thing',
  user: undefined,
  verified: false,
  admin: false,
  authenticated: false,
};

const AppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },

    setLoginStatus: ({ login }, { payload }: PayloadAction<RequestStatus>) => {
      login.status = payload;
    },

    setLoginError: ({ login }, { payload }: PayloadAction<loginError>) => {
      login.error = payload;
    },

    // setRegisterStatus: (
    //   { register },
    //   { payload }: PayloadAction<RequestStatus>
    // ) => {
    //   register.status = payload;
    // },

    // setVerifyStatus: (
    //   { verify },
    //   { payload }: PayloadAction<RequestStatus>
    // ) => {
    //   verify.status = payload;
    // },

    setUser: (state, { payload }: PayloadAction<User | undefined>) => {
      state.user = payload;
      if (!payload) state.authenticated = false;
    },

    setAuthenticated: (state, { payload }: PayloadAction<boolean>) => {
      state.authenticated = payload;
    },

    setVeified: (state, { payload }: PayloadAction<boolean>) => {
      state.verified = payload;
    },

    setAdmin: (state, { payload }: PayloadAction<boolean>) => {
      state.admin = payload;
    },
  },
});

export const { setUser } = AppSlice.actions;

const {
  setAdmin,
  setStatus,
  setAuthenticated,
  setLoginStatus,
  // setRegisterStatus,
  setVeified,
  setLoginError,
  // setVerifyStatus,
} = AppSlice.actions;

export const logoutAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await appServices.logout();

  if (isError(result)) dispatch(setStatus('error'));
  else dispatch(setStatus('data'));

  dispatch(setUser());
  dispatch(setAdmin(false));
  dispatch(setVeified(false));
  dispatch(setAuthenticated(false));
};

export const loginAsync = (req: Login_Req): AppThunk => async (dispatch) => {
  dispatch(setLoginStatus('loading'));
  const result = await authServices.login(req);
  if (isError(result)) {
    if (isResponseError(result)) {
      if (result.message === 'the account has not been verified') {
        dispatch(setLoginError('verify'));
        dispatch(setUser(result.data));
      } else {
        dispatch(setLoginError('username&password'));
        dispatch(setUser());
      }
    } else ApiErrorNotification(result);

    dispatch(setAdmin(false));
    dispatch(setVeified(false));
    dispatch(setAuthenticated(false));
    dispatch(setLoginStatus('error'));
  } else {
    dispatch(setUser(result.data.user));
    dispatch(setAdmin(false));
    dispatch(setVeified(true));
    dispatch(setAuthenticated(true));
    dispatch(setLoginStatus('data'));
  }
};

export const adminLoginAsync = (req: Login_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setLoginStatus('loading'));
  const result = await authServices.adminLogin(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setAdmin(false));
    dispatch(setVeified(false));
    dispatch(setAuthenticated(false));
    dispatch(setLoginStatus('error'));
  } else {
    dispatch(setUser(result.data.user));
    dispatch(setAdmin(true));
    dispatch(setVeified(true));
    dispatch(setAuthenticated(true));
    dispatch(setLoginStatus('data'));
  }
};

// export const signupAsync = (req: SignUp_Req): AppThunk => async (dispatch) => {
//   dispatch(setRegisterStatus('loading'));
//   const result = await authServices.signup(req);
//   if (isError(result)) {
//     ApiErrorNotification(result);
//     dispatch(setRegisterStatus('error'));
//   } else {
//     dispatch(setUser(result.data));
//     dispatch(setRegisterStatus('data'));
//   }
//   dispatch(setAdmin(false));
//   dispatch(setVeified(false));
//   dispatch(setAuthenticated(false));
// };

export default AppSlice.reducer;
