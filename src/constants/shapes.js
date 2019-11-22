import PropTypes from 'prop-types';

export const TODO_SHAPE = {
    creationTime: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};
