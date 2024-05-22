import { COLORS, MENU_ITEMS } from "@/constant";
import { createSlice } from "@reduxjs/toolkit";

export const toolbox = createSlice({
  name: "toolbox",
  initialState: {
    [MENU_ITEMS.PENCIL]: {
      color: COLORS.BLACK,
      size: 3,
    },
    [MENU_ITEMS.ERASER]: {
      color: COLORS.WHITE,
      size: 3,
    },
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.REDO]: {},
    [MENU_ITEMS.DOWNLOAD]: {},
  },
  reducers: {
    changeColor: (state, action) => {
      state[action.payload.item].color = action.payload.color;
    },
    changeBrushSize: (state, action) => {
      state[action.payload.item].size = action.payload.size;
    },
  },
});

export const { changeColor, changeBrushSize } = toolbox.actions;
export default toolbox.reducer;
