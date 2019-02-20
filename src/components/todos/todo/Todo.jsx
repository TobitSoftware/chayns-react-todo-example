import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import Checkbox from 'chayns-components/lib/react-chayns-checkbox/component/Checkbox';
import Icon from 'chayns-components/lib/react-chayns-icon/component/Icon';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './todo.scss';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class Todo extends PureComponent {
    handleToggleTodoChecked = () => {
        const { todo, toggleTodoChecked } = this.props;

        toggleTodoChecked(todo.get('id'));
    };

    handleRemoveTodo = () => {
        const { todo, removeTodo } = this.props;

        removeTodo(todo.get('id'));
    };

    render() {
        const { todo } = this.props;

        return (
            <div className="todo">
                <Checkbox
                    checked={todo.get('checked')}
                    onChange={this.handleToggleTodoChecked}
                />
                <Icon className="todo__delete-icon" icon={faTrash} onClick={this.handleRemoveTodo}/>
                <div>{todo.get('todo')}</div>
            </div>
        );
    }
}

// We define the propTypes of our Component
Todo.propTypes = {
    todo: PropTypes.instanceOf(Map).isRequired,
    toggleTodoChecked: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
};

export default Todo;
