import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles(theme=>({
 
    allNum:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: theme.spacing(5),
        backgroundColor: 'rgb(192,122,77)',
        borderRadius: '4px'        
    },

    button3:{
        opacity: '0.8',
        backgroundColor: 'rgb(45,51,59)',
        color: 'white',
        cursor:'pointer',
        padding: '10px',
        borderRadius:'3px',                  
    },
   

}))


export default function Pagination({reposPerPage, content, paginado}){
    const classes = useStyle()
    const pageNumbers = [];

    for(let i =1; i<=Math.ceil(content/reposPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <div className={classes.allNum}>
                {pageNumbers.length && pageNumbers?.map(
                   number => {return <ul key={number}><button className={classes.button3} onClick={() =>paginado(number)}>{number}</button></ul>}
                )}
        </div>
    )
    
}