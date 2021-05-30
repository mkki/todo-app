import { getJSON } from "./api";
import { uuidv4, escapeHTML } from "./utill";

export class Todo {
    constructor() {
        const cardList = document.createElement("ul");
        cardList.setAttribute("class", "card__list");

        this.todos = [];
        this.cardList = cardList;

        const todoForm = document.querySelector(".todo-form");
        const todoInput = document.querySelector(".todo-form__input");
        const addButton = document.querySelector(".todo-form__button");

        todoForm.addEventListener("keypress", event => {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        });

        todoInput.addEventListener("keyup", event => {
            if (event.key === "Enter" && event.currentTarget.value !== "") {
                this.addTodo(event.currentTarget.value);
                event.currentTarget.value = "";

                return false;
            }
        });

        addButton.addEventListener("click", () => {
            const value = todoInput.value;

            if (!value) return;

            this.addTodo(value);
            todoInput.value = null;
        });

    }

    async getTodos() {
        try {
            const data = await getJSON();
            this.todos = data.todos;

            data.todos.length === 0 ? this.renderIntroduction() : this.renderTodos();
        } catch (error) {
            console.error(error);
        }
    }

    renderTodoInput() {
        const input = document.createElement("input");
    }

    renderIntroduction() {
        const message = document.createElement("p");
        message.setAttribute("class", "message");
        message.textContent = "할 일을 추가해주세요.";
        
        const contents = document.querySelector(".contents-body");
        contents.insertAdjacentElement("afterbegin", message);
    }

    renderTodos() {
        const template = ({ uuid, title }) => `
            <li class="card__item" data-index="${uuid}">
                <h2 class="card__title">${title}</h2>
                <input type="text" class="card__input" value="${title}">
                <button type="button" class="card__edit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="-15 -15 484.00019 484">
                        <path d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0"/>
                    </svg>
                </button>
                <button type="button" class="card__remove">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 329.26933 329">
                        <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                    </svg>
                    <i class="blind">close</i>
                </button>
            </li>`;

        this.cardList.innerHTML = this.todos.reduce((result, element) => result += template(element), "");
            
        const contents = document.querySelector(".contents-body");
        contents.insertAdjacentElement("afterbegin", this.cardList);

        this.bindEvent();
    }

    addTodo(title) {
        this.todos.push({
            "uuid": uuidv4(),
            "title": escapeHTML(title),
        });

        this.renderTodos();
    }

    editTodo(uuid, title) {
        this.todos = this.todos.map(element => {
            if (element.uuid === uuid) {
                element.title = escapeHTML(title);
            }

            return element;
        });

        this.renderTodos();
    }

    deleteTodo(uuid) {
        this.todos = this.todos.filter(element => element.uuid !== uuid);

        this.renderTodos();
    }

    bindEvent() {
        const deleteButtons = document.querySelectorAll(".card__remove");
        const editButtons = document.querySelectorAll(".card__edit");
        
        deleteButtons.forEach(element => element.addEventListener("click", event => {
            const cardItem = event.currentTarget.parentElement;
            this.deleteTodo(cardItem.dataset.index);
        }));
        
        editButtons.forEach(element => element.addEventListener("click", event => {
            const cardItem = event.currentTarget.parentElement;
            const cardInput = cardItem.querySelector(".card__input");

            cardItem.classList.toggle("editing");

            cardInput.addEventListener("keyup", event => {
                if (event.keyCode === 13) {
                    this.editTodo(cardItem.dataset.index, event.currentTarget.value);
                }
            });
        }));
    }
}