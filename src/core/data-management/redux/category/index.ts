import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from '../store';
import {
  ApiErrorNotification,
  isError,
  RequestStatus,
  categoryService,
  Category,
  Category_U_Req,
  Category_S_Req,
  Category_I_Req,
  Category_D_Req,
} from '@core';

interface CategoriesState {
  status: RequestStatus;
  categories: Category[];
  parents: Category[];
  level2: Category[];
  level3: Category[];
  category?: Category;
}

let initialState: CategoriesState = {
  status: 'no-thing',
  categories: [],
  parents: [],
  level2: [],
  level3: [],
};

const CategoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },

    InsertCategory: ({ categories }, { payload }: PayloadAction<Category>) => {
      categories.push(payload);
    },
    ShowCategory: (state, { payload }: PayloadAction<Category>) => {
      state.category = payload;
    },
    UpdateCategory: (state, { payload }: PayloadAction<Category>) => {
      let ind = state.categories.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.categories[ind] = payload;
    },
    DeleteCategory: ({ categories }, { payload }: PayloadAction<number>) => {
      let index = categories.findIndex((el) => el.id === payload);
      if (index !== -1) categories.splice(index, 1);
    },
    FetchCategories: (state, { payload }: PayloadAction<Category[]>) => {
      state.categories = payload;
    },

    // ************************************ {{parents}} ************************************

    InsertParent: ({ parents }, { payload }: PayloadAction<Category>) => {
      parents.push(payload);
    },
    UpdateParent: (state, { payload }: PayloadAction<Category>) => {
      let ind = state.parents.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.parents[ind] = payload;
    },
    DeleteParent: ({ parents }, { payload }: PayloadAction<number>) => {
      let index = parents.findIndex((el) => el.id === payload);
      if (index !== -1) parents.splice(index, 1);
    },
    FetchParents: (state, { payload }: PayloadAction<Category[]>) => {
      state.parents = payload;
    },

    // ************************************ {{level2}} ************************************

    InsertLevel2: ({ level2 }, { payload }: PayloadAction<Category>) => {
      level2.push(payload);
    },
    UpdateLevel2: (state, { payload }: PayloadAction<Category>) => {
      let ind = state.level2.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.level2[ind] = payload;
    },
    DeleteLevel2: ({ level2 }, { payload }: PayloadAction<number>) => {
      let index = level2.findIndex((el) => el.id === payload);
      if (index !== -1) level2.splice(index, 1);
    },
    FetchLevel2s: (state, { payload }: PayloadAction<Category[]>) => {
      state.level2 = payload;
    },

    // ************************************ {{level3}} ************************************

    InsertLevel3: ({ level3 }, { payload }: PayloadAction<Category>) => {
      level3.push(payload);
    },
    UpdateLevel3: (state, { payload }: PayloadAction<Category>) => {
      let ind = state.level3.findIndex((el) => el.id === payload.id);
      if (ind !== -1) state.level3[ind] = payload;
    },
    DeleteLevel3: ({ level3 }, { payload }: PayloadAction<number>) => {
      let index = level3.findIndex((el) => el.id === payload);
      if (index !== -1) level3.splice(index, 1);
    },
    FetchLevel3s: (state, { payload }: PayloadAction<Category[]>) => {
      state.level3 = payload;
    },
  },
});

const {
  setStatus,
  InsertCategory,
  UpdateCategory,
  DeleteCategory,
  FetchCategories,
  ShowCategory,
  FetchParents,
  DeleteLevel2,
  DeleteLevel3,
  DeleteParent,
  FetchLevel2s,
  FetchLevel3s,
  InsertLevel2,
  InsertLevel3,
  InsertParent,
  UpdateLevel2,
  UpdateLevel3,
  UpdateParent,
} = CategoriesSlice.actions;

export const InsertCategoryAsync = (req: Category_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const ShowCategoryAsync = (req: Category_S_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Show(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(ShowCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateCategoryAsync = (req: Category_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateCategory(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteCategoryAsync = (req: Category_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteCategory(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchCategoriesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Fetch();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchCategories(result.data));
    dispatch(setStatus('data'));
  }
};

// ************************************ {{parents}} ************************************

export const InsertParentAsync = (req: Category_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertParent(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateParentAsync = (req: Category_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateParent(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteParentAsync = (req: Category_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteParent(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchParentsAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.FetchParent();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchParents(result.data));
    dispatch(setStatus('data'));
  }
};

// ************************************ {{level2}} ************************************

export const InsertLevel2Async = (req: Category_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertLevel2(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateLevel2Async = (req: Category_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateLevel2(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteLevel2Async = (req: Category_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteLevel2(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchLevel2Async = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.FetchLevel2();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchLevel2s(result.data));
    dispatch(setStatus('data'));
  }
};

// ************************************ {{level3}} ************************************

export const InsertLevel3Async = (req: Category_I_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Insert(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(InsertLevel3(result.data));
    dispatch(setStatus('data'));
  }
};

export const UpdateLevel3Async = (req: Category_U_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Update(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(UpdateLevel3(result.data));
    dispatch(setStatus('data'));
  }
};

export const DeleteLevel3Async = (req: Category_D_Req): AppThunk => async (
  dispatch
) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.Delete(req);
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(DeleteLevel3(req.id));
    dispatch(setStatus('data'));
  }
};

export const FetchLevel3Async = (): AppThunk => async (dispatch) => {
  dispatch(setStatus('loading'));
  const result = await categoryService.FetchLevel3();
  if (isError(result)) {
    ApiErrorNotification(result);
    dispatch(setStatus('error'));
  } else {
    dispatch(FetchLevel3s(result.data));
    dispatch(setStatus('data'));
  }
};

export default CategoriesSlice.reducer;
