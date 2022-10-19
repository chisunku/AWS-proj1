import React, { PureComponent } from 'react'
import { useRouteMatch } from 'react-router-dom';
import '../myStyle.css';

class LogIn extends PureComponent {

    render(){
        return (
            <center><div>
                <h1>CHINMAYI'S MINI DROPBOX</h1>
                <a href="https://chinmayisunku.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=2ub6k6peilk5te5prhkq2cjm5k&redirect_uri=https://drop.chinmayisunku.ml/">
                <button class="login_button"> GETIN </button></a>
            </div></center>
        );
    }
}

export default LogIn
