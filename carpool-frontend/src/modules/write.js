import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const CHANGE_OFFERING = 'write/CHANGE_OFFERING';
const CHANGE_ROUNDTRIP = 'write/CHANGE_ROUNDTRIP';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value, id}) => ({
    key,
    value,
    id
}));
export const changeOffering = createAction(CHANGE_OFFERING, value => value);
export const changeRoundtrip = createAction(CHANGE_ROUNDTRIP, value => value)

const initialState = {
    isRoundTrip: true,
    offering: true,
    rides: [
        {
            id: 0,
            when: new Date(),
            to: '',
            from: '',
            price: 10,
            seats: 1,
        },
        {
            id: 1,
            when: new Date(),
            to: '',
            from: '',
            price: 10,
            seats: 1,
        }
    ]

};

const write = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [CHANGE_FIELD]: (state, { payload: { key, value, id }}) => {
            return produce(state, draft => {
                draft.rides[id][key] = value;
            })
        },
        [CHANGE_OFFERING]: (state, { payload: value }) => (
            {
            ...state,
            offering: value
            }
        ),
        [CHANGE_ROUNDTRIP]: (state, { payload: value }) => (
            {
                ...state,
                isRoundTrip: value
            }
        )
    },
    initialState
);

export default write;