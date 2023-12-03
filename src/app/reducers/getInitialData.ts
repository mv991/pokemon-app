import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonRoute } from "../../utils/Constants";
import axios from "axios";
export const getInitialData = createAsyncThunk("pokemon/initialData", async () => {
    try {
    
        const {data} = await axios({
            method:"get",
            url:pokemonRoute,
            });
         
        return data.results
    }
    catch(err) {
        console.log(err)
    }
})