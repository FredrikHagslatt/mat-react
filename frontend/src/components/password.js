import '../css/myStyle.css';
import React, {Component} from 'react';

class Password extends Component {
    constructor(props){
        super(props);
        this.state = {
            password: '',
            incorrectGuess: false,
        };
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event){
        this.setState({incorrectGuess: true});
        alert('Stop this madness!');
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    render (){
        return(
            <label>Admin login
            <form onSubmit={this.handleLogin}>
                <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
                <input type="submit" value="Login" />
            </form>
            </label>
        );
    }
}export default Password;