import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import Animal from './animal';
import App from './app';
import Attachments from './attachment';
import Attribute from './attribute';
import Category from './category';
import Color from './color';
import Country from './country';
import DisplayCategory from './display-category';
import Farm from './farm';
import Notification from './notification';
import Pollination from './pollination';
import Rate from './rate';
import Users from './user';
import Vaccinate from './vaccinate';
import Vitamin from './vitamin';
import Weight from './weight';

const store = configureStore({
  reducer: {
    Animal,
    App,
    Attachments,
    Attribute,
    Category,
    Color,
    Country,
    DisplayCategory,
    Farm,
    Notification,
    Pollination,
    Rate,
    Vaccinate,
    Vitamin,
    Weight,
    Users,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
