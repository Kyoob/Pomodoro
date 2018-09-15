import React from 'react';
import './App.css';

const l = 25
const bl = 5

function Footer() {
  return (
    <footer>
      <p>Designed and Coded by</p>
      <a href='https://github.com/Kyoob' target='_blank' rel='noopener noreferrer'>Tim Coutinho</a>
    </footer>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: bl,
      sessionLength: l,
      secsLeft: l * 60,
      mode: 'Session',
      running: false
    };
  }

  decrementSessionLength() {
    this.setState({
      sessionLength: this.state.sessionLength - 1,
      secsLeft: this.state.secsLeft - 60
    });
  }

  incrementSessionLength() {
    this.setState({
      sessionLength: this.state.sessionLength + 1,
      secsLeft: this.state.secsLeft + 60
    });
  }

  decrementBreakLength() {
    this.setState({
      breakLength: this.state.breakLength - 1
    });
  }

  incrementBreakLength() {
    this.setState({
      breakLength: this.state.breakLength + 1
    });
  }

  switchModes(from) {
    clearInterval(this.timer);
    this.setState({
      mode: from === 'Break' ? 'Session' : 'Break',
      secsLeft: from === 'Break' ? this.state.sessionLength * 60 : this.state.breakLength * 60,
      running: !this.state.running
    }, () => this.toggle());
  }

  toggle() {
    this.setState({
      running: !this.state.running
    }, () => {
      if (this.state.running) {
        this.setState({
          secsLeft: this.state.secsLeft - 1
        });
        this.timer = setInterval(() => {
          if (this.state.secsLeft === 0)
            this.switchModes(this.state.mode);
          else
            this.setState({
              secsLeft: this.state.secsLeft - 1
            });
        }, 1000);
      } else
        clearInterval(this.timer);
    });
  }

  reset() {
    clearInterval(this.timer);
    this.setState({
      breakLength: bl,
      sessionLength: l,
      secsLeft: l * 60,
      mode: 'Session',
      running: false
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>Pomodoro Clock</h1>
        <span id='break-session'>
          <Break
            length={this.state.breakLength}
            running={this.state.running}
            decrement={this.decrementBreakLength.bind(this)}
            increment={this.incrementBreakLength.bind(this)}/>
          <Session
            length={this.state.sessionLength}
            running={this.state.running}
            decrement={this.decrementSessionLength.bind(this)}
            increment={this.incrementSessionLength.bind(this)}/>
        </span>
        <Timer
          length={this.state.secsLeft}
          running={this.state.running}
          mode={this.state.mode}/>
        <Controls
          toggle={this.toggle.bind(this)}
          reset={this.reset.bind(this)}
          running={this.state.running}/>
        <Footer/>
      </div>
    );
  }
}

class Break extends React.Component {
  render() {
    return (
      <div class={this.props.running ? 'running' : ''} id='break'>
        <h2 id='break-label'>Break Length</h2>
        <div className='controls'>
          <img id='break-decrement' alt='' onClick={this.props.length !== 1 && this.props.decrement} src='https://www.materialui.co/materialIcons/hardware/keyboard_arrow_down_black_144x144.png'/>
          <div id='break-length'>{this.props.length}</div>
          <img id='break-increment' alt='' onClick={this.props.length !== 60 && this.props.increment} src='https://www.materialui.co/materialIcons/hardware/keyboard_arrow_up_black_144x144.png'/>
        </div>
      </div>
    );
  }
}

class Session extends React.Component {
  render() {
    return (
      <div class={this.props.running ? 'running' : ''} id='session'>
        <h2 id='session-label'>Session Length</h2>
        <div className='controls'>
          <img id='session-decrement' alt='' onClick={this.props.length !== 1 && this.props.decrement} src='https://www.materialui.co/materialIcons/hardware/keyboard_arrow_down_black_144x144.png'/>
          <div id='session-length'>{this.props.length}</div>
          <img id='session-increment' alt='' onClick={this.props.length !== 60 && this.props.increment} src='https://www.materialui.co/materialIcons/hardware/keyboard_arrow_up_black_144x144.png'/>
        </div>
      </div>
    );
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div class={this.props.running ? 'running' : ''} id='timer'>
        <div id='timer-label'>{this.props.mode}</div>
        <div id={this.props.length < 60 ? 'time-left-low' : 'time-left'}>
          {Math.floor(this.props.length / 60)}:{('0' + this.props.length % 60).slice(-2)}
        </div>
      </div>
    );
  }
}

class Controls extends React.Component {
  render() {
    return (
      <div className='controls'>
        <img id='start_stop' alt='' src={this.props.running ? 'https://png.icons8.com/metro/1600/pause.png' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALhSURBVHhe7Zw9yE5hHIcP+UiJkpJ6FTGRj0lGGVgZSWJklQEjk2QhE6skbBhfUpSiDCQGKVEMBlLyef3Tv55Ojzwf933O/fG76qp3voan93fuc+5GCCGEEEII0RtLcf7fP0UM1uED/I1f8QwuQxGYp2iRB/2ER3EhigCsxnbkQd/gXpyDYgo24rDAbR/jdhQTMmpo9xauRzEm44Y2v+MlXIliRCYJ7X7GU7gYxX+YJrT7Dg/jPBT/IERo9xnuRjGEkKHdWdyGYoAYoc1feAXXooBYod1veBaXY9XEDu36pF+EVdJVaNcm/T6ci1XRdWj3CVY16fsK7d7BKiZ936HNH3gZi570KYR2v+BpLHLSpxTafY9HsKhJn2Jo9znuwSJIObR7D7Of9DmENm3SX0U7SM6SXEK7NunPYXaTPrfQrk36Y5jNpM81tGuTfj8mP+lzD+3apN+ByVJKaNcm/QZMjtJCmz8xuUlfYmjX3iNMZtKXHNr9gL1P+hpCuy+wt0lfU2j3PnY+6WsMbdqkv4ZrsBNqDe3aM/CtGJ3aQ5t3MToK3TRvMToK3TQ3MTq1h36JMxidWkPbY9aT2Nlj1tpC28HBBez84KCW0PZ/s/0W93YUVkPoh9j74W7JoV9hMq8rlBj6I9rTugWYDCWF9ufPdnlAcpQQ2k9UVmGy5B7azgi3YPLkGtpOvXdhNuQW2t7jOITZfZqRS2ibzCcw24+NUg/d22QOTaqhbTLfwGzfHm2TYmi736m4T5xTCp3UZA5NCqF9Mhd9FVyfoX0yL8Hi6SN0FpM5NF2Htsm8Gaujq9DZTebQxA5tk/kgVnebQZtYoW0yH8dq7+doEzq0TebzWP2NM21ChbbJfB2LmcyhCRG6yMkcmmlCFz2ZQzNJaJ/MurlxDMYJXdVkDs0ooX0yd/LWZamswGFxXZvMm1AE4Da2A9tk3okiIPZmz0V8jY/wAFY/mYUQQgghhBBCiDZN8wcOqeaaf7XUmAAAAABJRU5ErkJggg=='} onClick={this.props.toggle}/>
        <img id='reset' alt='' src='https://static.thenounproject.com/png/579359-200.png' onClick={this.props.reset}/>
      </div>
    );
  }
}

export default App;
