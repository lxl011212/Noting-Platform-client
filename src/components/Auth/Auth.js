import React from 'react';
import { Button, Paper, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
          dispatch({ type: AUTH, data: { result, token } }); 
          history.push('/');
        } catch (error) {
          console.log(error);
        }
    };
    
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    const openInNewTab = (url) => {
        window.open(url, '_blank');
    };
    
    return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <GoogleLogin
                clientId="840893247010-8sh3vpp1u79djtr9ecf6f8hlavtgd80n.apps.googleusercontent.com"
                render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
            />
        </Paper>
        <br></br>
        <Paper className={classes.paper} elevation={3}>
            <Button variant="contained" color="primary" onClick={openInNewTab("https://github.com/lxl011212/Noting-Platform-client")} >
                Frontend Source Code
            </Button>
            <hr></hr>
            <Button variant="contained" color="primary" onClick={openInNewTab("https://github.com/lxl011212/Noting-Platform-server")} >
                Backend Source Code
            </Button>
        </Paper>
    </Container>
    );
}

export default SignUp;


