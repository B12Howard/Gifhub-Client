import React, { useContext } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { isTokenValid } from '../Services/AuthService';
import { Context } from '../Store/Store';
import { deleteLocalStorage } from '../Scripts/getSetLocalStorage';

// Check if person is authorized to go to page

// TODO
// Move the top bar and sidebar components out of each page so they don't re-render on each page load.
// I think they can be moved to this part <Component {...props} /> HL 3/11/21
const PrivateRoute = ({ component: Component, ...rest }) => {
    const context = useContext(Context);
    const loggedIn = isTokenValid();
    const navigate = useNavigate();
    return (
        <Route
            render={(props) =>
                loggedIn ? (
                    // Split into two ternaries because loggedIn.stats can be undefined if loggedIn is undefined
                    loggedIn.status === true ? (
                        <Component {...props} />
                    ) : (
                        // For the case when a user has an expired token and has to re-log in. Clear the context state if there is any.
                        // Local storage is already cleared in the AuthService function
                        // useContext dispatch
                        <>
                            {context[1]({
                                type: 'RESET_STATE',
                            })}

                            {deleteLocalStorage()}
                            {() => navigate('/Login', { replace: true, state: { from: props.location } })}
                            {/* <Navigate  to='/Login' replace state: { from: props.location }  /> */}
                        </>
                    )
                ) : (
                    // For the case when a user has an expired token and has to re-log in. Clear the context state if there is any.
                    // Local storage is already cleared in the AuthService function
                    // useContext dispatch
                    <>
                        {context[1]({
                            type: 'RESET_STATE',
                        })}

                        {deleteLocalStorage()}
                        {() => navigate('/Login', { replace: true, state: { from: props.location } })}
                    </>
                )
            }
        />
    );
};
export default PrivateRoute;
