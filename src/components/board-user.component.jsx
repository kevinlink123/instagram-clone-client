import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Image from "./image.component";

import UserService from "../services/user.service";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);
    this.renderImages = this.renderImages.bind(this);

    this.state = {
      message: "asdasd",
      imagesData: []
    };
  }

  async componentDidMount() {
    const response = await UserService.getAllImages();
    const images = response.data.images;
    this.setState({
      imagesData: images
    });
  }

  renderImages() {
    const list = [];
    this.state.imagesData.forEach( (image) => {
      const imageComponent = (<Image 
        src={image.url} 
        description={image.description} 
        likesCount='10'
        width="100px"
        heigh
        >
        </Image>)
      
      list.push(imageComponent);
    });

    // const imageComponent = (<Image 
    //   src='https://storage.googleapis.com/kevin-insta-clone/768362937kitten.png' 
    //   description='QUE ONDA PAPAAAI' 
    //   likesCount='10'>
    //   </Image>)
    // list.push(imageComponent);

    return (
      <div className='flex flex-wrap -m-4'>
        {list}
      </div>
    )
  }

  render() {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
        
        
          <div className="flex flex-wrap w-full mb-10 mx-2 items-center">
            <div className="w-full mb-6 lg:mb-0">
              <h1 className="sm:text-4xl text-5xl font-bold font-medium title-font mb-2 text-gray-900">Board</h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <Link 
            className='bg-indigo-600 px-10 py-2 rounded mt-4 text-white hover:bg-indigo-500 cursor-pointer text-sm'
            to={"/upload-image"}
            >
              Upload Image
            </Link>
          </div>

          <div className="flex flex-wrap -m-4">

            {/* <div className="lg:w-1/4 p-4 w-1/2">
              <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"/>
              </a>
              <div className="mt-4">
                <p className="mt-1 text-center">asdasdsa</p>
              </div>
            </div> */}
            {this.renderImages()}
          </div>
        </div>
      </section>
    );
  }
}
