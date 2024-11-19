import React from "react";
import './ListItems.css';

const ListItems = ({ data, remove }) => {
  const { title, isDone } = data;
  return (
    <article className={`list-item ${isDone ? "task-completed" : ""}`}>
      <h4 className="item-title">{title}</h4>
      <button className="btn-delete" onClick={remove}>
        Borrar
      </button>
    </article>
  );
};

export default ListItems;
