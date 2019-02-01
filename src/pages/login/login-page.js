import React, { Component } from 'react';
import './login-page.css';
import logo from '../assets/ShortcutLogoFinal.png'
import APIUrl from '../../helpers/environment';

export default class LoginPage extends Component {
   constructor(props) {
   super(props)
    this.state = {
       isLogin: true,
       email: '',
       password: '',
       fullName: ''
    }
   }
   
   handleSignup = (event) => {

    event.preventDefault()
    fetch(`${APIUrl}/user/signup`,{
        method: "POST",
        body: JSON.stringify({
            email:this.state.email,
            password:this.state.password,
            fullName:this.state.fullName
        }),
        headers: new Headers ({
            "Content-Type": "application/json"
        })
    }).then((response) => response.json()
    ).then((data) => {
        console.log(data)
    }).catch(error => {
        console.log(error)
    })
}
handleNameChange = (event) => {
    this.setState({fullName: event.target.value})
}

handleEmailChange = (event) => {
    this.setState({email: event.target.value})
}

handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
}

handleLogin = (event) => {
    event.preventDefault()
    fetch(`${APIUrl}/user/login`,{
        method: "POST",
        body: JSON.stringify({
            email:this.state.email,
            password:this.state.password,
        }),
        headers: new Headers ({
            "Content-Type": "application/json"
        })
    }).then((response) => response.json()
    ).then((data) => {
        this.props.onLogin(data.sessionToken)
    }).catch(error => {
        console.log(error)
    })
}

    render() {
        return(
            <div id="login-page">
            
            {
                this.state.isLogin 
                ? (
                    // Login Form
                    <form onSubmit={ this.handleLogin } setToken={this.props.setToken}>
                    
                        <img src={logo} height="90px" width="150px"/>
                        <h4>WELCOMB</h4>
                        <input type="Email" placeholder="Email" onChange={ this.handleEmailChange } value={ this.state.email }></input>
                        <input type="password" placeholder="Password" onChange={ this.handlePasswordChange } value={ this.state.password }></input>
                        <button type="submit">Login</button>
                        <p id="toggle" onClick={ this.toggleIsLogin }>Sign Up</p>
                    </form>
                )
                : (
                    // Signup Form
                    <form onSubmit={ this.handleSignup }setToken={this.props.setToken}>
                        <img src={logo} height="90px" width="150px"/>
                        <h4>WELCOMB</h4>
                        <input type="text" placeholder="Full Name" onChange={ this.handleNameChange } value={ this.state.fullName}></input>
                        <input type="email" placeholder="Email"onChange={ this.handleEmailChange } value={this.state.email}></input>
                        <input type="password" placeholder="Password"onChange={ this.handlePasswordChange } value={this.state.password}></input>
                        <button type="submit">Sign up</button>
                        <p id="toggle" onClick={ this.toggleIsLogin }>Log In</p>
                    </form>
                )
            }
            </div>
        )
    }
    toggleIsLogin = () => {
        this.setState({ isLogin: !this.state.isLogin })
    }
}
