import React, { Component } from 'react';
import { Typography } from "@material-ui/core";
import './Home.css';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div className="text">
        <Typography variant="h2"> Hello!</Typography>
        <br/>
        <span>
          <Typography variant="h6"> Welcome to Weather application! </Typography>
          <Typography variant="h6"> Use menu on the left to navigate through subpages.</Typography>
        </span>
        <br/>
        <span>
        <Typography variant="h6"> Choose 'Archival weather data' tab to view weather records stored in the database. </Typography>
        <Typography variant="h6">
          If you are an administror, you will be able to access 'Get new data' tab and download current information about weather all over the world.
        </Typography>
        </span>
      </div>
    );
  }
}
