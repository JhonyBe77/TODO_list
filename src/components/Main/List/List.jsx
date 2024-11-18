import React, { useState } from "react";
import ListItems from './ListItems/'
import data from './data.js';
import { v4 as uuidv4 } from 'uuid';

const List = () => {
  // Simula la data que vendrá de la API
  // El estado inicial es el array de objetos
  const [items, setItems] = useState(data);

  const [values, setValues] = useState({
    title: '',
});
const [showButtons, setShowButtons] = useState(items.length > 0); // Controla la visibilidad de los botones

const handleChange = (e) => {
    setValues({
        ...values,
        [e.target.name]: e.target.value
    })
}

const handleSubmit = (e) => {
  e.preventDefault();

  if (values.title.trim()) { 
    addItem(values);
    setValues({ title: '' }); // Limpia el campo de entrada
    setShowButtons(true); 
  }
};

const renderItems = () => {
  return items.map((item, i) => <ListItems data={item} key={uuidv4()} remove={()=>removeItem(i)} />);
};

  // estos métodos tienen que llamar a setItems()
  const addItem = (new_item) => {
    setItems([new_item,...items]); // actualiza estado items
  };
  const removeAllItems = () => {
    setItems([]); // actualiza estado items
    setShowButtons(false); // Oculta los botones si no hay elementos
  };
  const resetItems = () => {
    setItems(data); // Cargar con datos iniciales de nuevo
    setShowButtons(data.length > 0); // Muestra los botones si hay elementos en la data inicial
  };

  const removeItem = (i) => {
    const remainingItems = items.filter((item, index) => index !== i);
    setItems(remainingItems);
    if (remainingItems.length === 0) {
      setShowButtons(false); // Oculta los botones si no quedan elementos
    }
  };

  const editItem = () => { };

  return (
    <div>
      List
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Tarea</label>
        <br />
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <button type="submit" className="btn-add">
          Add
        </button>
      </form>

      {showButtons && ( // Renderiza los botones solo si showButtons es true
        <>
          <button onClick={removeAllItems} className="btn-delete-all">
            Borrar todo
          </button>
          <button onClick={resetItems} className="btn-reset">
            Recargar
          </button>
        </>
      )}

      {renderItems()}
    </div>
  );
};

export default List;