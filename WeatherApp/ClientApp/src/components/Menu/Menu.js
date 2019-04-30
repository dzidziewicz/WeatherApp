import React, { Component } from 'react';
import { Drawer, ListItem, ListItemText, ListItemIcon, List, Divider } from "@material-ui/core";
import CollectionsRoundedIcon from '@material-ui/icons/CollectionsRounded';
import { Link } from 'react-router-dom';

export class Menu extends Component{
    render() {
        const generatedLabels = this.props.labels.map(l => (
            <ListItem key={l.displayName}>
                <ListItemIcon><CollectionsRoundedIcon /></ListItemIcon>
                <Link to={`${l.path}`} style={{ textDecoration: 'none' }} onClick={this.props.onClose}>
                    <ListItemText primary={l.displayName} style={{ paddingLeft: 13 }} />
                </Link>
            </ListItem>
        ))
        return (
            <Drawer anchor="left" open={this.props.openMenu} onClose={this.props.onClose}>
                <div
                    tabIndex={0}
                    role="button"
                >
                    <List>
                        <ListItem>
							<Link to={'/'} style={{ textDecoration: 'none' }} onClick={this.props.onClose}>
                                <ListItemText primary="Weather app"/>
                            </Link>
                        </ListItem>
                        <Divider />
                        <div style={{marginTop: 20}}>
                        {generatedLabels}
                        </div>
                    </List>
                </div>
            </Drawer>
        );
    }
}