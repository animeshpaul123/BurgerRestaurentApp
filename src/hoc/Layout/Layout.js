import React, { Component } from 'react';
import Aux from '../Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Naavigation/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {
    state={
        showSideDrawer: false,
    }

    sideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }
    openSideDrawerHandler = () => {
        this.setState({showSideDrawer: true})
    }
    render () {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.openSideDrawerHandler}/>
                <SideDrawer closed={this.sideDrawerHandler}
                    isOpen={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;