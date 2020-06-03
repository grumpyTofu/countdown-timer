import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { actionCreators } from './redux/Timer';

import { useCookies } from 'react-cookie';

import { Container, Typography, Grid } from '@material-ui/core';
import { DateTimePicker} from '@material-ui/pickers';

import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

import Clock from './components/Clock';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    dateTimeInput: {
      '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl': {
        backgroundColor: '#1A76D2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        border: 'none'
      },
      '& .MuiInputBase-input.MuiOutlinedInput-input': {
        textAlign: 'center',
        border: '1px #1A76D2 solid',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#105293'
        }
      }      
    },
}));

const App = props => {

  const classes = useStyles();

  const [cookies, setCookie] = useCookies(['dateTime']);
  const [dateTime, setDateTime] = useState(cookies.dateTime || new Date());

  const handleDateTimeSelect = value => {
    if (value >= Date.now()) {
      props.stopTimer();
      setCookie('dateTime', value, { path: '/' });
      setDateTime(value);
    } else {
      alert("You must pick a date in the future");
    }
  }

  useEffect(() => {
    if (dateTime && !props.eventTime && !props.interval) {
      props.startTimer(dateTime);
    } else return;
  });

  if (props.timeRemaining < 1000) {
      var context=new AudioContext();
      var o=null;
      var g=null;
      o=context.createOscillator();
      g=context.createGain();
      o.connect(g);
      o.type='sine';
      g.connect(context.destination);
      o.start(0);
      g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+1.5);
  } 

  return (
    <Container style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw' }}>
      <Grid container justify='center' style={{ height: '100%' }}>
        {props.timeRemaining > 0 ?
            <React.Fragment>
              <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', paddingBottom: '1rem' }}>
                <Typography variant='h4' align='center' style={{ width: '100%' }}>React Countdown</Typography>
              </Grid>
              {Math.floor(props.timeRemaining) <= 3000 && 
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <SentimentSatisfiedIcon />
                  {Math.floor(props.timeRemaining) <= 2000 && <SentimentVerySatisfiedIcon />}
                </Grid>
              }
              <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', paddingBottom: '3rem' }}>
                <Clock />
              </Grid>
            </React.Fragment>
          :
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SentimentSatisfiedIcon /><SentimentVerySatisfiedIcon /><Typography>Time is up!</Typography>
            </Grid>
        }
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <DateTimePicker 
            className={classes.dateTimeInput}
            inputVariant="outlined" 
            value={dateTime} 
            onChange={handleDateTimeSelect} 
          />
        </Grid>      
      </Grid>      
    </Container>
  );
}

export default connect(state => state, actionCreators)(App);