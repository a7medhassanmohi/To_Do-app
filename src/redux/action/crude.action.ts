import { Dispatch } from "redux";
import { ACTIONTYPE2, Payload } from "../reducer/curd/crud.reducer";

export enum Types {
  ADDITEM = "ADD_ITEM",
  DELETEITEM = "DELETE_ITEM",
  UPDATEITEM = "UPDATE_ITEM",
  UPDATEITEMAFTER_CHANGE = "UPDATEITEMAFTER_CHANGE",
  DONEITEM = "DONE_ITEM",
  CloseMODEL = "CloseMODEL",
}

export const addItem = (data: Payload) => (dispatch: Dispatch<ACTIONTYPE2>) => {
  dispatch({ type: Types.ADDITEM, payload: data });
};

export const deleteItem = (id: string) => (dispatch: Dispatch<ACTIONTYPE2>) => {
  dispatch({ type: Types.DELETEITEM, payload: id });
};
export const doneItem = (id: string) => (dispatch: Dispatch<ACTIONTYPE2>) => {
  dispatch({ type: Types.DONEITEM, payload: id });
};
export const buttonupdatedItem =
  (item: Payload) => (dispatch: Dispatch<ACTIONTYPE2>) => {
    dispatch({ type: Types.UPDATEITEM, payload: item });
  };
export const closemodel = () => (dispatch: Dispatch<ACTIONTYPE2>) => {
  dispatch({ type: Types.CloseMODEL, payload: null });
};

export const changeItemAfterUpdate =
  (item: string) => (dispatch: Dispatch<ACTIONTYPE2>) => {
    dispatch({ type: Types.UPDATEITEMAFTER_CHANGE, payload: item });
  };
