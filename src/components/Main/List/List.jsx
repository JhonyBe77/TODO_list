import React, { useState, useEffect } from "react";
import data from './data.js';
import './List.css';
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
    setItems([
      { title: 'Tarea 1', isDone: false, _id: uuidv4() },
      { title: 'Tarea 2', isDone: true, _id: uuidv4() },
    ]);
    setShowButtons(true);
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
      updatedItems[editIndex] = {
        ...updatedItems[editIndex],
        title: trimmedTitle,
      };
      setItems(updatedItems);
      setIsEditing(false);
      setEditIndex(null);
      setMessage('Tarea actualizada');
    } else {
      addItem({ title: trimmedTitle, desc: 'Nueva tarea', isDone: false, _id: uuidv4() });
      setMessage('Tarea añadida');
    }

    setValues({ title: '' });
    setShowButtons(true);
    setError('');

    setTimeout(() => setMessage(''), 5000);
  };

  const renderItems = () => {
    return items.map((item, i) => (
      <article key={item._id} className="task-item">
        <h4 className={item.isDone ? "completed" : ""}>{item.title}</h4>
        <div className="task-buttons">
          <button onClick={() => toggleTaskStatus(i)} className="btn-toggle">
            {item.isDone ? "Desmarcar" : "Tachar"}
          </button>
          <button onClick={() => handleEdit(i)} className="btn-edit">Editar</button>
          <button onClick={() => removeItem(i)} className="btn-delete">Eliminar</button>
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

  const toggleTaskStatus = (index) => {
    const updatedItems = [...items];
    updatedItems[index].isDone = !updatedItems[index].isDone;
    setItems(updatedItems);
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
          <button type="submit" className="btn-submit">
            {isEditing ? 'Guardar Cambios' : 'Añadir'}
          </button>
        )}
      </form>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      {showButtons && (
        <div className="action-buttons">
          <button onClick={removeAllItems} className="btn-clear">
            Borrar todo
          </button>
          <button onClick={resetItems} className="btn-reset">
            Recargar
          </button>
        </div>
      )}

      <div className="items-container">{renderItems()}</div>
    </div>
  );
};

export default List;
