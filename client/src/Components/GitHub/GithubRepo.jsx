import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from "@mui/material";

const useStyle = makeStyles(theme=>({
    rootGit:{
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    welcome:{
        backgroundColor:'white',
        opacity: '0.8',
        width: '60vh',
        padding: '20px',
        marginTop: theme.spacing(5),
        marginBottom: '20px',
       
    }
}))


export function GithubRepo(){

const classes = useStyle()

    return(
        <div className={classes.rootGit}>
        <Container component={Paper}  elevation={7} maxWidth='xs' className={classes.welcome}>
            <h2>Welcome {localStorage.getItem('userLogined')}!</h2>
            <p>To see your github repositories please 
            <a href="https://github.com/login/oauth/authorize?client_id=174a0a6c3637e0234c6f&redirect_uri=http://localhost:3001/https://github.com/login/oauth/authorize?client_id=174a0a6c3637e0234c6f&redirect_uri=http://localhost:3001/git/user/oauth2/github/callback"> sign up </a>
             with your github account</p>

        </Container>
        </div>
       
    )
    

}

