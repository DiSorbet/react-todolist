import React, { useEffect, useState } from "react";
import List from "./Components/List";
import Modal from "./Components/Modal";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      setModal(true);
      setModalContent("cant add item without value");
      setModalType("danger-modal");
    }
    if (name) {
      setList([
        ...list,
        { name, id: new Date().getTime().toString(), completed },
      ]);
      setModal(true);
      setModalContent("You added item");
      setModalType("success-modal");
    }
    setName("");

    if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, name };
          }
          return item;
        })
      );
      setIsEditing(false);
      setName("");
      setEditId(null);
    }
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    setModal(true);
    setModalContent("you deleted item");
    setModalType("danger-modal");
  };

  const editItem = (id) => {
    const specialItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specialItem.name);
  };

  // const completedItem = (id) => {
  //   console.log(list);
  //   setList(list.map((item) => {
  //       if (item.id === id) return { ...item, completed: !item.completed }
  //       return item)
  //     }

  const completedItem = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) return { ...item, completed: !item.completed };
        return item;
      })
    );
  };

  const cleanList = () => {
    setList([]);
    setModal(true);
    setModalContent("There are no items");
    setModalType("danger-modal");
  };

  return (
    <>
      {modal && (
        <Modal
          modalContent={modalContent}
          modalType={modalType}
          modal={modal}
          setModal={setModal}
        />
      )}
      <main className="main">
        <section className="container">
          <h3 className="main_title"> Todo List </h3>
          <form onSubmit={submitHandler}>
            <input
              value={name}
              type="text"
              placeholder="enter your activity"
              onChange={(e) => setName(e.target.value)}
            />
            <button className="submit-btn" type="submit">
              {isEditing ? "Edit" : "submit"}
            </button>
          </form>
          <List
            editItem={editItem}
            deleteItem={deleteItem}
            list={list}
            completedItem={completedItem}
            completed={completed}
          />
          {list.length > 0 && (
            <div>
              <button className="clean-btn" onClick={cleanList}>
                Clean list{" "}
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
