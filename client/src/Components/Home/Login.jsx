import React, {useState} from 'react';
import swal from "sweetalert";
import { TextField, Grid, Container, Paper, Avatar, Typography, Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(theme=>({
    rootLogin:{
        height: '60vh',
    }, 

    container:{
        opacity: '0.8',
        marginTop: theme.spacing(5),
        height: '100%',
        [theme.breakpoints.down(400 + theme.spacing(2) + 2)]:{
            marginTop: 0,
            width: '100%',
            height: '100%',
        }
    },
    inside:{
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    avatar:{
        margin: theme.spacing(1),
        backgroundColor: '#344895',
    },
    form:{
        width: '40vh',
    },
    button1:{
        margin: theme.spacing(3,0,2)
    }

}))

export default function Login(props){

    const classes = useStyle()

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passType, setPassType] = useState(true);

    let auth = JSON.parse(localStorage.getItem('auth'));

        function handleLogin(){
            if(auth === null){
                swal('User does not exist')
            }
            
            const same = auth.filter(el => el.username === userName)
            if(same.length){
                if(same[0].password=== password){
                    localStorage.setItem('userLogined', userName)
                    setUserName('');
                    setPassword('');                
                    props.afterLogin(userName);
                }
                else{
                    swal('Wrong password')
                }
            }
            else{
                swal('User does not exist')
            }
        }
        
        
    

    return(
        <Grid container component='main' className={classes.rootLogin}>
            <Container component={Paper}  elevation={7} maxWidth='xs' className={classes.container}>
            <div className={classes.inside}>
                
                <Avatar className={classes.avatar}></Avatar>
                <Typography component='h1' variant='h5'>Login</Typography>
                
                <div className={classes.form}>

                <div>
                <TextField autoFocus fullWidth margin='normal' type='text' value={userName} onChange={e => setUserName(e.target.value)} label="Username" />
                </div>
                
                <div>
                <TextField fullWidth margin='normal' type={passType ?'password':'text'} value={password} onChange={e => setPassword(e.target.value)} label="Password">
                <button onClick={()=>{setPassType(!passType)}}>{passType?'show': 'hide'}</button></TextField>
                
                </div>
                
                <div><br/>
                <Button fullWidth variant="contained" color='primary' className={classes.button1} onClick={handleLogin}>Login</Button>
                </div>
                       
                
                </div>
                </div>
            </Container>
        </Grid>
        
    ) 
}