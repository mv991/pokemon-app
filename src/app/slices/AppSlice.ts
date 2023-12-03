import { AppTypeInitialState } from "../../utils/Types";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { pokemonTabs } from "../../utils/Constants";
 const initialState:AppTypeInitialState = {
   toasts: [],
   userInfo:undefined,
   currentPokemonTab: pokemonTabs.description,
   isLoading: true,
   isFetching:false
 }

 export const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      },
      setToast: (state, action: PayloadAction<string>) => {
         const toasts = [...state.toasts];
         toasts.push(action.payload);
         state.toasts = toasts;
       },
       clearToasts: (state) => {
         state.toasts = [];
       },
       setUserStatus: (state,action) => {
        state.userInfo = action.payload;
       },
       setPokemonTab: (state, action) => {
        state.currentPokemonTab = action.payload;
      },
        setFetching: (state, action) => {
        state.isFetching = action.payload;
      },
    }
 })
 export const {setToast,clearToasts,setUserStatus,setPokemonTab,setLoading,setFetching} = AppSlice.actions