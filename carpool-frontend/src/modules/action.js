// import { createAction, handleActions } from 'redux-actions';
// import { takeLatest } from 'redux-saga/effects';
// import * as actionAPI from '../lib/api/action';
// import createRequestSaga, {
//     createRequestActionTypes
// } from '../lib/createRequestSaga';
// import produce from "immer";
//
// const [GET_RIDE_PARTNERS, GET_RIDE_PARTNERS_SUCCESS, GET_RIDE_PARTNERS_FAILURE] =createRequestActionTypes('action/GET_RIDE_PARTNERS');
// const [ADD_RIDE, ADD_RIDE_SUCCESS, ADD_RIDE_FAILURE] = createRequestActionTypes('action/ADD_RIDE');
// const [CANCEL_RIDE, CANCEL_RIDE_SUCCESS, CANCEL_RIDE_FAILURE] = createRequestActionTypes('action/CANCEL_RIDE');
//
// export const getRidePartners = createAction(GET_RIDE_PARTNERS);
// export const addRide = createAction(ADD_RIDE);
// export const cancelRide = createAction(CANCEL_RIDE);
//
// const getRidePartnersSaga = createRequestSaga(GET_RIDE_PARTNERS, actionAPI.getRidePartners);
// const addRideSaga = createRequestSaga(ADD_RIDE, actionAPI.addRide);
// const cancelRideSaga = createRequestSaga(CANCEL_RIDE, actionAPI.cancelRide);
//
// export function* actionSaga() {
//     yield takeLatest(ADD_RIDE, addRideSaga);
//     yield takeLatest(CANCEL_RIDE, cancelRideSaga);
//     yield takeLatest(GET_RIDE_PARTNERS, getRidePartnersSaga);
// }
//
// const initialState ={
//     ridePartners: [
//     ],
//     partnersError: null,
//     toggleError: null,
// };
//
// const action = handleActions({
//         [GET_RIDE_PARTNERS_SUCCESS]: (state, { payload: rides }) => (
//             produce(state, draft => {
//                 draft.ridePartners = [];
//                 if (Array.isArray(rides.data)) {
//                     rides.data.map(ride => draft.ridePartners.push(ride.id));
//                 } else {
//                     draft.ridePartners = rides.data;
//                 }
//                 draft.partnersError = null;
//             })
//         ),
//         [GET_RIDE_PARTNERS_FAILURE]: (state, { payload: error }) => (
//             produce(state, draft => {
//                 draft.ridePartners = initialState.ridePartners;
//                 draft.partnersError= error;
//             })
//         ),
//         [ADD_RIDE_SUCCESS]: (state, { payload: result }) => (
//             produce(state, draft => {
//                 draft.ridePartners.push(result.payload);
//                 draft.toggleError = null;
//             })
//         ),
//         [ADD_RIDE_FAILURE]: (state, { payload: error }) => ({
//             ...state,
//             toggleError: { status: error.status, type: 'add' }
//         }),
//         [CANCEL_RIDE_SUCCESS]: (state, { payload: result }) => (
//             produce(state, draft => {
//                 draft.ridePartners.splice(draft.ridePartners.findIndex(r => r.id === result.payload), 1);
//                 draft.toggleError = null;
//             })
//         ),
//         [CANCEL_RIDE_FAILURE]: (state, { payload: error }) => ({
//             ...state,
//             toggleError: { status: error.status, type: 'cancel' }
//         })
//     },
//     initialState
// );
//
// export default action;