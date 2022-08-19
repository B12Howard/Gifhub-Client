import { useCallback, useContext, useState } from 'react';
import { IFirebaseAuthResponse } from '../../Models/FirebaseAuth';
import { SetUserDataLocalStorage } from '../../Services/LocalStorage';
import LoginService, { CheckTokenService } from '../../Services/AuthenticationService';
import { Context } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';
import Button from '../../Shared/Components/button';
import { seteuid } from 'process';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [error, setError] = useState<string>('');
    // @ts-ignore
    const [context, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const redirect = useCallback(
        (path) => {
            navigate(path);
        },
        [navigate]
    );

    const submit = async () => {
        try {
            const userCredentials = await LoginService(email, pass);
            setError('');
            setUserData(userCredentials.user);
            redirect('/home/player');
        } catch (err: any) {
            setError('Incorrect Credentials');
        }

        try {
            const check = await CheckTokenService();
        } catch (err: any) {}
    };

    const setUserData = (authData: IFirebaseAuthResponse) => {
        SetUserDataLocalStorage(authData);

        dispatch({
            type: 'SET_USER',
            payload: {
                authData,
            },
        });
    };

    return (
        <>
            <div className="login-container">
                <div className="login-input-container">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="login-input-container">
                    <input
                        id="pass"
                        name="pass"
                        type="password"
                        value={pass}
                        onChange={(ev) => setPass(ev.target.value)}
                    />
                    <label htmlFor="pass">Password</label>
                </div>
                <div>
                    <Button name={'Submit'} callback={(val: any) => submit()} />
                </div>

                {error ? <div>{error}</div> : null}
            </div>
        </>
    );
};

export default Login;
