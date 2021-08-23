import React from 'react';
import { Button } from '@material-ui/core';
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

    return (
        <>
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
        </>
    );
}

export default SignUp;


