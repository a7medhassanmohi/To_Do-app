import { motion } from "framer-motion";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  buttonupdatedItem,
  deleteItem,
  doneItem,
} from "../redux/action/crude.action";
import { state } from "../redux/reducer";
import { Payload } from "../redux/reducer/curd/crud.reducer";
type props = {
  it: Payload;
};
const Item: React.FC<props> = ({ it }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: state) => state.item.allItem);
  const itemupdate = (item: Payload) => {
    dispatch(buttonupdatedItem(item));
  };
  const itemDone = (id: string) => {
    dispatch(doneItem(id));
  };
  const deltetItem = (id: string) => {
    dispatch(deleteItem(id));
  };
  return (
    <motion.div
      className={it.done ? `item done` : "item"}
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.2, opacity: 0.1 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="text">
        <p>{it.value}</p>
      </div>
      <div className="btn_">
        <AiFillEdit className="edit" onClick={() => itemupdate(it)} />
        <IoCheckmarkDoneOutline
          className="done"
          onClick={() => itemDone(it.id)}
        />
        <AiFillDelete className="del" onClick={() => deltetItem(it.id)} />
      </div>
    </motion.div>
  );
};

export default Item;
