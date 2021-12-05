import React, {useState} from 'react';
import Pagination from './Pagination';
import NavBar from './NavBar';
import background from '../../image/background.jpg';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Paper } from "@mui/material";

const useStyle = makeStyles(theme=>({
    rootfav:{
        backgroundImage:`url(${background})`,
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '140vh',
         
    },
    container:{
        opacity: '0.8',
        height: '100%',
             
    },
   
    reposList:{
        /* backgroundColor: 'white', */
        opacity: '0.8',
        width: '80vh', 
        margin: 'auto',
        color:'white',
        
    },
    repos:{
        backgroundColor: 'rgb(192,122,77)',
        color:'white',
        borderRadius: '4px',
               
    },
    buttonR:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',

    },
    buttonIn:{
        backgroundColor: 'rgb(45,51,59)',
        color: 'white',
        cursor:'pointer',
        margin: '5px'
    }
   
}))


export default function MyFavorites(){

    const classes = useStyle()

    let fav = JSON.parse(localStorage.getItem('Favorites'));

    const [favorites, setFav] = useState(fav)
   
    function removeElement(value){
        let favorites1 = JSON.parse(localStorage.getItem('Favorites'));
        let indexNum = favorites1.findIndex(el => el.name === value)
        favorites1.splice(indexNum, 1)
        let favToString= JSON.stringify(favorites1)
        localStorage.setItem('Favorites', favToString)
        setFav(JSON.parse(localStorage.getItem('Favorites')));
        
    }

    function removeAllRepos(){
        localStorage.removeItem('Favorites')
        setFav(JSON.parse(localStorage.getItem('Favorites')));
    }
    /* Starting pagination code */

    const [currentRep, setcurrentRep] = useState(1);
    const [reposPerPage] = useState(8);

    const indexOfLastRepo = currentRep * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    if(fav){
        var favoritesRepos = fav.slice(indexOfFirstRepo, indexOfLastRepo);
       
    }
  
    
    const paginado = (pageNumber) =>{
        setcurrentRep(pageNumber);
    } 

    /* Fininishing pagination code */   
    

    return(
        <div className={classes.rootfav}>
        <NavBar/>
        <div  component={Paper}  elevation={7} maxWidth='xs' className={classes.reposList}>
            <div>
                <h1>Your List of Favorites</h1>
                {favoritesRepos && favoritesRepos?.map((el, i) => <div className={classes.repos} key={i}><h4>{el.name}</h4><p>{el.description}</p>
                <div className={classes.buttonR}><button className={classes.buttonIn} value={el.name} onClick={e => removeElement(e.target.value)}><DeleteIcon/></button></div></div>)}
                <div><br/><button onClick={removeAllRepos}><DeleteForeverIcon/></button></div>
            </div>
            <div>
            {<Pagination reposPerPage={reposPerPage} content={fav?.length} paginado={paginado}/>}
            </div>
        </div>    
        </div> 
    )
}