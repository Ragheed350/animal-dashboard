import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  attachmentService,
  Attachment,
  Attachment_U_Req,
  Attachment_S_Req,
  Attachment_I_Req,
  Attachment_D_Req,
} from '@core';

interface AttachmentsState {
  status: RequestStatus;
  attachments: Attachment[];
  attachment?: Attachment;
}

let initialState: AttachmentsState = {
  status: 'no-thing',
  attachments: [],
};

const AttachmentsSlice = createSlice({
  name: 'Attachments',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    InsertAttachment: (
      { attachments },
      { payload }: PayloadAction<Attachment>
    ) => {
      attachments.push(payload);
    },
    ShowAttachment: (state, { payload }: PayloadAction<Attachment>) => {
      state.attachment = payload;
    },
    UpdateAttachment: (state, { payload }: PayloadAction<Attachment>) => {
      let ind = state.attachments.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.attachments[ind] = payload;
    },
    DeleteAttachment: ({ attachments }, { payload }: PayloadAction<number>) => {
      let index = attachments.findIndex((el) => el.id === payload);
      if (index !== -1) attachments.splice(index, 1);
    },
    FetchAttachments: (state, { payload }: PayloadAction<Attachment[]>) => {
      state.attachments = payload;
    },
  },
});

const {
  setStatus,
  InsertAttachment,
  UpdateAttachment,
  DeleteAttachment,
  FetchAttachments,
  ShowAttachment,
} = AttachmentsSlice.actions;

export const InsertAttachmentAsync = (
  req: Attachment_I_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await attachmentService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertAttachment(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowAttachmentAsync = (req: Attachment_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await attachmentService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowAttachment(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateAttachmentAsync = (
  req: Attachment_U_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await attachmentService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateAttachment(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteAttachmentAsync = (
  req: Attachment_D_Req
): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await attachmentService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteAttachment(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchAttachmentsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await attachmentService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchAttachments(result.data));
    dispatch(setStatus('data'));
  }
};

export default AttachmentsSlice.reducer;
