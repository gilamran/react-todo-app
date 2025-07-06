import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`${process.env.SERVER_API_URL}/todos`)
      .then(res => res.json())
      .then(setTodos)
      .catch(err => setTodos([]));
  }, []);

  return (
    <div>
      <h1>Todo app</h1>
      <p>Todos:</p>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title} {todo.completed ? '✅' : '❌'}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
