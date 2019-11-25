import { LOCAL_STORAGE_KEY } from '../../constants/localstorage';

export const getTodosFromLocalStorage = async () => new Promise((resolve) => {
    const todos = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (todos) {
        resolve({ status: 200, data: JSON.parse(todos) });
    } else {
        resolve({ status: 200, data: JSON.parse('[]') });
    }
});
