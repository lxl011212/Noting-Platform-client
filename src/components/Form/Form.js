import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        selectedFile: '',
        createdAt: Date
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);
    
    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', selectedFile: '', createdAt: Date });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createPost({ ...postData, creator: user?.result?.name, userId: user?.result?.googleId }));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, creator: user?.result?.name, userId: user?.result?.googleId }));
            clear();
        }
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Sign in to create your own notes.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} Question</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={(e) => setPostData({ ...postData, createdAt: new Date()})}>
                    Submit
                </Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    );    
}

export default Form;