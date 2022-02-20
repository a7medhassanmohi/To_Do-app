import React, { useEffect, useRef } from "react";
import "./App.scss";

import { IoCloseCircleSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { state } from "./redux/reducer";
import {
  addItem,
  closemodel,
  changeItemAfterUpdate,
} from "./redux/action/crude.action";
import { v4 as uuidv4 } from "uuid";
import { Payload } from "./redux/reducer/curd/crud.reducer";
import Item from "./pages/Item";

// const buttonVariants = {
//   animate: {
//     scale: 1.5,

//     transition: {
//       duration: 0.5,
//       yoyo: Infinity,
//     },
//   },
//   initial: {
//     scale: 1,
//   },
//   hover: {
//     color: "#ff00cc",
//     transition: {
//       duration: 0.7,
//     },
//   },
// };

const App: React.FC = () => {
  console.log(
    localStorage.getItem("todo") &&
      JSON.parse(localStorage.getItem("todo") || "").length > 0
      ? JSON.parse(localStorage.getItem("todo") || "")
      : []
  );

  const state = useSelector((state: state) => state.item.allItem);
  const modelopen = useSelector((state: state) => state.item.updateModel);
  const modelcontent = useSelector((state: state) => state.item.updatedContent);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputupdateRef = useRef<HTMLInputElement>(null);
  const handleADD = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current!.value;
    dispatch(
      addItem({
        id: uuidv4(),
        value: value,
        done: false,
      })
    );

    inputRef.current!.value = "";
  };

  const handleupdate = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputupdateRef.current!.value;

    dispatch(changeItemAfterUpdate(value));
  };

  const closeModel = () => {
    dispatch(closemodel());
  };
  useEffect(() => {
    if (modelcontent) {
      inputupdateRef.current!.value = modelcontent.value;
    }
  }, [modelcontent]);

  return (
    <div className="App">
      <AnimatePresence>
        {modelopen ? (
          <motion.div
            className="model"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="modelcontent">
              <form onSubmit={handleupdate}>
                <input
                  type="text"
                  placeholder="Update your Note"
                  ref={inputupdateRef}
                />

                <button>Update</button>
              </form>
              <IoCloseCircleSharp onClick={closeModel} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="container_">
        <div className="title">
          <h3>
            {"ToDo App".split("").map((it, i) => {
              return (
                <motion.span
                  key={i}
                  animate={{ scale: 1.6, scaleY: 1.1, color: "#ff00cc" }}
                  // initial={{ scale: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 0.2,
                    duration: 1.2,
                    delay: i * 0.51,
                  }}
                >
                  {it}
                </motion.span>
              );
            })}
          </h3>
        </div>
        <form onSubmit={handleADD}>
          <input type="text" placeholder="Enter your Note" ref={inputRef} />

          <button>Add</button>
        </form>
        <motion.div
          className="note_container"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <AnimatePresence>
            {state.map((it) => {
              return <Item it={it} key={it.id} />;
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
