import React, { Component } from 'react';
class TestComponent extends React.Component {
  // constructor (props) {
  //   super(props);
  //   this.state = { username: 'lindaidai' };
  // }
  // render () {
  //   return <input name="username" value={this.state.username} />
  // }
   constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }
  handleSubmit = (e) => {
    console.log('我们可以获得input内的值为', this.inputRef.current.value);
    e.preventDefault();
  }
  render () {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input defaultValue="lindaidai" ref={this.inputRef} />
        <input type="submit" value="提交" />
      </form>
    )
  }
}
export default TestComponent;