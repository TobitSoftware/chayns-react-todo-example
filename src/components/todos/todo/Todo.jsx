import React, { PureComponent } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Checkbox, Icon, Tooltip } from 'chayns-components';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import formatDateMonthYearHoursMinutes from '../../../utils/date-helper';
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
                <Tooltip
                    bindListeners
                    position={3}
                    content={{ text: formatDateMonthYearHoursMinutes(todo.get('creationTime')) }}
                >
                    <div>{todo.get('todo')}</div>
                </Tooltip>
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
