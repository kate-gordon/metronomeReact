import React, { Component } from 'react';
import Styled from "styled-components"; 
import click1 from './components/Assets/click1.wav'; 
import click2 from './components/Assets/click2.wav';
import bang2 from './components/Assets/bang_2.wav'; 
import sound95 from './components/Assets/sound95.wav'; 
import sound97 from './components/Assets/sound97.wav'; 
import "./App.css"; 

const MetronomeStyle = Styled.div ` 
    border-radius: 6%; 
    background-color: 
    text-align: center;
    max-width: 375px; 
    margin: 2rem auto; 
    padding: 30px; 
    border: solid 3px rgb(21, 23, 35); 
    box-shadow: 5px 10px gray;
   
`
const InputStyle = Styled.input `
    width: 100%; 
    margin: 10px;
    

`

const ButtonStyle = Styled.button`
  background: #3f3d69;
  padding: 10px;
  border: 1px solid #27264a;
  border-radius: 2px;
  width: 100px;
  color: #fff;
  font-size: 18px;
`


class App extends Component {

  state = {
    playing: false,
    count: 0,
    bpm: 100, 
    beatsPerMeasure: 4
  };

  click1 = new Audio(click1); 
  click2 = new Audio(click2);
  bang2 = new Audio(bang2);
  sound95 = new Audio(sound95);  
  sound97 = new Audio(sound97); 

  handleBpmChange = e => {
    const bpm = e.target.value;
    if (this.state.playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
  
      // Set the new BPM, and reset the beat counter
      this.setState({
        count: 0,
        bpm
      });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    } 
  }

  startStop = () => {
    if (this.state.playing) {
      // Stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Start a timer with the current BPM
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;
  
    // The first beat will have a different sound than the others
    if (count % (beatsPerMeasure - 1) === 1) {
      this.sound97.play(); 
    }
    else if (count % beatsPerMeasure === 0) {
      this.bang2.play();
    } 
    else {
      this.sound95.play();
    }
  
    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {
    const { playing, bpm } = this.state; 

    return (
      <MetronomeStyle>
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <InputStyle 
          type="range" 
          min="60" 
          max="240" 
          value={bpm}
          onChange={this.handleBpmChange} /> 
        </div>   
          <ButtonStyle onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</ButtonStyle>
      </MetronomeStyle>
    )
  }
}

export default App; 
