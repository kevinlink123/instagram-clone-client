import React, { Component } from "react";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class Image extends Component {
    constructor(props){
        super(props);
        this.handleLike = this.handleLike.bind(this);
        this.state = {
            image: props.src,
            description: props.description,
            likesCount: props.likesCount,
            imageId: props.imageId,
            hasLike: props.hasLike
        }
    }

    async handleLike(event) {
        const user = AuthService.getCurrentUser();
        const response = await UserService.postLike(user.id, this.state.imageId);
        this.setState({
            likesCount: response.data.likeCreated ? this.state.likesCount + 1 : this.state.likesCount - 1,
            hasLike: !this.state.hasLike

        })
        console.log(response.data.likeCreated);
    }

    render() {
        return(
            <div className='mt-10 ml-10 mr-14 pt-4 pb-4 bg-gray-100'>
                <div>
                    <img 
                    className='mx-8 w-64 shadow border p-7'
                    src={this.state.image}
                    alt="img-post" 
                    width="350px"
                    height='350px'
                    />
                </div>
                <div className='absolute ml-9 -mt-7' onClick={this.handleLike}>
                    {this.state.hasLike && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    )}

                    {!this.state.hasLike && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    )}
                </div>
                <div className='absolute ml-16 -mt-7'>
                    {this.state.likesCount}
                </div>
                <div className='p-2'>
                    <div className='text-center subpixel-antialiased font-black bg-blue-200 rounded text-md mt-4'>{this.state.description}</div>
                </div>
                
            </div>
            
        )
    }
}