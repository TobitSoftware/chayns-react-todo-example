import React, { PureComponent } from 'react';

// Api functions

// Components
import TodosHeadline from './todos-headline/TodosHeadline';
import AddTodo from '../add-todo/AddTodo';
import Todo from './todo/Todo';
import { getTodosFromLocalStorage } from '../../api/todos/get';
import { postTodosToLocalStorage } from '../../api/todos/post';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class Todos extends PureComponent {
    constructor(props) {
        super(props);

        // We set our initial state
        this.state = {
            todos: [],
        };
    }

    componentDidMount() {
        this.loadTodos();
    }

    loadTodos = async () => {
        const { status, data: todos } = await getTodosFromLocalStorage();

        // Set todos to state if loaded successfully
        if (status === 200) {
            this.setState({ todos });
        }
    };

    addTodo = (todo) => {
        const { todos } = this.state;

        // We define our next state
        const nextTodos = [...todos, todo];

        this.updateTodosInStateAndLs(nextTodos);
    };

    removeTodo = (id) => {
        const { todos } = this.state;

        // We define our next state
        const nextTodos = todos.filter((todo) => todo.id !== id);

        this.updateTodosInStateAndLs(nextTodos);
    };

    toggleTodoChecked = (id) => {
        const { todos } = this.state;

        // We define our next state
        const nextTodos = todos.map((todo) => {
            if (todo.id === id) {
                // eslint-disable-next-line no-param-reassign
                todo.checked = !todo.checked;
            }

            return todo;
        });

        this.updateTodosInStateAndLs(nextTodos);
    };

    updateTodosInStateAndLs = (nextTodos) => {
        // We set the next state
        this.setState({ todos: nextTodos });

        // Update todos in local storage
        postTodosToLocalStorage(nextTodos);
    };

    render() {
        const { todos } = this.state;

        const items = todos.map((todo) => (
            // We render the component for each entry in todos
            // We pass the data and functionality as props
            <Todo
                toggleTodoChecked={this.toggleTodoChecked}
                removeTodo={this.removeTodo}
                key={todo.id}
                todo={todo}
            />
        ));

        return (
            <div className="todos">
                <TodosHeadline todos={todos}/>
                {items}
                <AddTodo addTodo={this.addTodo}/>
            </div>
        );
    }
}

export default Todos;
