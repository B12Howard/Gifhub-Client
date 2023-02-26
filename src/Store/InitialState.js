const initialState = {
    user: {
        accessToken: '',
        displayName: '',
        email: '',
        emailVerified: '',
        metadata: {
            createdAt: '',
            creationTime: '',
            lastLoginAt: '',
            lastSignInTime: '',
        },
        uid: '',
    },
    ws: {
        id: '',
    },
    activePlaylist: {
        id: null,
        name: null,
        record: null,
    },
    server: {
        status: '',
    },
};
export default initialState;
