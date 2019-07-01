import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Burgerbuilder from './containers/Burgerbuilder/BurgerBuilder';
import Checkout from './containers/checkout/checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" component={Burgerbuilder}/>
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;
