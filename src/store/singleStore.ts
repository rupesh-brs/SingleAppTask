import { create } from 'zustand';
import axios from 'axios';
import { usersSchema, User } from '@/schema/userSchema';
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for unique ID generation
import { Todo } from '@/schema/todoSchema';

// UserAuthStore
interface AuthState {
    userId: string;
    isUserIdValid: boolean;
    password: string;
    setUserId: (id: string) => void;
    validateUserId: () => void;
    setPassword: (password: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    userId: '', 
    isUserIdValid: false, 
    password: '',
    setUserId: (id) => set({ userId: id }),
    validateUserId: () => set((state) => ({
        isUserIdValid: state.userId === 'vsfnyros', 
    })),
    setPassword: (password) => set({ password }),
}));

// Todo Store
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface TodoStore {
    todos: Todo[];
    fetchTodos: () => Promise<void>;
    addTodo: (newTodo: Omit<Todo, 'id'>) => Promise<void>;
    updateTodo: (id: number, updatedData: Partial<Todo>) => Promise<void>;
    deleteTodo: (id: number) => Promise<void>;
}

const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    fetchTodos: async () => {
        const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
        if (response.data.length === 0) {
            console.log('No todos found');
            return;
        }
        console.log('Fetched Todos:', response.data);
        set({ todos: response.data });
    },
    addTodo: async (newTodo) => {
        try {
            const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
            const existingTodos = response.data;
            const newId = existingTodos.length > 0 ? Math.max(...existingTodos.map(todo => todo.id)) + 1 : 1;
            const newTodoWithId: Todo = { ...newTodo, id: newId, completed: false };
            const postResponse = await axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodoWithId);
            console.log('Added Todo:', postResponse.data);
            set((state) => ({ todos: [...state.todos, postResponse.data] }));
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    },
    updateTodo: async (id, updatedData) => {
        const response = await axios.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedData);
        set((state) => ({
            todos: state.todos.map(todo => (todo.id === id ? response.data : todo)),
        }));
    },
    deleteTodo: async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        set((state) => ({
            todos: state.todos.filter(todo => todo.id !== id),
        }));
    },
}));

// User Store
interface UserState {
    users: User[];
    currentPage: number;
    totalPages: number;
    fetchUsers: (page: number) => Promise<void>;
    createUser: (newUser: User) => Promise<void>;
    updateUser: (updatedUser: User) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
    users: [],
    currentPage: 1,
    totalPages: 1,
    
    fetchUsers: async (page = 1) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=4`);
            const data = await response.json();
            const validatedData = usersSchema.parse(data);
            set({ users: validatedData, currentPage: page, totalPages: 10 });
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    },
    createUser: async (newUser: User) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            const createdUser = await response.json();
            set((state) => ({ users: [...state.users, createdUser] }));
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    },
    updateUser: async (updatedUser: User) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            });
            const newUserData = await response.json();
            set((state) => ({
                users: state.users.map((user) => (user.id === newUserData.id ? newUserData : user)),
            }));
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    },
    deleteUser: async (id: number) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: 'DELETE' });
            set((state) => ({
                users: state.users.filter((user) => user.id !== id),
            }));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    },
}));

export { useAuthStore, useTodoStore, useUserStore };
