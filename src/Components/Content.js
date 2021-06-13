import React, { Component } from 'react';
import axios from 'axios';

import Inicio from './Inicio';
import Paciente from './Navs/NavPaciente';

export default class Content extends Component {
    
    render () {
        if (this.props.user){
           //falta condicion del rol para ver a donde se dirige
           return (
            <Paciente />
           )

        }
        return <div><Inicio /></div>;
    }
    
}

