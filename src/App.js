import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      position: 0
    };
    this.keys = [
      [{ name: 'Backspace', value: 'backspace', className: 'specialKey' }],
      [{ name: '7', value: 7, className: 'keyItem' }, { name: '8', value: 8, className: 'keyItem' }, { name: '9', value: 9, className: 'keyItem' }],
      [{ name: '4', value: 4, className: 'keyItem' }, { name: '5', value: 5, className: 'keyItem' }, { name: '6', value: 6, className: 'keyItem' }],
      [{ name: '1', value: 1, className: 'keyItem' }, { name: '2', value: 2, className: 'keyItem' }, { name: '3', value: 3, className: 'keyItem' }],
      [{ name: '0', value: 0, className: 'keyItem' }, { name: '.', value: '.', className: 'keyItem' }, { name: '-', value: '-', className: 'keyItem' }],
      [{ name: '←', value: 'left', className: 'specialKey' }, { name: '→', value: 'right', className: 'specialKey' }],
      [{ name: 'Clear All', value: 'clear', className: 'specialKey' }],
    ];
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState({
      value
    });
  }

  onKeyUp = (event) => {
    const position = event.target.selectionStart;
    this.setState({
      position
    });
  }

  setCaretPosition = (elem, caretPos) => {
    if (elem.createTextRange) {
      const range = elem.createTextRange();
      range.move('character', caretPos);
      range.select();
    } else if (elem.selectionStart || elem.selectionStart === 0) {
      elem.focus();
      elem.setSelectionRange(caretPos, caretPos);
    } else elem.focus();
  }

  onKeyEvent = (event, key) => {
    event.preventDefault();
    let elem = document.getElementById('keyBoard');
    let chars = this.state.value.split('');
    let position = 0;

    if (key === 'left') {
      // left arrow event
      position = (this.state.position - 1) > 0 ? this.state.position - 1 : 0;
    } else if (key === 'right') {
      // right arrow event
      const nextPostion = this.state.position + 1;
      position = nextPostion > this.state.value.length ? this.state.value.length : nextPostion;
    } else if (key === 'backspace') {
      // backspace
      const currentPosition = elem.selectionStart;
      if (currentPosition > 0) {
        chars.splice(currentPosition - 1, 1);
        position = currentPosition - 1;
      }
    } else if (key === 'clear') {
      // clear all
      chars = [];
      position = 0;
    } else {
      const cusorPosition = elem.selectionStart || 0;
      chars.splice(cusorPosition, 0, key);
      position = cusorPosition + 1;
      elem = document.getElementById('keyBoard');
    }

    const value = chars.join('');
    this.setState({
      value,
      position
    }, () => {
      this.setCaretPosition(elem, position);
    });
  };


  render() {
    return (
      <div className="keyboard-container">
        <h2>Simple Virtual keyboard With Arrows</h2>
        <div className="inputContainer">
          <input id="keyBoard" onChange={this.onChange} value={this.state.value} onKeyUp={this.onKeyUp} />
        </div>
        <div className="keyboard">
          {
            this.keys.map((items, index) => (
              <div className="keys" key={`keyGroup-${index}`}>
                {
                  items.map(item => (
                    <button key={item.value} type="button" className={item.className} onClick={(e) => { this.onKeyEvent(e, item.value); }}>
                      {item.name}
                    </button>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;
