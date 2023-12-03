import React from 'react'
import {MdOutlinePowerSettingsNew} from "react-icons/md";
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebaseConfig';
import { useAppDispatch,useAppSelector } from '../app/hooks';
import { setUserStatus } from '../app/slices/AppSlice';
import { setToast,setPokemonTab } from '../app/slices/AppSlice';
import { useLocation } from 'react-router-dom';
import { pokemonTabs } from '../utils/Constants';
function Footer() {
  const location = useLocation();
  const currentPokemonTab = useAppSelector(
    ({ app: { currentPokemonTab } }) => currentPokemonTab
  );
  const dispatch = useAppDispatch();
  const handleSignout = async() => {
        await signOut(firebaseAuth)
        dispatch(setUserStatus(undefined))
        dispatch(setToast("Logged Out Successfully"))
  }
  const routes = [
    {
      name: pokemonTabs.description,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      value: "Catching",
    },
    {
      name: pokemonTabs.moves,
      value: "Capable Moves",
    },
  ];
  return (
   <footer>
    <div className="block"></div>
    <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            {routes.map((route) => (
              <li
                key={route.name}
                className={`${
                  currentPokemonTab === route.name ? "active" : ""
                }`}
                onClick={() => dispatch(setPokemonTab(route.name))}
              >
                {route.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    <div className="block">
      <MdOutlinePowerSettingsNew onClick={handleSignout}/>
    </div>
   </footer>
  )
}

export default Footer