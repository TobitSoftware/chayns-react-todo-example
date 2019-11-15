import produce from 'immer';
import { actions } from './reducerConstances';

const initialState = {
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
            case actions.ADDCHILD: {
                draft.child = action.data;
                console.log('reducer', action.data);
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
                draft.parent.sign = action.data.parent;
                draft.supervisor.sign = action.data.supervisor;
                return draft;
            }
            default: {
                return state;
            }
        }
    })
);
