import initialState from './InitalState';

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'RESET_STATE':
            return {
                ...state,
                user: initialState.user,
            };
        // case 'SET_ERROR':
        //     return {
        //         ...state,
        //         error: action.payload
        //     };
        default:
            return state;
    }
};

export default Reducer;
