import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function SimpleList() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className="panel panel-default" style={{ marginTop: 20 }}>
                <div className="panel-body">
                    <List
                        component="nav"
                        aria-label="main mailbox folders"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                            </ListSubheader>
                        }
                    >
                        <h4>Menu</h4>
                        <ListItem
                            button
                            component={NavLink}
                            to="/admin"
                            id={window.location.pathname ==="/admin" ? "active": ""}
                            
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to="/admin/profile"
                            id={window.location.pathname ==="/admin/profile" ? "active": ""}
                        >
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to="/admin/categories"
                            id={window.location.pathname ==="/admin/categories" ? "active": ""}
                        >
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to="/admin/add-category"
                            id={window.location.pathname ==="/admin/add-category" ? "active": ""}
                        >
                            <ListItemIcon>
                                <AddCircleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Categories" />
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to="/admin/quizzes"
                            id={window.location.pathname ==="/admin/quizzes" ? "active": ""}
                        >
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Quizzes" />
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to="/admin/add-quiz"
                            id={window.location.pathname ==="/admin-quiz" ? "active": ""}
                        >
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Quizzes" />
                        </ListItem>
                        <ListItem
                            button
                            component={NavLink}
                            to
                            // id={window.location.pathname ==="/admin" ? "active": ""}
                        >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </div>
            </div>
        </div>
    );
}
