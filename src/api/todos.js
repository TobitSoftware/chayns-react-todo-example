import { LOCAL_STORAGE_KEY } from '../constants/localstorage';

// It's useful to define several functions for data interactions like get, post, update ... and split them in different directories
export const getTodosFromLocalStorage = async () => new Promise((resolve) => {
    const todos = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (todos) {
        resolve({ status: 200, data: JSON.parse(todos) });
    } else {
        resolve({ status: 200, data: JSON.parse('[]') });
    }
});

export const postTodosToLocalStorage = (todos) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};
