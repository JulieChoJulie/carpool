import { createAction, handleActions } from 'redux-actions';

const MENU_TOGGLE = 'menu/MENU_TOGGLE';

export const menuToggle = createAction(MENU_TOGGLE);

const initialState = {
    isMenuClosed: true,
}

const menu = handleActions(
    {
        [MENU_TOGGLE]: (state) => ({
            ...state,
            isMenuClosed: !state.isMenuClosed
        })
    },
    initialState
);

export default menu;
