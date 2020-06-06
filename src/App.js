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

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value}, () => console.log(this.state.input));
  }


  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});

    console.log(this.state.imageUrl);
    app.models.predict(
Clarifai.FACE_DETECT_MODEL,
    // URL
   this.state.input
)
.then(response=> this.displayFaceBox(
this.calculateFaceLocation(response))
).catch(err=>console.log(err));
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
      <FaceRecognition box={box} imageUrl={imageUrl}></FaceRecognition>
  </div>
    );
  }
}

export default App;
