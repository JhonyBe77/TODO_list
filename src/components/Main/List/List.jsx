import React, { useState, useEffect } from "react";
import ListItems from './ListItems/';
import data from './data.js';
import { v4 as uuidv4 } from 'uuid';

const List = () => {
  const [items, setItems] = useState([]);
  const [values, setValues] = useState({ title: '' });
  const [showButtons, setShowButtons] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setItems(data);
    setShowButtons(data.length > 0);
  }, []);

  useEffect(() => {
    if (values.title.trim()) {
      const timer = setTimeout(() => {
        setValues({ title: '' });
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [values.title]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = values.title.trim();

    if (trimmedTitle.length < 6) {
      setError('La tarea debe tener al menos 6 caracteres.');
      setMessage('');
      return;
    }

    if (isEditing) {
      const updatedItems = [...items];
      updatedItems[editIndex] = { title: trimmedTitle };
      setItems(updatedItems);
      setIsEditing(false);
      setEditIndex(null);
      setMessage('Tarea actualizada');
    } else {
      addItem({ title: trimmedTitle });
      setMessage('Tarea añadida');
    }

    setValues({ title: '' });
    setShowButtons(true);
    setError('');

    setTimeout(() => setMessage(''), 5000);
  };

  const renderItems = () => {
    return items.map((item, i) => (
      <article key={uuidv4()}>
        <h4>{item.title}</h4>
        <div className="grupo-botones">
          <button onClick={() => handleEdit(i)} className="btn-add">
            Editar
          </button>
          <button onClick={() => removeItem(i)} className="btn-borrar">
            Eliminar
          </button>
        </div>
      </article>
    ));
  };

  const addItem = (new_item) => {
    setItems([new_item, ...items]);
  };

  const removeAllItems = () => {
    setItems([]);
    setShowButtons(false);
  };

  const resetItems = () => {
    setItems(data);
    setShowButtons(data.length > 0);
  };

  const removeItem = (i) => {
    const remainingItems = items.filter((_, index) => index !== i);
    setItems(remainingItems);
    setShowButtons(remainingItems.length > 0);
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setValues({ title: items[index].title });
  };

  return (
    <div className="list-container">
      <h3 className="list-title">Lista de esta semana</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="name" className="form-label">
          {isEditing ? 'Editar Tarea: ' : 'Escribir nueva Tarea: '}
        </label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          className="form-input"
        />
        {values.title.trim() && (
          <button type="submit" className={isEditing ? "btn-add" : "btn-add"}>
            {isEditing ? 'Guardar Cambios' : 'Add'}
          </button>
        )}
      </form>

      {/* Mostrar mensajes */}
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      {showButtons && (
        <div className="main-buttons">
          <button onClick={removeAllItems} className="btn-borrartodo">
            Borrar todo
          </button>
          <button onClick={resetItems} className="btn-recargar">
            Recargar
          </button>
        </div>
      )}

      <div className="items-container">{renderItems()}</div>
    </div>
  );
};

export default List;
