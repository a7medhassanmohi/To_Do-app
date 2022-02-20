import { json } from "stream/consumers";
import { Types } from "../../action/crude.action";

export type Payload = {
  id: string;
  value: string;
  done: boolean;
};

interface INITSTATE {
  allItem: Payload[];
  updateModel: boolean;
  updatedContent: Payload | null;
}

export type ACTIONTYPE2 = {
  type: String;
  payload: Payload | string | null;
};

const initstate: INITSTATE = {
  allItem:
    localStorage.getItem("todo") &&
    JSON.parse(localStorage.getItem("todo") || "").length > 0
      ? JSON.parse(localStorage.getItem("todo") || "")
      : [],
  updateModel: false,
  updatedContent: null,
};

export const curdItem = (
  state: INITSTATE = initstate,
  action: ACTIONTYPE2
): INITSTATE => {
  switch (action.type) {
    case Types.ADDITEM: {
      localStorage.setItem(
        "todo",
        JSON.stringify([action.payload, ...state.allItem])
      );
      return {
        ...state,
        allItem: [action.payload as Payload, ...state.allItem],
      };
    }
    case Types.DELETEITEM: {
      localStorage.setItem(
        "todo",
        JSON.stringify(state.allItem.filter((it) => it.id !== action.payload))
      );

      return {
        ...state,
        allItem: state.allItem.filter((it) => it.id !== action.payload!),
      };
    }
    case Types.DONEITEM: {
      let newAll = state.allItem
        .map((it) => {
          if (it.id == action.payload) {
            return { ...it, done: true };
          } else {
            return it;
          }
        })
        .sort((a, b) => {
          return a.done === b.done ? 0 : a.done ? 1 : -1;
        });
      localStorage.setItem("todo", JSON.stringify(newAll));

      return {
        ...state,
        allItem: newAll,
      };
    }
    case Types.UPDATEITEM: {
      return {
        ...state,
        updateModel: true,
        updatedContent: action.payload as Payload,
      };
    }
    case Types.CloseMODEL:
      return {
        ...state,
        updateModel: false,
        updatedContent: null,
      };
    case Types.UPDATEITEMAFTER_CHANGE: {
      let newarray = state.allItem.map((it) => {
        if (it.id === state.updatedContent?.id) {
          return { ...it, value: action.payload };
        } else {
          return it;
        }
      });
      localStorage.setItem("todo", JSON.stringify(newarray));
      return {
        ...state,
        allItem: newarray as Payload[],
        updateModel: false,
        updatedContent: null,
      };
    }

    default:
      return state;
  }
};
