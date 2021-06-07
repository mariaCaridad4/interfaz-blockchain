import React, { useContex } from 'react';
import { Redirect } from '@reach/router';
import { UserContext } from '../App';

import Paciente from '../NavPaciente';

const Content = () => {
    const [user] = useContex(UserContext);
    if(!user.accestoken) return <Redirect from='' to='login' noThrow />
    return <div><Paciente /></div>;
}

export default Content;