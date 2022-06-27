import React, { Component } from 'react';
import SimpleList from './../../components/menu/SimpleList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CategoryIcon from '@material-ui/icons/Category';
import axios from 'axios';
import { BASE_URL } from './../../Constant/Constant';

class Category extends Component {


    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/category/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            const categories = res.data;
            this.setState({ categories });
        })
            .catch(error => console.log(error));
    }

    render() {
        var elementCategories = this.state.categories.map((category, index) => {
            return (
                <div key={index}>
                    <List>
                        <ListItem button component={NavLink} to>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={category.title} secondary={category.description} />
                        </ListItem>
                        <Divider />
                    </List>
                </div>
            )

        });
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <SimpleList />
                    </div>

                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <Card style={{ marginTop: 20 }}>
                            <h3 style={{ margin: 'auto' }}>All Categories</h3>
                            <CardContent>
                                {elementCategories}
                            </CardContent>
                            <div style={{ marginBottom: 20 }}>
                                <NavLink to="/admin/add-category" type="button" className="btn btn-danger">Add New Category</NavLink>
                            </div>
                        </Card>
                    </div>
                </div>
            </div >
        );
    }
}

export default Category;