import React, { Component } from "react";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import Logo from '../../images/KY.png';

import AuthService from "../../services/auth.service";

const required = value => {
    if(!value){
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required!
            </div>
        );
    }
}

const validateUsername = value => {
    if(value.length <= 5 || value.length >= 40){
        return (
        <div className='alert alert-danger' role='alert'>
            The username must be between 5 and 40 characters.
        </div>
        );
    }
}

const validatePassword = value => {
    if(value.length <= 6 || value.length >= 30) {
        return (
        <div className='alert alert-danger' role='alert'>
            The password must be between 6 and 30 characters.
        </div>
        )
    }
}

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            succesful: false,
            message: ""
        };

        console.log(this.state);
    }
    
    onChangeUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    redirectToLoginPage() {
        this.props.history.push('/login');
    }

    async handleRegister(event) {
        event.preventDefault();
        
        if(this.state.succesful){
            this.props.history.push('/login');
            window.location.reload();
        }

        this.setState({
            message: "",
            succesful: false
        });

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0){
            try{
                const response = await AuthService.register(this.state.username, this.state.password);
                this.setState({
                    message: response.data.message,
                    succesful: true
                });

            } catch(err) {
                const errMessage = err.response.data.message;

                this.setState({
                    message: errMessage,
                    succesful: false
                });
            }
        }
    }

    render() {
        return (
            <div className='bg-gray-200 rounded py-16 px-12 m-16 flex flex-col items-center justify-center'>
                <img 
                src={Logo} 
                alt="profile-img" 
                className="rounded-full h-24"
                />

                <Form 
                onSubmit={this.handleRegister}
                ref={c => {
                    this.form = c;
                }}
                >
                    {!this.state.succesful && (
                        <div>
                            <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
                                SIGN UP
                            </div>
                            <div className='mb-4'>
                                <label className='sr-only' htmlFor='username'>Username</label>
                                <svg xmlns="http://www.w3.org/2000/svg" className="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <Input
                                type='text'
                                className='py-2.5 pl-12 border border-gray-200 w-full'
                                placeholder="Username"
                                name='username'
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                validations={[required, validateUsername]}
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='sr-only' htmlFor="password">Password</label>
                                <svg xmlns="http://www.w3.org/2000/svg" className="font-medium text-2xl text-gray-600 absolute p-2.5 px-3 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <Input
                                type='password'
                                className='py-2.5 pl-12 border border-gray-200 w-full'
                                placeholder='Password'
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required, validatePassword]}
                                />
                            </div>
                            <br/>
                            <div className='flex justify-center'>
                                <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                                    Sign up
                                </button>
                            </div>
                        </div>
                    )}

                    {this.state.message &&  (
                        <div className='form-group'>
                            <div className={
                                this.state.succesful ? 'alert alert-sucess' : 'alert alert-danger'
                            }
                            role='alert'
                            >
                                {this.state.message}
                            </div>
                        </div>
                    )}

                    {this.state.succesful && (
                        <div className='form-gropu d-grid col-6 mx-auto'>
                            <button className='btn btn-success btn-block'>
                                Login Page
                            </button>
                        </div>
                    )}

                    <CheckButton
                    style={{ display: 'none' }}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                    />
                </Form>
            </div>
        );
      }
}