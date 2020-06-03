import React from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    grid: {
        '& .MuiPaper-root.MuiCard-root.MuiPaper-elevation1.MuiPaper-rounded': {
            backgroundColor: '#DC004E',
            color: 'white',
            height: '15vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        '& .MuiTypography-root.MuiTypography-body1.MuiTypography-alignCenter': {
            cursor: 'default'
        }
    },
}));

export default connect(state => state, null)(props => {

    const classes = useStyles();

    const years = Math.floor(props.timeRemaining/(1000*60*60*24*365));
    const days = Math.floor((props.timeRemaining - (years*365*24*60*60*1000))/(1000*60*60*24));
    const hours = Math.floor((props.timeRemaining - (years*365*24*60*60*1000) - (days*24*60*60*1000))/(1000*60*60));
    const minutes = Math.floor((props.timeRemaining - (years*365*24*60*60*1000) - (days*24*60*60*1000) - (hours*60*60*1000))/(1000*60));
    const seconds = Math.floor((props.timeRemaining - (years*365*24*60*60*1000) - (days*24*60*60*1000) - (hours*60*60*1000) - (minutes*60*1000))/(1000));

    return(
        <Grid container justify='center'>
            <Grid item xs={12} md={8}>
                <Grid container spacing={1} justify='center' className={classes.grid}>
                    {years > 0 && 
                        <Grid item xs={2}>
                            <Card>
                                <Typography align='center'>{years} yrs.</Typography>
                            </Card>                        
                        </Grid>
                    }
                    {days > 0 && 
                        <Grid item xs={2}>
                            <Card>
                                <Typography align='center'>{days} days</Typography>
                            </Card>                        
                        </Grid>
                    }
                    {hours > 0 && 
                        <Grid item xs={2}>
                            <Card>
                                <Typography align='center'>{hours} hrs.</Typography>
                            </Card>                        
                        </Grid>
                    }
                    {minutes > 0 && 
                        <Grid item xs={2}>
                            <Card>
                                <Typography align='center'>{minutes} min.</Typography>
                            </Card>                        
                        </Grid>
                    }
                    {years === 0 &&
                        <Grid item xs={2}>
                            <Card>
                                <Typography align='center'>{seconds} sec.</Typography>
                            </Card>                        
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
});