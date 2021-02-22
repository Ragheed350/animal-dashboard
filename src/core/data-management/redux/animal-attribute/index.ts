import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  animalAttributeService,
  AnimalAttribute,
  AnimalAttribute_U_Req,
  AnimalAttribute_S_Req,
  AnimalAttribute_I_Req,
  AnimalAttribute_D_Req,
} from '@core';

interface AnimalAttributesState {
  status: RequestStatus;
  AnimalAttributes: AnimalAttribute[];
  AnimalAttribute?: AnimalAttribute;
}

let initialState: AnimalAttributesState = {
  status: 'no-thing',
  AnimalAttributes: [],
};

const AnimalAttributesSlice = createSlice({
  name: 'AnimalAttributes',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertAnimalAttribute: (
      { AnimalAttributes },
      { payload }: PayloadAction<AnimalAttribute>
    ) => {
      AnimalAttributes.push(payload);
    },
    ShowAnimalAttribute: (
      state,
      { payload }: PayloadAction<AnimalAttribute>
    ) => {
      state.AnimalAttribute = payload;
    },
    UpdateAnimalAttribute: (
      state,
      { payload }: PayloadAction<AnimalAttribute>
    ) => {
      let ind = state.AnimalAttributes.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.AnimalAttributes[ind] = payload;
    },
    DeleteAnimalAttribute: (
      { AnimalAttributes },
      { payload }: PayloadAction<number>
    ) => {
      let index = AnimalAttributes.findIndex((el) => el.id === payload);
      if (index !== -1) AnimalAttributes.splice(index, 1);
    },
    FetchAnimalAttributes: (
      state,
      { payload }: PayloadAction<AnimalAttribute[]>
    ) => {
      state.AnimalAttributes = payload;
    },
  },
});

const {
  setStatus,
  InsertAnimalAttribute,
  UpdateAnimalAttribute,
  DeleteAnimalAttribute,
  FetchAnimalAttributes,
  ShowAnimalAttribute,
} = AnimalAttributesSlice.actions;

export const InsertAnimalAttributeAsync = (
  req: AnimalAttribute_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await animalAttributeService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertAnimalAttribute(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowAnimalAttributeAsync = (
  req: AnimalAttribute_S_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await animalAttributeService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowAnimalAttribute(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateAnimalAttributeAsync = (
  req: AnimalAttribute_U_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await animalAttributeService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateAnimalAttribute(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteAnimalAttributeAsync = (
  req: AnimalAttribute_D_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await animalAttributeService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteAnimalAttribute(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchAnimalAttributesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await animalAttributeService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchAnimalAttributes(result.data));
    dispatch(setStatus('data'));
  }
};

export const FetchAnimalAttributesByAnimalAsync = (
  id: number
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await animalAttributeService.FetchByAnimal(id);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchAnimalAttributes(result.data));
    dispatch(setStatus('data'));
  }
};

export default AnimalAttributesSlice.reducer;
