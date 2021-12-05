import React, {useState} from 'react';
import swal from "sweetalert";
import { TextField, Grid, Container, Paper, Avatar, Typography, Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined as LockOutlinedIcon} from '@material-ui/icons';


const useStyle = makeStyles(theme=>({
    rootSign:{
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




export default function SignUp(props){
    
    const classes = useStyle()

  
    const [userName, setUserName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const [passType1, setPassType1] = useState(true);
    const [passType2, setPassType2] = useState(true);

    
    let auth = JSON.parse(localStorage.getItem('auth'));

    
    function handleSignUp(){

            if(auth === null){
                auth=[{'username':'abc' , 'password':'abc'},];
            }
            if(!userName){
                swal('Email is missing!')
            }
            if(password1 === password2 && !password1.length < 1){
                const same = auth.filter(el => el.username === userName)

                if(!same.length){
                    auth =[...auth,{'username':userName, 'password':password1}];
                    localStorage.setItem('auth', JSON.stringify(auth));
                    setUserName('');
                    setPassword1('');
                    setPassword2('');
                    props.afterSignUp(userName);
                }
                else{
                    swal('User Exist!')
                }
            }
            else{
                swal('The passwords are not matching or password is missing')
            }
        
    }

    
    return(
        <Grid container component='main' className={classes.rootSign} >
            <Container component={Paper}  elevation={7} maxWidth='xs' className={classes.container}>
            <div className={classes.inside}>
                <Avatar className={classes.avatar}><LockOutlinedIcon className={classes.avatar}/></Avatar>
                <Typography component='h1' variant='h5'>Sign Up</Typography>
                
                <div className={classes.form}>
                    
                    <div>
                    {userName? 
                    <TextField autoFocus fullWidth margin='normal' type='text' name="userName" value={userName} onChange={e => setUserName(e.target.value)} label="Name" />
                     :<TextField error autoFocus fullWidth margin='normal' type='text' name="userName" value={userName} onChange={e => setUserName(e.target.value)} label="Name" /> }
                    </div>

                    <div>
                    {password1?
                    <TextField fullWidth margin='normal' type={passType1 ?'password':'text'} name="password1" value={password1} onChange={e => setPassword1(e.target.value)} label="Password">
                    <button onClick={()=>{setPassType1(!passType1)}}>{passType1?'show': 'hide'}</button></TextField> :
                    <TextField error fullWidth margin='normal' type={passType1 ?'password':'text'} name="password1" value={password1} onChange={e => setPassword1(e.target.value)} label="Password">
                    <button onClick={()=>{setPassType1(!passType1)}}>{passType1?'show': 'hide'}</button></TextField> }    
                    </div>                    

                    <div>
                    {password2?
                    <TextField fullWidth margin='normal' type={passType2 ?'password':'text'} name="password2" value={password2} onChange={e => setPassword2(e.target.value)} label="Repeat Password" >
                    <button onClick={()=>{setPassType2(!passType2)}}>{passType2?'show': 'hide'}</button></TextField>:
                    <TextField error fullWidth margin='normal' type={passType2 ?'password':'text'} name="password2" value={password2} onChange={e => setPassword2(e.target.value)} label="Repeat Password" >
                    <button onClick={()=>{setPassType2(!passType2)}}>{passType2?'show': 'hide'}</button></TextField>}
                    </div>
                    
                    <div><br/>
                    <Button fullWidth variant="contained" color='primary' className={classes.button1} onClick={handleSignUp}>SignUp</Button>
                    </div>

                   

                </div>

                

            </div>
            </Container>
        </Grid>
    ) 
}