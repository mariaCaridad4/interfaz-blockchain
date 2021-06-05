import React, { useState, useEffect } from 'react';
import { navigate, Router } from '@reach/router';

import Navigation from './Components/Navigation';
import Login from './Components/Login';
import Register from './Components/Register'
import Protected from './Components/Protected';
import Content from './Components/Content';


export const UserContext = React.createContext([]);

function App() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const logOutCallback = async () => {
        await fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include',
        });

        setUser({});
        navigate('/');
    }

    useEffect(() => {
        async function checkRefreshToken() {
          const result = await (await fetch('http://localhost:4000/refresh_token', {
            method: 'POST',
            credentials: 'include', // Needed to include the cookie
            headers: {
              'Content-Type': 'application/json',
            }
          })).json();
            setUser({
              accesstoken: result.accesstoken,
            });
            setLoading(false);
        }
        checkRefreshToken();
      }, []);

    if (loading) return <div>Loading ...</div>

    return (
        <UserContext.Provider value={[user, setUser]}>
            <div className="app">
                <Navigation logOutCallback={logOutCallback} />
                <Router id="router">
                    <Login path="login" />
                    <Register path="register" />
                    <Protected path="protected" />
                    <Content path="/" />
                </Router>
            </div>
        </UserContext.Provider>
    )

}

export default App;
