import { LOCAL_STORAGE_KEY } from '../../constants/localstorage';

export const postTodosToLocalStorage = (todos) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};
