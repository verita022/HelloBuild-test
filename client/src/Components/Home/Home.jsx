import React, {useState, useEffect} from 'react';
import  SignUp from './SignUp';
import  Login  from './Login';
import background from '../../image/background.jpg'
import { Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { GithubRepo } from '../GitHub/GithubRepo';


const useStyle = makeStyles(theme=>({
    root:{
        backgroundImage:`url(${background})`,
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    },
}))


export default function Home(){

    const classes = useStyle()

    let [screenSignUp, setScreenSignUp] = useState(false);
    let [screenLogin, setScreenLogin] = useState(false);
    let [screenLogined, setLoginedScreen] = useState(false);
    
    function afterSignUp(){
        setScreenSignUp(false); 
		setScreenLogin(true);
        setLoginedScreen(false);
    }

    function afterLogin(){
        setScreenSignUp(false); 
		setScreenLogin(false);
        setLoginedScreen(true);
    }
    
    function afterLogOut(){
        localStorage.removeItem('userLogined');
        setScreenSignUp(true); 
		setScreenLogin(false);
        setLoginedScreen(false);
    }

    useEffect(()=>{
        let user = localStorage.getItem('userLogined')
        if(user !== null && user !== ''){
            setScreenSignUp(false); 
            setScreenLogin(false);
            setLoginedScreen(true);
        }
        else{
            setScreenSignUp(true); 
            setScreenLogin(false);
            setLoginedScreen(false); 
        }
    },[])
    
    
   
    return(
        <div className={classes.root}>
            {screenSignUp ? 
            <div><SignUp afterSignUp={afterSignUp}/><br/><br/>
            <Button variant="contained" color='primary'
             onClick={()=>{setScreenSignUp(false); setScreenLogin(true); }}>Login</Button>
            </div>                    
            : '' }
            
            {screenLogin ? 
            <div><Login afterLogin={afterLogin}/><br/><br/>
            <Button variant="contained" color='primary' className={classes.button2} 
            onClick={()=>{setScreenSignUp(true); setScreenLogin(false); }}>Sign Up</Button>
            </div> : '' }
            
            {screenLogined ? 
            <div><GithubRepo/>
            <Button variant="contained" color='primary' className={classes.button2} 
            onClick={afterLogOut}>Logout</Button>
            {/* <button onClick={afterLogOut}>Logout</button> */}
            </div> : '' }
        </div>
    ) 
}