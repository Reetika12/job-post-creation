import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '12%'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        zIndex: 'inherit',
        paddingTop: '32px',
        width: '12%',
        minWidth: '160px'
    },
    activeButton: {
        background: '#9400D3',
        width: '5px',
        height: '40px'
    },
    navBarStyle: {
        display: 'flex',
        flexDirection: 'row'
    }
}));

function ResponsiveDrawer(props) {
    const toggleDrawer = () => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        props.hideLeftDrawer();
    };

    const handleTabClick = (navItem) => {
        props.history.push(navItem.hrefLink);
    };
    const navBarItemList = [
        { title: 'Courses', hrefLink: '/courses', paramsName: '/' },
        {
            title: 'Teaching Material',
            hrefLink: '/teaching_materials',
            paramsName: '/teaching_materials'
        },
        {
            title: 'Class Notes',
            hrefLink: '/class_notes',
            paramsName: '/class_notes'
        },
        {
            title: 'Requisite Groups',
            hrefLink: '/requisite_groups',
            paramsName: '/requisite_groups'
        },
        { title: 'Cohorts', hrefLink: '/cohorts', paramsName: '/cohorts' },
        { title: 'Raw Topics', hrefLink: '/raw_topics', paramsName: '/raw_topics' },
        { title: 'Videos', hrefLink: '/videos', paramsName: '/videos' },
        { title: 'TMBs', hrefLink: '/tmbs', paramsName: '/tmbs' }
    ];
    const classes = useStyles();
    let { location } = props;
    const drawer = (
        <List>
            {navBarItemList.map((item, index) => (
                <div key={index} className={classes.navBarStyle}>
                    <ListItem button onClick={handleTabClick.bind(this, item)}>
                        {item.title}
                    </ListItem>
                    {location.pathname === item.paramsName && (
                        <div className={classes.activeButton} />
                    )}
                </div>
            ))}
        </List>
    );

    return (
        <div className={classes.root}>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    open={props.isMobileView}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    onClose={toggleDrawer()} // Close perfomance on mobile
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.toolbar} />
                    {drawer}
                </Drawer>
            </Hidden>
        </div>
    );
}

export default compose(withRouter)(ResponsiveDrawer);
