import React, { Component } from "react";

export default class Image extends Component {
    constructor(props){
        super(props);

        this.state = {
            image: props.src,
            description: props.description,
            likesCount: props.likesCount,
        }
    }

    render() {
        return(
            <div className='mt-10 ml-10 mr-14 pt-4 pb-4 bg-gray-100'>
                <div className='h-48'>
                    <img 
                    className='mx-8 w-64 shadow border p-4'
                    src={this.state.image}
                    alt="img-post" 
                    width="350px"
                    />
                </div>
                <div className='p-2'>
                    <div className='text-center subpixel-antialiased font-black bg-blue-200 rounded text-md mt-4'>{this.state.description}</div>
                </div>
                
            </div>
            
        )
    }
}