import React from 'react';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import './App.css';
import ImageForm from "./components/ImageForm/ImageForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import {Component} from "react";
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
const app = new Clarifai.App({
 apiKey: '2e14f2c6ed92446a88d69c2bd99dbd59'
});
const particlestoptions= {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value}, () => console.log(this.state.input));
  }


  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});

    console.log(this.state.imageUrl);
    app.models.predict(
Clarifai.COLOR_MODEL,
    // URL
    "https://samples.clarifai.com/metro-north.jpg"
)
.then(function(response) {
console.log(response);
    });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
      <Particles className="particles"
            params={particlestoptions}
          
          />
      <Navigation></Navigation>
      <Logo></Logo>
      <Rank></Rank>
      <ImageForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}  ></ImageForm>
      <FaceRecognition imageUrl={imageUrl}></FaceRecognition>
  </div>
    );
  }
}

export default App;
