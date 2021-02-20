import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  attributeService,
  Attribute,
  Attribute_U_Req,
  Attribute_S_Req,
  Attribute_I_Req,
  Attribute_D_Req,
} from '@core';

interface AttributesState {
  status: RequestStatus;
  attributes: Attribute[];
  attribute?: Attribute;
}

let initialState: AttributesState = {
  status: 'no-thing',
  attributes: [],
};

const AttributesSlice = createSlice({
  name: 'Attributes',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertAttribute: (
      { attributes },
      { payload }: PayloadAction<Attribute>
    ) => {
      attributes.push(payload);
    },
    ShowAttribute: (state, { payload }: PayloadAction<Attribute>) => {
      state.attribute = payload;
    },
    UpdateAttribute: (state, { payload }: PayloadAction<Attribute>) => {
      let ind = state.attributes.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.attributes[ind] = payload;
    },
    DeleteAttribute: ({ attributes }, { payload }: PayloadAction<number>) => {
      let index = attributes.findIndex((el) => el.id === payload);
      if (index !== -1) attributes.splice(index, 1);
    },
    FetchAttributes: (state, { payload }: PayloadAction<Attribute[]>) => {
      state.attributes = payload;
    },
  },
});

const {
  setStatus,
  InsertAttribute,
  UpdateAttribute,
  DeleteAttribute,
  FetchAttributes,
  ShowAttribute,
} = AttributesSlice.actions;

export const InsertAttributeAsync = (req: Attribute_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await attributeService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertAttribute(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowAttributeAsync = (req: Attribute_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await attributeService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowAttribute(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateAttributeAsync = (req: Attribute_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await attributeService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateAttribute(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteAttributeAsync = (req: Attribute_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await attributeService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteAttribute(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchAttributesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await attributeService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchAttributes(result.data));
    dispatch(setStatus('data'));
  }
};

export default AttributesSlice.reducer;
