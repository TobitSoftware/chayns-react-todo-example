import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// chayns components
import { Checkbox, Icon, Tooltip } from 'chayns-components/lib';

// Icons
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// Utils
import formatDateMonthYearHoursMinutes from '../../../utils/date';

// Shapes
import { TODO_SHAPE } from '../../../constants/shapes';

// Styles
import './todo.scss';

// We use PureComponent instead of Component because it handles the shouldComponentUpdate method for us.
// If we want to define our own shouldComponentUpdate logic we have to use Component instead of PureComponent.
class Todo extends PureComponent {
    handleToggleTodoChecked = () => {
        const { todo, toggleTodoChecked } = this.props;

        toggleTodoChecked(todo.id);
    };

    handleRemoveTodo = () => {
        const { todo, removeTodo } = this.props;

        removeTodo(todo.id);
    };

    render() {
        const { todo } = this.props;

        return (
            <div className="todo">
                <Checkbox
                    onChange={this.handleToggleTodoChecked}
                    checked={todo.checked}
                />
                <Icon
                    onClick={this.handleRemoveTodo}
                    className="todo__delete-icon"
                    icon={faTrash}
                />
                <Tooltip
                    content={{ text: formatDateMonthYearHoursMinutes(todo.creationTime) }}
                    bindListeners
                    position={3}
                >
                    <div>
                        {todo.text}
                    </div>
                </Tooltip>
            </div>
        );
    }
}

// We define the propTypes of our Component
Todo.propTypes = {
    toggleTodoChecked: PropTypes.func.isRequired,
    todo: PropTypes.shape(TODO_SHAPE).isRequired,
    removeTodo: PropTypes.func.isRequired,
};

export default Todo;
