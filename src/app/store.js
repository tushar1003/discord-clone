import { configureStore } from "@reduxjs/toolkit";
import ChannelReducer from "../features/channelSlice";

export const store=configureStore({
    reducer:{
        channel:ChannelReducer,
    },
})