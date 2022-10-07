import React, { useState } from "react";

interface ITodo {
  id: number;
  title: string;
  checked: boolean;
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTimeout(() => {
      setTodos((prev) => [
        ...prev,
        {
          id: Math.floor(Math.random() * 1000),
          title: todoInput,
          checked: false,
        },
      ]);
    }, 500);

    setTodoInput("");
  };

  const toggleTodo = (id: number) => {
    const filteredTodo = todos.find((todo) => todo.id === id);

    if (filteredTodo) {
      filteredTodo.checked = !filteredTodo.checked;
      setTodos(todos.map((todo) => (todo.id === id ? filteredTodo : todo)));
    }
  };

  const deleteTodo = (id: number) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  return (
    <>
      {!authenticated && (
        <>
          <h1>Login</h1>
          <button type="button" onClick={() => setAuthenticated(true)}>
            Click here to login
          </button>
        </>
      )}

      {authenticated && (
        <div className="flex flex-col gap-y-1 justify-center items-center">
          <h1>Add Todo</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              id="title"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              className="border border-black"
            />
            <br />
            <button type="submit" className="border border-black p-1 rounded">
              Submit
            </button>
          </form>

          <ul>
            {todos.map(({ id, title, checked }) => {
              return (
                <li key={id} data-cy={`todo-${title}`}>
                  <label
                    className={checked ? "line-through" : undefined}
                    htmlFor={`todoToggle${id}`}
                  >
                    {title}
                  </label>
                  <input
                    type="checkbox"
                    checked={checked}
                    id={`todoToggle${id}`}
                    onChange={() => toggleTodo(id)}
                  />
                  <button type="button" onClick={() => deleteTodo(id)}>
                    Remove
                  </button>
                  <br />
                </li>
              );
            })}
          </ul>

          <p>Total Todos: {todos.length}</p>
          <p>Selected Todos: {todos.filter((todo) => todo.checked).length}</p>
        </div>
      )}
    </>
  );
}
