import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonStatsType, pokemonTypeInterface, userPokemonType } from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { pokemonListRef } from "../../utils/firebaseConfig";
import { addDoc } from "firebase/firestore";
export const addPokemonToList  = createAsyncThunk(
    "pokemon/addPokemon",
    async (pokemon: {
        id:number,
        name:string,
        types:pokemonTypeInterface[] | string[],
        stats? : pokemonStatsType[];
        image:string
    },{getState,dispatch}) => {
        try {
          const {app:{userInfo}, pokemon:{userPokemons}} = getState() as RootState;
          if(!userInfo?.email) {
            return dispatch(setToast("Please login in order to add pokemon to your collection. "))
          }
          const index = userPokemons.findIndex((userPokemon:userPokemonType) => {
            return userPokemon.name === pokemon.name;
          })
          if(index === -1) {
             let types:string[] = [];
             if (!pokemon.stats) {
                pokemon.types.forEach((type: any) =>
                  types.push(Object.keys(type).toString())
                );
              } else {
                types = pokemon.types as string[];
              }
              console.log(pokemon,"pkemon")
            await addDoc(pokemonListRef,{pokemon: {id:pokemon.id,name:pokemon.name,types,image:pokemon.image},email: userInfo.email})
            return dispatch(setToast(`${pokemon.name} added to your collection `))
          }
          else {
            return dispatch(setToast(`${pokemon.name} is already added to your collection `))
          }
        }
        catch(e){
            console.log(e)
        }
    }
)
