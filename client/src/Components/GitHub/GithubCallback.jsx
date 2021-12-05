import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import NavBar from './NavBar';
import background from '../../image/background.jpg';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@mui/material";

const useStyle = makeStyles(theme=>({
    rootGitCall:{
        backgroundImage:`url(${background})`,
        backgroundRepeat:'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '180vh',
        
        
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

    buttonA:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',

    },
    buttonIn:{
        backgroundColor: 'rgb(45,51,59)',
        color: 'white',
        cursor:'pointer',
        margin: '5px',
        padding: '8px'
    }
   

}))



export default function GithubCallback(){


    const classes = useStyle()
    const [content, setContent] =useState([]);
    
    useEffect(() => {
                
                axios.get('http://localhost:3001/repositories')
                .then(response =>{
                    setContent([...response.data])
                })
                
                
                                                     
    }, [])

    let favorites = [];

    function setLocalStorage(value){
        let info = content.filter(el => el.name === value)
        let value1= {'name': info.map(el => el.name).toString(), 'description':info.map(el => el.description).toString()}
        favorites.push(value1);
        console.log(value1)

        if(favorites.length < 1){
            localStorage.setItem('Favorites', JSON.stringify(value1))
            return favorites.push(value1);
        }
        else{ 
            localStorage.setItem('Favorites', JSON.stringify(favorites))            
        }
        
    }
    
    /* Starting pagination code */

    const [currentRep, setcurrentRep] = useState(1);
    const [reposPerPage] = useState(8);
  
    const indexOfLastRepo = currentRep * reposPerPage;
    const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
    const currentRepos = content.slice(indexOfFirstRepo, indexOfLastRepo);
      
    const paginado = (pageNumber) =>{
          setcurrentRep(pageNumber);
    } 

    /* Fininishing pagination code */    
    
    return(
        <div className={classes.rootGitCall}>
        <NavBar/>
        <div component={Paper}  elevation={7} maxWidth='xs' className={classes.reposList}>
            <h1>Your Repositories</h1>
            {currentRepos && currentRepos?.map(el => <div className={classes.repos} key={el.id}><h3>{el.name}</h3>
            <p>{el.description}</p>
            <br/><div className={classes.buttonA}><button className={classes.buttonIn} value={el.name} onClick={e => setLocalStorage(e.target.value)}>AddFav</button></div></div> )}
            {console.log(content)}
            
            <div>
                {<Pagination reposPerPage={reposPerPage} content={content.length} paginado={paginado}/> }
            </div> 
                
        </div>
        </div>
    )
}