import React, {useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    const unfilteredPosts = useSelector((state) => state.posts);
    const classes = useStyles();
    let user = JSON.parse(localStorage.getItem('profile'));
    let posts = [];
    
    useEffect(() => {
        user = JSON.parse(localStorage.getItem('profile'));
        posts = unfilteredPosts.filter(post => 
            post?.userId !== user?.result?.googleId
        )
    }, [user]);

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