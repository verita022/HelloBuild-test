import { Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(theme=>({
    nav:{
        opacity: '0.9',
        backgroundColor:'rgb(44,51,59)',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'flex-end'
    }, 
    button:{
        margin:'10px',
    }
}))

export default function NavBar(){

const classes = useStyle()


function afterLogOut(){
        localStorage.removeItem('userLogined');
               
    }

return(
    <div>
        <div className={classes.nav}>
            <div className={classes.button}><Link to='/githubrepos'><Button variant="contained" color='primary' >Repos</Button></Link></div>
            <div className={classes.button}><Link to='/myfavorites'><Button variant="contained" color='primary' >Favorites</Button></Link></div>
            <div className={classes.button}><Link to='/'><Button variant="contained" color='primary'  onClick={afterLogOut}>Logout</Button></Link></div>
        </div>
    </div>
)


}