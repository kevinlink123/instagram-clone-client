import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Image from "./image.component";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class ImagesBoard extends Component {
  constructor(props) {
    super(props);
    this.renderImages = this.renderImages.bind(this);
    this.hanldePagination = this.hanldePagination.bind(this);

    this.state = {
      pages: 1,
      imagesData: []
    };
  }

  async componentDidMount() {
    const response = await UserService.getAllImages(this.state.pages);
    const { images } = response.data;

    this.setState({
      imagesData: images
    });

  }

  async hanldePagination(event) {
    const response = await UserService.getAllImages(this.state.pages + 1);
    const { images } = response.data;

    this.setState({
      pages: this.state.pages + 1,
      imagesData: images,
    })
  }

  renderImages() {
    const list = [];
    const loggedUser = AuthService.getCurrentUser();
    this.state.imagesData.forEach((image) => {
      const { likes } = image;
      
      const hasLike = likes.find((like) => {
        return (like.imageId === image.id && like.userId === loggedUser.id);
      });

      const imageComponent = (<Image 
        src={image.url} 
        description={image.description} 
        likesCount={image.likesCount}
        imageId={image.id}
        hasLike={!!hasLike}
        >
        </Image>)
      
      list.push(imageComponent);
    });

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
              <h1 className="sm:text-4xl text-5xl font-bold font-medium title-font mb-2 text-gray-900">Images Board</h1>
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
            {this.renderImages()}
          </div>

          <div className>
            <svg onClick={this.hanldePagination} xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mt-32" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg> 
            <div className='text-center'>
              LOAD MORE
            </div>
          </div>
        </div>
      </section>
    );
  }
}
