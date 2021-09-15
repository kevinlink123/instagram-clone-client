import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import Logo from '../../images/KY.png';

import AuthService from '../../services/auth.service'

const required = value => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This Field is Required!
            </div>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            password: '',
            loading: false,
            message: ''
        };
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

    async handleLogin(event) {
        event.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0) {
            try{
                await AuthService.login(this.state.username, this.state.password);
                this.props.history.push('/profile');
                window.location.reload();
            } catch(err) {
                const errMessage = err.response.data.message;

                this.setState({
                    message: errMessage,
                    loading: false
                });
            }
            
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className='bg-gray-200 rounded py-16 px-12 m-16 flex flex-col items-center justify-center'>
                <img 
                className="rounded-full h-24" 
                src={Logo} 
                alt="user avatar" 
                />

                <Form
                onSubmit={this.handleLogin}
                ref={c => {
                    this.form = c;
                }}
                >
                    <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
                        LOGIN
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
                        validations={[required]}
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
                        validations={[required]}
                        />
                    </div>
                    <br />
                    <div className='flex justify-center'>
                        <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded' disabled={this.state.loading}>
                            Login
                        </button>
                    </div>

                    {this.state.message && (
                        <div className='flex items-center justify-center mx-auto'>
                            <div className='alert alert-danger' role='alert'>
                                {this.state.message}
                            </div>
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