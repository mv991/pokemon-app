import React from 'react'
import {  pokemonTypeInterface, userPokemonType } from '../utils/Types'
import {IoGitCompare} from "react-icons/io5"
import { useLocation , useNavigate} from 'react-router-dom';
import { FaTrash, FaPlus } from "react-icons/fa";
import { useAppDispatch } from '../app/hooks';
import { addToCompare } from '../app/slices/PokemonSlice';
import { setToast } from '../app/slices/AppSlice';
import { addPokemonToList } from '../app/reducers/addPokemonToList';
import { removePokemonFromUserList } from '../app/reducers/removePokemonFromList';
import { setPokemonTab } from '../app/slices/AppSlice';
import { setCurrentPokemon } from '../app/slices/PokemonSlice';
import { pokemonTabs } from '../utils/Constants';
interface Props  {
  propfunc?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void | undefined;
  pokemons: userPokemonType[]
};

function PokemonCard({ pokemons, propfunc}: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

  return (
  <div className="pokemon-card-container" onScroll={propfunc}>
    <div className="pokemon-card-grid">
        {
            pokemons && pokemons.length>0 &&
            pokemons?.map((data:userPokemonType) => {
             return (
             <div className="pokemon-card" key={data.id}>
              <div className="pokemon-card-list">
              {location.pathname.includes("/pokemon") ? (
                    <FaPlus
                      className="plus"
                        onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : location.pathname.includes("/search") ? (
                    <FaPlus
                      className="plus"
                     onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      onClick={async () => {
                         await dispatch(
                         removePokemonFromUserList({ id: data.firebaseId! })
                         );
                         dispatch(setToast("Pokemon Removed Successfully."));
                      }}
                    />
                  )}
              </div>
              <div className="pokemon-card-compare"> 
              <IoGitCompare onClick={() =>  {
                dispatch(addToCompare(data))
                dispatch(setToast( `${data.name} has been added to compare queue.` ))
            
            }}
                 
              />
              </div>
              <h3 className='pokemon-card-title'>{data.name}</h3>
              <img
              src={data.image}
              alt="pokemon"
              className='pokemon-card-image'
              onClick={() => {
                dispatch(setPokemonTab(pokemonTabs.description));
              dispatch(setCurrentPokemon(undefined));
                navigate(`/pokemon/${data.id}`);
              }}
              />
                  <div className="pokemon-card-types">
                  {data?.types?.map(
                    (type: pokemonTypeInterface, index: number) => {
                       
                      const keys = Object.keys(type);

                      return (
                        <div className="pokemon-card-types-type" key={index}>
                          <img
                            src={type[keys[0]].image}
                            alt="pokemon type"
                            className="pokemon-card-types-type-image"
                            loading="lazy"
                        
                          />
                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );
                    }
                  )}
                </div>
             </div>
             );
          
            })
        }
       
    </div>
  </div>
  )
}

export default PokemonCard