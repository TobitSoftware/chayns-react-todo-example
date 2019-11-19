import produce from 'immer';
import { actions } from './reducerConstances';

const initialState = {
    boardId: 0,
    event: {

    },
    child: {

    },
    parent: {

    },
    supervisor: {

    }
};

export default (state = initialState, action) => (
    produce(state, (draft) => {
        switch (action.type) {
            case actions.ADDBOARD: {
                draft.boardId = action.data;
                return draft;
            }
            case actions.ADDCHILD: {
                draft.child = action.data;
                return draft;
            }
            case actions.ADDEVENT: {
                draft.event = action.data;
                return draft;
            }
            case actions.ADDPARENT: {
                draft.parent = action.data;
                return draft;
            }
            case actions.ADDSUPERVISOR: {
                draft.supervisor = action.data;
                return draft;
            }
            case actions.ADDCONFIRM: {
                draft = initialState;
                return draft;
            }
            case actions.REMOVEPARENTSIGN: {
                draft.parent.sign = '';
                return draft;
            }
            case actions.REMOVESUPERVISORSIGN: {
                draft.supervisor.sign = '';
                return draft;
            }
            default: {
                return state;
            }
        }
    })
);
