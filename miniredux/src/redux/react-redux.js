import React from 'react'
import PropTypes from 'prop-types'

/**
 * connect函数实现Provider里的redux向使用redux组件里传递的功能
 * 实际connect函数就是实现一个中间件的功能，避免子组件复杂的操作redux的方法
 * 而能够直接在子组件的props里调用到redux的方法和数据
 * @param {Function} mapStateToProps 把redux的state数据添加到子组件的props里
 * @param {Object} mapDispatchToProps 把redux的dispatch方法添加到props里
 * @returns 返回一个react组件
 */
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) => (WrapperComp) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }
    componentWillMount() {
      let { store } = this.context
      store.describe(() => this.update())
      this.update()
    }
    bindActions(creators, dispatch) {
      let bound = {}
      Object.keys(creators).forEach(v => {
        let creator = creators[v]
        bound[v] = (...args) => { return dispatch(creator(...args))}
      })
      return bound
    }
    update() {
      let { store } = this.context
      // mapStateToProps是一个函数，store.getState()作为参数传入，返回getState()的数据
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = this.bindActions(mapDispatchToProps, store.dispatch)
      if (typeof stateProps === 'object') {
        this.setState({
          props: {
            ...this.state.props,
            ...stateProps,
            ...dispatchProps
          }
        })
      } else {
        this.setState({
          props: {
            ...this.state.props,
            ...dispatchProps,
            data: stateProps
          }
        })
      }
      
    }
    render () {
      return <WrapperComp {...this.state.props}></WrapperComp>
    }
  }
}


/**
 * 向所有的子组件提供redux
 */
export default class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store: this.store}
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {return this.props.children}
}