import React from 'react';

import './App.css';
import 'mdbreact/dist/css/mdb.css';

// import component
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import Data from './Components/Data';
import Profile from './Components/Profile';
import Tokenizer from './Components/Tokenizer';

import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

export default class App extends React.Component{
  constructor(props){
    super(props)
    let isLogin = false
    if(localStorage.getItem('username') && localStorage.getItem('password')){
      // login api 
    }
    this.state = {
      loginSuccess: isLogin,
      information: {
        company: false
      },
      tokenizer: new Tokenizer('Tokenizer')
    }
  }

  Logout = () =>{
    this.setState({ 
      loginSuccess: false,
      information: {}
    })
  }

  changeLogin = (e) => {
    this.setState({
      loginSuccess: e.isLoginSuccess,
      information: {
        company: e.company
      }
    })
    console.log(this.state.tokenizer.getToString())
  }

  renderLogin(){
    if(this.state.loginSuccess){
      return (<Data />)
    }else{
      return (<div></div>)
    }
  }

  render(){
    let isLoginComponent
    if (this.state.loginSuccess){
      isLoginComponent = <Data />
    }else{
      isLoginComponent = <Redirect to="/find-jobs/home" />
    }
    return (
      <Router>
          <div className="App">
            <Route exact path="/find-jobs" render={(props) => <Home loginSuccess={this.state.loginSuccess} logout={this.Logout} info={this.state.information} />} />
            <Route exact path="/" render={(props) => <Home loginSuccess={this.state.loginSuccess} logout={this.Logout} info={this.state.information} />} />
            <Route exact path="/find-jobs/home" render={(props) => <Home loginSuccess={this.state.loginSuccess} logout={this.Logout} info={this.state.information} Tokenizer={this.state.tokenizer}/>} />
            <Route exact path="/find-jobs/login" render={(props) => <Login loginSuccess={this.state.loginSuccess} Tokenizer={this.state.tokenizer} callBack={this.changeLogin} />} />
            <Route exact path="/find-jobs/register" render={(props) => <Register loginSuccess={this.state.loginSuccess} />} />
            <Route exact path="/find-jobs/data" render={(props) => (isLoginComponent)} />
            <Route exact path="/find-jobs/profile" render={(props) => <Profile/>} />
            <Route exact path="/find-jobs/search" render={(props) => <Profile/>} />
            {/* <Route exact path="/find-jobs/post" render={(props) => <Profile/>} /> */}
            {/* <Route exact path="/find-jobs/data" render={(props) => (!this.state.loginSuccess?(<Redirect to="/find-jobs/home" />):(<Data />))} /> */}
          </div>
      </Router>
    );
  }
}
  
