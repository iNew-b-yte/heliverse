import { createSlice } from "@reduxjs/toolkit";
import _userData from '../_mock_data.json';

const userSlice = createSlice({
    name: "user",
    initialState: {userArr : [..._userData]},
    reducers : {
        searchUser : (state, action)=>{
            
        }
    }

    
});



export const {searchUser} = userSlice.actions;
export default userSlice.reducer; 