
// @ts-nocheck

import { generatedPokemonType } from './../../utils/Types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { genericPokemonType } from "../../utils/Types";
import { pokemonTypes } from '../../utils/pokemonTypes';
import axios from "axios";


export const getPokemonData = createAsyncThunk("pokemon/Pokemon", async (pokemons:genericPokemonType[]) => {
 
    try {
     
      const pokemonsData:generatedPokemonType[] = []
    
      for await (const pokemon of pokemons) {
        const {
          data,
        }: {
          data: {
            id: number;
            types: { type: genericPokemonType }[],
            name:string,
            sprites:string
          };
        } =  await axios({
          method:"get",
          url:`${pokemon.url}`,
          // cancelToken: new axios.CancelToken(c => cancel = c)
          }) ;
        const types = data.types.map(
          ({ type: { name } }: { type: { name: string } }) => ({
            [name]: pokemonTypes[name],
          })
        )
       
        pokemonsData.push({
            name:data.name,
            id: data.id,
            image:data.sprites.other.dream_world.front_default?data.sprites.other.dream_world.front_default:data.sprites.front_default,
            types,
          }); 
      }
      return pokemonsData;  
    }
    catch(err) {
          console.log(err);
    }
})