import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

const InfoBox = ({ title, cases, total, onClick }) => {
  return (
    <Grid item lg={3}>
      <Card onClick={onClick}>
        <CardContent>
          <Typography className='infoBox_title' color='textSecondary'>
            {title}
          </Typography>
          <h1 className='infoBox_cases' style={{ color: '#cc1034' }}>
            {cases}
          </h1>
          <Typography className='infoBox_total' color='textSecondary'>
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default InfoBox;
