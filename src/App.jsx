import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import KY from './images/KY.png';
import AuthService from './services/auth.service';

import Home from './components/home.component'
import Login from './components/auth/login.component';
import Profile from "./components/auth/profile.component";
import Register from './components/auth/register.component';
import BoardUser from "./components/board-user.component";
import Upload from './components/upload.component'



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if(user){
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state; 
    return (
      <div>
        <nav>
          <div className="">
            <div className="flex justify-between h-16 px-6 shadow items-center">
              <div className="flex items-center space-x-8">
                <div className="flex-none w-16 relative">
                  <img 
                  className="cursor-pointer"
                  src={KY}
                  alt="logo"
                  />
                </div>
                <div className="hidden md:flex justify-around space-x-4">
                  <Link to={"/home"} className='hover:text-indigo-600 text-gray-700'>
                    Home
                  </Link>

                  {currentUser && (
                      <Link to={'/user'} className='hover:text-indigo-600 text-gray-700'>
                        Board
                      </Link>
                  )}
                </div>
              </div>
              
              {currentUser ? (
                <div className='flex space-x-4 items-center'>
                  <Link to={'/profile'} className='text-gray-800 text-sm'>
                    {currentUser.username}
                  </Link>
                  <a href="/login" className='bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm' onClick={this.logOut}>
                    Log Out
                  </a>
              </div>
              ): (
                <div className='flex space-x-4 items-center'>
                  <Link to={'/login'} className='text-gray-800 text-sm'>
                    Login
                  </Link>

                  <Link to={'/register'} className='bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm'>
                    Sign Up
                  </Link>
              </div>
              )}

            </div>
          </div>
        </nav>
        <div className='container mt-3'>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/user' component={BoardUser} />
            <Route path='/upload-image' component={Upload} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
