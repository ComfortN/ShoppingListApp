const initialState = {
    user: null,
};
    
    const authReducer = (state = initialState, action) => {
        switch (action.type) {
        case 'LOGIN':
            return { 
            ...state, 
            user: {
                uid: action.payload.uid,
                email: action.payload.email,
                displayName: action.payload.displayName || null,
                emailVerified: action.payload.emailVerified,
            }
            };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
        }
    };
    
export default authReducer;