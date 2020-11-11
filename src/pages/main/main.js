import React,{useState,useEffect} from 'react';
import  './main.css'
import Icon from './6.png'
import axios from 'axios'


export const Main = () =>{
    const[pokemons,setPokemon] = useState(
        {
        value:1,
        inform:null,
        isLoaded:false
    }
        )
    const[searchPok,setSearchPok] = useState(1)
    const[currentState,setCurrent] = useState(1)

     const getPokemons = async(url) =>{

        try{
     const res = await axios.get(url)
     console.log(res.data)
     setPokemon({
        inform: res.data,
        isLoaded:true
    }
         )
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
       const url = `https://pokeapi.co/api/v2/pokemon/${searchPok}`
     
      getPokemons(url)
       
       
    },[searchPok])

    const handleSearch =(e) =>{
            e.preventDefault()

            if(currentState>0 && currentState<893){
            setSearchPok(currentState)
            }
            setCurrent('')
     }
    
    const handleCurrent =(e) =>{
        setCurrent(e.target.value)
}
    const getRandomPok = ()=>{
        const res = Math.floor(Math.random()*300)
        setSearchPok(res)
    }

     const images  =() =>{
        return( <>
        <img src={Icon} />
        <img src={pokemons.inform.sprites.front_default} />
        <img src={pokemons.inform.sprites.back_default} />
        
        <p>name: <span style={{fontSize:27,color:'orange'}}>{pokemons.inform.name}</span></p>
        </>
        )
     }
    return(
        <div className='main'>
            <header className='header'>
                {pokemons.isLoaded?images():null}
                <p>number of poke: {searchPok}</p>
                
                <div >
                <form onSubmit={handleSearch} >
                    <input type='text' onChange={handleCurrent}
                           placeholder='enter number 1-893'
                           style={{marginLeft:10,height:30,width:240}}
                           value={currentState}/>
                    <button style={{height:30,width:70,cursor:'pointer'}}>search!</button>
                </form>
                <button onClick={getRandomPok} 
                        style={{height:70,width:70,cursor:'pointer'}}>
                             Random Pokemon!
                </button>
                </div>
                </header>
            <seaction className='listGeneration'>Список поколений</seaction>
            <section  className='generationInformation'>Описание поколения</section>
        </div>
    );
}