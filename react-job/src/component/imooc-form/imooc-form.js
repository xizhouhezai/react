import React, { Component } from 'react'

export default function WrapperForm(Comp) {
  return class ImoocForm extends Component{
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key,val) {
      this.setState({
        [key]:val
      })
    }
    render() {
      console.log(this.state)
      return(
        <Comp {...this.props} handleChange={this.handleChange} state={this.state}></Comp>
      )
    }
  }
}