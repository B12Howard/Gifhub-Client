import { IFirebaseAuthResponse } from '../Models/FirebaseAuth';

/**
 * Sets user data into local storage
 * @param {object} data of the form {"first_name", "last_name", "email", "linkedin"} 3/15/21
 * @param {string} idToken jwt token
 */
export const SetUserDataLocalStorage = (data: IFirebaseAuthResponse) => {
    localStorage.setItem('idToken', data.idToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data));
};

export const GetUserDataByKey = (key: string) => {
    const user = localStorage.getItem('user');
    if (!user) return;
    return JSON.parse(user)[key];
};

export const DeleteLocalStorage = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('user');
};
