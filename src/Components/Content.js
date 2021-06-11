import React, { Component } from 'react';
import axios from 'axios';

import Inicio from './Inicio';
import Paciente from './Navs/NavPaciente';

export default class Content extends Component {

    state = {};
    componentDiMount() {
        
        axios.get('user').then(
            res => {
                //console.log(res);
                this.setState({
                    user: res.data
                })
            },
            err => {
                console.log(err)
            }
        )
    }
    render () {
        if (this.state.user){
           //falta condicion del rol para ver a donde se dirige
           return (
            <Paciente />
           )

        }
        return <div><Inicio /></div>;
    }
    
}

