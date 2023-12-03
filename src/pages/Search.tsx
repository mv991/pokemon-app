// @ts-nocheck

import React, { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { debounce } from "../utils/debounce";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getInitialData } from "../app/reducers/getInitialData";
import { getPokemonData } from "../app/reducers/getPokemonData";
import Loader from "../components/Loader";
import { setLoading } from "../app/slices/AppSlice";

import PokemonCard from "../components/PokemonCard";

function Search() {
  const handleChange = (value: string) => getPokemon(value);
  const isLoading = useAppSelector(({ app: { isLoading } }) => isLoading);

  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );

  useEffect(() => {
    dispatch(getInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonData(randomPokemonsId));
    }
  }, [allPokemon, dispatch]);

  useEffect(() => {
    if (randomPokemons) {
      dispatch(setLoading(false));
    }
  }, [randomPokemons, dispatch]);

  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon.filter((pokemon) =>
        pokemon.name.match(value.toLowerCase())
      );
      dispatch(getPokemonData(pokemons));
    } else {
      const clonedPokemons = [...allPokemon];
      const randomPokemonsId = clonedPokemons
        // .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonData(randomPokemonsId));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search">
          <input
            type="text"
            onChange={(e) => handleChange(e.target.value)}
            className="pokemon-searchBar"
            placeholder="Search Pokemon"
          />
          <PokemonCard pokemons={randomPokemons} />
        </div>
      )}
    </>
  );
}

export default Wrapper(Search);
