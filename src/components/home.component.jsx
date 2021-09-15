import React, { Component } from "react";
import UserService from "../services/user.service";
import Logo from '../images/KY.png';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  async componentDidMount() {
    try{
      const response = await UserService.getHomePage();
      this.setState({
          message: response.data
      })
    } catch(err) {
      console.log(err);
    }
    
      
  }

  render() {
    return (
      <div className='container'>
          <div className='container'>
              <img 
              src={Logo}
              className='object-none w-max mx-auto'
              alt="img"
              />
              <h3 className='text-center'>{this.state.message}</h3>
          </div>
      </div>
    );
  }
}
