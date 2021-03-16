import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  animalService,
  Animal,
  Animal_U_Req,
  Animal_S_Req,
  Animal_I_Req,
  Animal_D_Req,
  ApiSuccessNotification,
} from '@core';

interface AnimalsState {
  status: RequestStatus;
  animals: Animal[];
  animal?: Animal;
}

let initialState: AnimalsState = {
  status: 'no-thing',
  animals: [],
};

const AnimalsSlice = createSlice({
  name: 'Animals',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertAnimal: ({ animals }, { payload }: PayloadAction<Animal>) => {
      animals.push(payload);
    },
    ShowAnimal: (state, { payload }: PayloadAction<Animal>) => {
      state.animal = payload;
    },
    UpdateAnimal: (state, { payload }: PayloadAction<Animal>) => {
      let ind = state.animals.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.animals[ind] = payload;
    },
    DeleteAnimal: ({ animals }, { payload }: PayloadAction<number>) => {
      let index = animals.findIndex((el) => el.id === payload);
      if (index !== -1) animals.splice(index, 1);
    },
    FetchAnimals: (state, { payload }: PayloadAction<Animal[]>) => {
      state.animals = payload;
    },
  },
});

const {
  setStatus,
  InsertAnimal,
  UpdateAnimal,
  DeleteAnimal,
  FetchAnimals,
  ShowAnimal,
} = AnimalsSlice.actions;

export const InsertAnimalAsync = (req: Animal_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await animalService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertAnimal(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowAnimalAsync = (req: Animal_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await animalService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowAnimal(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateAnimalAsync = (req: Animal_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await animalService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateAnimal(result.data));
    dispatch(setStatus('data'));
  }
};

export const ApproveAnimalAsync = (req: {
  id: number;
  user_id: number;
}): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await animalService.approve(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateAnimal(result.data));
    dispatch(setStatus('data'));
    ApiSuccessNotification({ mes: ['Done!', 'تم!'] });
  }
};

export const UnApproveAnimalAsync = (req: { id: number }): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await animalService.unapprove(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateAnimal(result.data));
    dispatch(setStatus('data'));
    ApiSuccessNotification({ mes: ['Done!', 'تم!'] });
  }
};

export const DeleteAnimalAsync = (req: Animal_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await animalService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteAnimal(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchAnimalsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await animalService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchAnimals(result.data));
    dispatch(setStatus('data'));
  }
};

export default AnimalsSlice.reducer;
