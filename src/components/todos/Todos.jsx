import React, { PureComponent } from 'react';
import { List, fromJS } from 'immutable';
import Todo from './todo/Todo';
import AddTodo from '../add-todo/AddTodo';
import getTodosFromLocalStorage from '../../api/get/todos';
import LOCALSTORAGE_KEY from '../../constants/localstorage';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class Todos extends PureComponent {
    constructor(props) {
        super(props);

        // We set our initial state
        this.state = {
            todos: List(fromJS(getTodosFromLocalStorage()))
        };
    }
c
    addTodo = (todo) => {
        const { todos } = this.state;

        // We definde our next state
        const nextTodos = todos.push(todo);

        this.updateTodosInStateAndLs(nextTodos);
    };

    removeTodo = (id) => {
        const { todos } = this.state;

        // We definde our next state
        const nextTodos = todos.filter(todo => todo.get('id') !== id);

        this.updateTodosInStateAndLs(nextTodos);
    };

    toggleTodoChecked = (id) => {
        const { todos } = this.state;

        // We definde our next state
        const nextTodos = todos.update(
            todos.findIndex(todo => todo.get('id') === id),
            todo => todo.set('checked', !todo.get('checked'))
        );

        this.updateTodosInStateAndLs(nextTodos);
    };

    updateTodosInStateAndLs = (nextTodos) => {
        // We set the next state
        this.setState({
            todos: nextTodos
        });

        // We update our localstorage data
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(nextTodos.toJS()));
    };

    // We extract the complex logic to render the headline for a more readable render()
    renderTodosHeadline = () => {
        const { todos } = this.state;

        const todoCount = todos.size;
        const checkedTodosCount = todos.filter(todo => todo.get('checked')).size;
        const headlineString = `
             ${checkedTodosCount > 0 ? checkedTodosCount : ''}
             ${checkedTodosCount > 0 && todoCount > 0 ? '/' : ''} 
             ${todoCount > 0 ? todoCount : ''} ${todoCount === 1 && checkedTodosCount <= 0 ? 'Todo' : 'Todos'} 
             ${checkedTodosCount > 0 ? 'abgeschlossen' : ''}`;

        return <h2>{headlineString}</h2>;
    };

    render() {
        const { todos } = this.state;

        return (
            <div className="todos">
                {this.renderTodosHeadline()}
                {todos.map(todo => (

                    // We render the component for each entry in todos
                    // We pass the data and functionality as props
                    <Todo
                        key={todo.get('id')}
                        todo={todo}
                        toggleTodoChecked={this.toggleTodoChecked}
                        removeTodo={this.removeTodo}
                    />
                ))}
                <AddTodo addTodo={this.addTodo}/>
            </div>
        );
    }
}

export default Todos;
