import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import { ApiErrorNotification, isError, RequestStatus, ContactUs } from '@core';
import { contactUsService } from '../../services';

interface ContactUsRequestsState {
  status: RequestStatus;
  contactUsRequests: ContactUs[];
}

let initialState: ContactUsRequestsState = {
  status: 'no-thing',
  contactUsRequests: [],
};

const ContactUsRequestsSlice = createSlice({
  name: 'ContactUsRequests',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    FetchContactUsRequests: (
      state,
      { payload }: PayloadAction<ContactUs[]>
    ) => {
      state.contactUsRequests = payload;
    },
    DeleteContactUsRequest: (
      { contactUsRequests },
      { payload }: PayloadAction<number>
    ) => {
      let index = contactUsRequests.findIndex((el) => el.id === payload);
      if (index !== -1) contactUsRequests.splice(index, 1);
    },
  },
});

const {
  setStatus,
  DeleteContactUsRequest,
  FetchContactUsRequests,
} = ContactUsRequestsSlice.actions;

export const DeleteContactUsRequestAsync = (id: number): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await contactUsService.Delete(id);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteContactUsRequest(id));
    dispatch(setStatus('data'));
  }
};

export const FetchContactUsRequestsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await contactUsService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchContactUsRequests(result.data));
    dispatch(setStatus('data'));
  }
};

export default ContactUsRequestsSlice.reducer;
