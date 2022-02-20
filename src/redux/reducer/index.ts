import { combineReducers } from "redux";
import { curdItem } from "./curd/crud.reducer";

export const RootReducer = combineReducers({
  item: curdItem,
});

export type state = ReturnType<typeof RootReducer>;
