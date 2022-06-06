export interface IFirebaseAuthResponse {
    displayName: string;
    email: string;
    expiresIn: number;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered: boolean;
}

export class FirebaseAuthResponse implements IFirebaseAuthResponse {
    displayName: string = '';
    email: string = '';
    expiresIn: number = 0;
    idToken: string = '';
    kind: string = '';
    localId: string = '';
    refreshToken: string = '';
    registered: boolean = false;
    constructor(params: Partial<IFirebaseAuthResponse>) {
        return Object.assign(this, params);
    }
}
