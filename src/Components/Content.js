import React, { useContex } from 'react';
import { Redirect } from '@reach/router';
import { UserContext } from '../App';

const Content = () => {
    const [user] = useContex(UserContext);
    if(!user.accestoken) return <Redirect from='' to='login' noThrow />
    return <div>This is the content.</div>;
}

export default Content;