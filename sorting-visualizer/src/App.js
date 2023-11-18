import React, {Component} from 'react';
import './App.css';
import Bar from './components/Bar';
import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forward from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';
import BubbleSort from './algorithms/BS';
class App extends Component {
  state = {  
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 10,
    delay: 100,
    algorithm: 'Bubble sort',
    timeouts: []
  } 

ALGORITHMS = {
'Bubble sort' : BubbleSort,

}

  //generating random values and saving them into an array to be sorted.
  randomNumber = (min, max) =>{
    return Math.floor(Math.random() * (max  - min) + min);
  }

  clearColorKey = () =>{

    let blankKey = new Array(this.state.count).fill(0);

    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey]
    })
  }

  clearTimeOuts = () =>{
		this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
		this.setState({ timeouts: [] });
  }
  

  randomArray = () => {
    this.clearTimeOuts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];
    
    for(let i = 0; i < count; i++){
      temp.push(this.randomNumber(50, 200));
    }
    this.setState({
      array: temp,
      arraySteps: [temp],
      count:count,
      currentStep: 0

    }, ()=>{
      this.generateSteps();
    } )
  };

  componentDidMount(){
    this.randomArray();
  }


  changeArray = (index, value) =>{
    let arr = this.state.array;
    arr[index] = value;
    this.setState({
      array:arr,
      arraySteps: [arr],
      currentStep: 0
    }, ()=>{
      this.generateSteps();
    })
  }


  generateSteps = () =>{
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);
    this.setState({
      arraySteps:steps,
      colorSteps: colorSteps
    })
    
  }

start = () =>{
  let steps = this.state.arraySteps;
  let colorSteps = this.state.colorSteps;

  this.clearTimeOuts();
  let timeOuts = [];
  let i = 0;

  while (i < steps.length - this.state.currentStep){
    let timeout = setTimeout(() => {
      let currentStep = this.state.currentStep;
      this.setState({
        array: steps[currentStep],
        colorKey: colorSteps[currentStep],
        currentStep: currentStep + 1,
      });
      timeOuts.push(timeout);
    }, this.state.delay * i);
    i++;
  }

  this.setState({
    timeouts: timeOuts
  })
}


  render() { 
    let bars = this.state.array.map((value, index)=>{
      return (<Bar key={index} 
      index={index} 
      length={value}
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />)
    });

    let playButton;

    if(this.state.arraySteps.length === this.state.currentStep){
      playButton = (
        <button className='controller' onClick={this.randomArray}>
          <RotateLeft />
        </button>
      )
    } else {
      playButton = (
        <button className='controller' onClick={this.start}>
          <Play />
        </button>
      )
    }
    return (
      <div className="app">
      <div className='frame'>
        <div className='barsDiv container card'>
          {bars}
        </div>
        </div>
        <div className='control-panel'>
          <div className='control-buttons'>
          <button className='controller'>
          <Backward />
        </button>
            {playButton}
            <button className='controller'>
          <Forward />
        </button>
          </div>
        </div>
        <div className='panel'>

        </div>
      </div>
    );
  }
}
export default App;
