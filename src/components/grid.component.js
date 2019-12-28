import React from 'react';
import { Grid } from '@material-ui/core';

export const Container = props => <Grid container {...props} />;

export const Item = props => <Grid item xs={12} sm={6} md={4} {...props} />;