import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  countryService,
  Country,
  Country_U_Req,
  Country_S_Req,
  Country_I_Req,
  Country_D_Req,
} from '@core';

interface CountriesState {
  status: RequestStatus;
  countries: Country[];
  country?: Country;
}

let initialState: CountriesState = {
  status: 'no-thing',
  countries: [],
};

const CountriesSlice = createSlice({
  name: 'Countries',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertCountry: ({ countries }, { payload }: PayloadAction<Country>) => {
      countries.push(payload);
    },
    ShowCountry: (state, { payload }: PayloadAction<Country>) => {
      state.country = payload;
    },
    UpdateCountry: (state, { payload }: PayloadAction<Country>) => {
      let ind = state.countries.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.countries[ind] = payload;
    },
    DeleteCountry: ({ countries }, { payload }: PayloadAction<number>) => {
      let index = countries.findIndex((el) => el.id === payload);
      if (index !== -1) countries.splice(index, 1);
    },
    FetchCountries: (state, { payload }: PayloadAction<Country[]>) => {
      state.countries = payload;
    },
  },
});

const {
  setStatus,
  InsertCountry,
  UpdateCountry,
  DeleteCountry,
  FetchCountries,
  ShowCountry,
} = CountriesSlice.actions;

export const InsertCountryAsync = (req: Country_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await countryService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertCountry(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowCountryAsync = (req: Country_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await countryService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowCountry(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateCountryAsync = (req: Country_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await countryService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateCountry(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteCountryAsync = (req: Country_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await countryService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteCountry(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchCountriesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await countryService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchCountries(result.data));
    dispatch(setStatus('data'));
  }
};

export default CountriesSlice.reducer;
