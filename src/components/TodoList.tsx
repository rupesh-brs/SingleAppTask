'use client';
import { useEffect, useState } from 'react';
import {useTodoStore} from '@/store/singleStore';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { IoMdCreate } from "react-icons/io"; 
import { todoSchema, TodoInput } from '@/schema/todoSchema';
// import useTodoStore from '@/store/singleStore';

const TodoList = () => {
  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo } = useTodoStore();
  const [newTodo, setNewTodo] = useState<TodoInput>({ userId: 1, title: '', completed: false });
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async () => {
    try {
      todoSchema.parse(newTodo);
      await addTodo(newTodo);
      setNewTodo({ userId: 1, title: '', completed: false });
    } catch (error) {
      console.error(error.errors);
    }
  };

  const handleEditTodo = (todo: TodoInput) => {
    setEditingTodoId(todo.id);
    setNewTodo(todo);
  };

  const handleUpdateTodo = async () => {
    if (editingTodoId) {
      try {
        todoSchema.parse(newTodo);
        await updateTodo(editingTodoId, newTodo);
        setNewTodo({ userId: 1, title: '', completed: false });
        setEditingTodoId(null);
      } catch (error) {
        console.error(error.errors);
      }
    }
  };

  const incompleteTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
          Todo List
        </h1>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Enter a task"
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={editingTodoId ? handleUpdateTodo : handleAddTodo}
            className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <IoIosAdd />
          </button>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Todos</h2>
            <div className="space-y-4">
              {incompleteTodos.map(todo => (
                <div key={todo.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm border border-b-2">
                  <span className="text-lg font-medium">{todo.title}</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleEditTodo(todo)} className="text-blue-500 hover:text-blue-600">
                      <IoMdCreate />
                    </button>
                    <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-600">
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}
              {incompleteTodos.length === 0 && (
                <p className="text-gray-500 text-center">No incomplete todos available.</p>
              )}
            </div>
          </div>

          <div className="w-1/2 pl-2">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">Completed Todos</h2>
            <div className="space-y-4">
              {completedTodos.map(todo => (
                <div key={todo.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm border border-b-2">
                  <span className="text-lg font-medium">{todo.title}</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-600">
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}
              {completedTodos.length === 0 && (
                <p className="text-gray-500 text-center">No completed todos available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TodoList;
