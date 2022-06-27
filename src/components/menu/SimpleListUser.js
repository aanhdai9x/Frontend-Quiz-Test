import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import axios from 'axios';
import { BASE_URL } from './../../Constant/Constant';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function SimpleListUser() {
    const [categories, setCategories] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        // Update the document title using the browser API
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/category/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            const categories = res.data;
            setCategories(categories);
        })
            .catch(error => console.log(error));
    }, []);
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
                        {/* <ListItem
                            button
                            component={NavLink}
                            to="/user/0"
                            id={window.location.pathname === "/user/0" ? "active" : ""}

                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem> */}
                        <ListItem
                            button
                            component={NavLink}
                            to={`/user/0`}
                            id={window.location.pathname === "/user/0" ? "active" : ""}
                        >
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Quizzes" />
                        </ListItem>
                        {categories.map((category, index) => {
                            return (
                                <div key={index} >
                                    <ListItem
                                        button
                                        component={NavLink}
                                        to={`/user/${category.cid}`}
                                        id={window.location.pathname === `/user/${category.cid}` ? "active" : ""}
                                    >
                                        <ListItemIcon>
                                            <HelpIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={category.title} />
                                    </ListItem>
                                </div>
                            )
                        })}
                    </List>
                </div>
            </div>
        </div>
    );
}
