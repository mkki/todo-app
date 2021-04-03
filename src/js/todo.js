import { getJSON } from "./api";

export class Todo {
    constructor() {
        this.todos = [];
    }

    async getTodos() {
        try {
            const data = await getJSON();
            this.todos = data.todos;
        } catch (error) {
            console.error(error);
        }
    }

    renderTodos() {
        const template = (title, content) => `
            <li class="card__item">
                <a href="#" class="card__link">
                    <h2 class="card__title">${title}</h2>
                    <p class="card__contents">${content}</p>
                </a>
            </li>`;

        const todoWraper = document.querySelector("ul.card__list");

        todoWraper.innerHTML = this.todos.reduce((result, element) => result += template(element.title, element.content), "");
    }

    addTodo({ title, content }) {
        this.todos.push({
            "title": title,
            "content": content,
        });

        this.renderTodos();
    }

    deleteTodo() {
        this.todos = this.todos.filter((element) => element.id != id);

        this.renderTodos();
    }
}