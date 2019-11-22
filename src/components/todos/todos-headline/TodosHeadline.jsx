import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TODO_SHAPE } from '../../../constants/shapes';

class TodosHeadline extends PureComponent {
    render() {
        const { todos } = this.props;

        const todoCount = todos.length;
        const checkedTodosCount = todos.filter((todo) => todo.checked).length;

        const headlineString = `
             ${checkedTodosCount > 0 ? checkedTodosCount : ''}
             ${checkedTodosCount > 0 && todoCount > 0 ? '/' : ''} 
             ${todoCount > 0 ? todoCount : ''} ${todoCount === 1 && checkedTodosCount <= 0 ? 'Todo' : 'Todos'} 
             ${checkedTodosCount > 0 ? 'abgeschlossen' : ''}
        `;

        return (
            <h2 className="todos-headline">
                {headlineString}
            </h2>
        );
    }
}

TodosHeadline.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape(TODO_SHAPE)).isRequired,
};

TodosHeadline.displayName = 'TodosHeadline';

export default TodosHeadline;
