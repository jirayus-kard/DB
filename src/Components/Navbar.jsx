import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MDBBtn } from "mdbreact";
import PostModals from './PostModals';
import SearchModals from './SearchModals';
import './Navbar.css'

export default class Navbar extends Component{
    constructor(props) {
      super(props);
      this.state = {
        menu: false,
        dummy: false,
      };
      this.toggleMenu = this.toggleMenu.bind(this);
    }

    async toggleMenu(e){
      this.setState({ menu: !this.state.menu })
      if(e !== undefined && e.target.name === 'logout'){
        let success = await this.props.Tokenizer.Logout()
        if (success){
          this.props.logout()
        }
      }
    }

    render(){
      const show = (this.state.menu) ? "show" : ""
      let loginSuccess
      let userType
      console.log(this.props.Tokenizer.toString());
      if (this.props.loginSuccess){
        if(true){
          userType = (
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <PostModals onClickP2C={this.toggleMenu} style={{borderRadius: "20px"}} />
            </li>
          )
        }
        loginSuccess = (
          <div className={"collapse navbar-collapse " + show} id="navbarResponsive">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/profile"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu}>New Arrival</span></Link>
                </li>
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/profile"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu}>News</span></Link>
                </li>
                <div class="dropdown-toggle">
                  <li style={{paddingTop: 26, color:"white"}} role="presentation" className="nav-link active js-scroll-trigger" > Caterory
                    <i class="fa fa-caret-down"></i>
                  </li>
                  <li class="dropdown resp-active">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                  </li>
                </div>
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/profile"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu}>Payment</span></Link>
                </li>
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/profile"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu}>Profile</span></Link>
                </li>
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/home"><MDBBtn type="button" style={{borderRadius: "20px"}} outline color="danger" onClick={this.toggleMenu} name="logout">Logout</MDBBtn></Link>
                </li>
            </ul>
          </div>
          
        )
      }else{
        loginSuccess = (
          <div className={"collapse navbar-collapse " + show} id="navbarResponsive">
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/login"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu} >Sign in</span></Link>
                </li>
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/register"><MDBBtn type="button" style={{borderRadius: "20px"}} outline color="info" onClick={this.toggleMenu} >Sign Up</MDBBtn></Link>
                  {/* <Link to="/register"><button type="button" className="btn action-button btn-primary" style={{borderRadius: "20px"}} onClick={this.toggleMenu}>Sign Up</button></Link> */}
                </li>
            </ul>
          </div>
        )
      }
      return (
          <div className="Navbar">
            <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-md navbar navbar-expand-lg fixed-top" id="mainNav">
              <div className="container">
                <NavLink to="/find-jobs/home">
                  <span className="navbar-brand js-scroll-trigger" style={{paddingTop: 5}} >SNEEZZ</span>
                </NavLink>
                <button onClick={this.toggleMenu} className="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive" type="button" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"
                      value="Menu"><i className="fa fa-bars"></i>
                </button>
                {loginSuccess}
              </div>
          </nav>
          </div>
        );
    }
}

