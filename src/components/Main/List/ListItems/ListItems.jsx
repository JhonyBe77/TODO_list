import React from "react";
import './ListItems.css'

const ListItems = ({data, remove}) => {
  const {title} = data;
  return (
    <article>
      <h4 className="task-title">{title}</h4>
      <button className="btn-borrar" onClick={remove}>Borrar</button>
  </article>
  );
};

export default ListItems;
