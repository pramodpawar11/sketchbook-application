import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/slice/menuSlice"
import ToolboxReducer from "@/slice/toolBoxSlice"
const store = configureStore({
    reducer:{
        menu:MenuReducer,
        toolbox:ToolboxReducer
    }
})
export default store;