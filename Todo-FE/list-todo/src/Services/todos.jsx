import TodosService from './TodosService';

const END_POINT ={
    TODOS: "todos",
}

export const getTodosAPI = () => {
    return TodosService.get(`${END_POINT.TODOS}`);
}

export const delTodosAPI = (id) => {
    return TodosService.delete(`${END_POINT.TODOS}/${id}`);
}

export const addTodosAPI = (todo) => {
    return TodosService.post(`${END_POINT.TODOS}`,todo);
}

export const editTodosAPI = (todo) => {
    return TodosService.put(`${END_POINT.TODOS}`,todo);
}
