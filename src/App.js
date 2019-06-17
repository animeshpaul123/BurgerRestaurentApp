import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Burgerbuilder from './containers/Burgerbuilder/BurgerBuilder';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Burgerbuilder />
        </Layout>
      </div>
    )
  }
}

export default App;
