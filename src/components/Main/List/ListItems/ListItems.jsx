import React from "react";
import './ListItems.css'

const ListItems = ({data, remove}) => {
  const {title} = data;
  return (
    <article>
      <h4 className="task-title">Tarea: {title}</h4><button onClick={remove}>Borrar</button>
  </article>
  );
};

export default ListItems;
