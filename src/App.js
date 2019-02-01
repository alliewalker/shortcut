import React, { Component } from 'react';
import Navbar from './components/home/Navbar';
import LoginPage from './pages/login/login-page';
import './App.css';
// import APIUrl from './helpers/environment';
import AppointmentIndex from './pages/appointment-index/AppointmentIndex';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      appointments: []
    }
  }

  componentWillMount() {
    let token = sessionStorage.getItem('token');
    if(token) {
      this.setState({ isLoggedIn: true })
      
    }
    document.title="Shortcut"
  }


  onLogin = (sessionToken) => {
    console.log(sessionToken)
    sessionStorage.setItem('token',sessionToken)
    this.setState({
      isLoggedIn: true
    })
  }

  logout = () => {
    sessionStorage.clear();
    this.setState({
      isLoggedIn:false
    })
  }


  render() {
    return (
        <div> 
          {/* {this.protectedViews()} */}
          {
            this.state.isLoggedIn
            ? (
              <div>
                <Navbar onLogout={ this.logout } />
                <AppointmentIndex/>
              </div>
            )
            : (
              <LoginPage onLogin={ this.onLogin }/>
            )
          }
        </div>
    );
  }
}

export default App;


// protectedViews = () => {
//   if (this.state.sessionToken === localStorage.getItem('token')) {
//     return (
//       <Switch>
//         <Route path='/' exact>
//           <AppointmentIndex  />
//         </Route>
//       </Switch>
//     )
//   } else {
//     return (
//       <Route path="/login" >
//         <LoginPage setToken={this.setSessionState}/>
//       </Route>
//     )
//   }

// }
