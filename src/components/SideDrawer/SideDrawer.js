import React from 'react'
import classes from './SideDrawer.module.css'
import classesNew from './BackDropForSideDrawer.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from '../Naavigation/NavigationItems/NavigationItems'
import BackDrop from '../UI/Backdrop/Backdrop'
import Aux from '../../hoc/AuxFile/Aux'


const backDrawer = (props) => (
    <Aux>
        <BackDrop show={props.isOpen}
            clicked={props.closed}
            className={classesNew.BackDrop}/>
        <div className={[classes.SideDrawer, props.isOpen ? classes.isOpen : classes.Close].join(" ")} >
            <div className={classes.Logo}>
                <Logo />
            </div>
            <div className={classes.NavigationItems}>
                <NavigationItems />
            </div>
        </div>
    </Aux>
);

export default backDrawer;