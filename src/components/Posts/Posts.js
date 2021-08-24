import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const unfilteredPosts = useSelector((state) => state.posts);
    const posts = unfilteredPosts.filter((post) => 
        (post?.userId !== user?.result?.googleId)
    )

    return (
        !user?.result?.googleId ? <CircularProgress /> : (
            !posts.length ? <CircularProgress /> : (
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} md={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            )
        )
    );
}
    

export default Posts;