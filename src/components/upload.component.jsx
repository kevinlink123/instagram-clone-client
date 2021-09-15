import React, { Component } from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import UserService from "../services/user.service";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);

    this.state = {
      description: "",
      imageUrl: "",
      imageFile: null,
      message: '',
      successful: false
    };
  }

  async componentDidMount() {
    this.setState({
      imageUrl: "https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
    })
  }

  onDescriptionChange(event) {
      this.setState({
        description: event.target.value
      })
  }

  async onImageChange(event) {
    this.setState({
      content: "asdasdasdasd",
      imageUrl: URL.createObjectURL(event.target.files[0]),
      imageFile: event.target.files[0]
    })
  }

  async handleImageUpload(event) {
    event.preventDefault();

    try{
      const imageFile = this.state.imageFile;
      const description = this.state.description;
      const response = await UserService.uploadImage(imageFile, description);
      this.setState({
        message: response.data.message,
        successful: true
      })

    } catch(err) {
      this.setState({
        message: err.response.data.message,
        successful: false,

      })
    }
  }

  render() {
    return (
      <div className="flex flex-items w-64">
        <Form
          onSubmit={this.handleImageUpload}
          ref={c => {
              this.form = c;
          }}
          >
            <div className="flex justify-center font-bold text-3xl text-gray-600 p-4">
                Upload Image
            </div>
            <div className="bg-gray-200 rounded py-16 px-64 m-16 flex">
              
              <div className='mb-4'>
                  <label className='sr-only' htmlFor='file'>file</label>
                  <Input
                  type='file'
                  className='py-4 pl-1 border border-gray-200'
                  placeholder="file"
                  name='image'
                  onChange={this.onImageChange}
                  />
              </div>
              <div>
                <img 
                className='mx-auto'
                src={this.state.imageUrl}
                alt="(No file)" 
                height=""
                width=''
                />
                <div className='mx-auto'>
                  <label className='sr-only' htmlFor='file'>description</label>
                  <Input
                  type='text'
                  className='w-full mt-2 py-10 pl-1 border'
                  placeholder="Description"
                  name='description'
                  onChange={this.onDescriptionChange}
                  value={this.state.description}
                  />
                </div>
                <div className='mt-16 mx-24'>
                    <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold px-3 border-b-4 border-blue-700 hover:border-blue-500 rounded h-20 w-24' disabled={this.state.loading}>
                        Upload
                    </button>
                </div>
                {this.state.successful && (
                  <div className='flex items-center justify-center mx-auto mt-4'>
                      <div className='alert alert-success' role='alert'>
                          {this.state.message}
                      </div>
                  </div>
                )}

                {this.state.message && !this.state.successful && (
                  <div className='flex items-center justify-center mx-auto mt-4'>
                      <div className='alert alert-danger' role='alert'>
                          {this.state.message}
                      </div>
                  </div>
                )}
              </div>
            </div>
            </Form>
            
      </div>
    );
  }
}
