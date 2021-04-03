import { Todo } from "./todo";

document.addEventListener("DOMContentLoaded", async () => {
    const todo = new Todo();

    await todo.getTodos();

    todo.renderTodos();
});