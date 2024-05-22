import React from "react";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constant";
import { useSelector, useDispatch } from "react-redux";
import { changeBrushSize, changeColor } from "@/slice/toolBoxSlice";

const ToolBox = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.PENCIL || MENU_ITEMS.ERASER;

  const updateBrushSize = (e) => {
    dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
  };
  const changeBrushColor = (newColor) => {
    dispatch(changeColor({ item: activeMenuItem, color: newColor }));
  };
  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.tooItem}>
          <h2 className={styles.toolText}>Stroke Colors</h2>
          <div className={styles.itemContainer}>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => changeBrushColor(COLORS.BLACK)}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => changeBrushColor(COLORS.RED)}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => changeBrushColor(COLORS.BLUE)}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => changeBrushColor(COLORS.GREEN)}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => changeBrushColor(COLORS.ORANGE)}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => changeBrushColor(COLORS.YELLOW)}
            />
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.tooItem}>
          <h2 className={styles.toolText}>Brush Slider</h2>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
