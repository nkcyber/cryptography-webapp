import React from 'react';
import { Component } from 'react'
import { SideBar } from './SideBar'
import Header from './Header'
// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

function withLayout (WrappedComponent) {
  return class extends Component {
    static displayName = `withLayout(${getDisplayName(WrappedComponent)})`

    static async getInitialProps (ctx) {
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps }
    }

    constructor (props) {
      super(props)
    }

    render () {
      return (
        <>
          <Header/>
          <div style={{ width: '90vw', height: '80vh', marginLeft: 'auto', marginRight: 'auto', }} className="text-center">
            <div style={{float:"left"}}>
              <WrappedComponent {...this.props} />
            </div>
            <div style={{float: "right"}}>
              <SideBar/>
            </div>
          </div>
        </>
      )
    }
  }
}

export { withLayout }
