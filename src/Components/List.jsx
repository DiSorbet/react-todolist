import React from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

function List({ list, deleteItem, editItem, completed, completedItem }) {
  return (
    <>
      {list.map((item) => {
        const { id, name, completed } = item;
        return (
          <li
            className={`list-item ${completed ? "item_completed" : ""} `}
            key={id}
          >
            <span>{name}</span>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button className="trash-btn" onClick={() => deleteItem(id)}>
                <FaTrash />
              </button>
              <button
                className="complete-btn"
                onClick={() => completedItem(id)}
              >
                <FaCheck />
              </button>
            </div>
          </li>
        );
      })}
    </>
  );
}

export default List;
