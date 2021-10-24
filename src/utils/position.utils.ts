import { VariablesUtils } from "./variables.utils.js";

export class PositionUtils {

    public static DraggedNodeEndXPos(x: number): number {

        return x * (VariablesUtils.PreCanvas.clientWidth / (VariablesUtils.PreCanvas.clientWidth * VariablesUtils.Zoom)) - (VariablesUtils.PreCanvas.getBoundingClientRect().x * (VariablesUtils.PreCanvas.clientWidth / (VariablesUtils.PreCanvas.clientWidth * VariablesUtils.Zoom)));
    
    }

    public static DraggedNodeEndYPos(y: number): number {

        return y * (VariablesUtils.PreCanvas.clientHeight / (VariablesUtils.PreCanvas.clientHeight * VariablesUtils.Zoom)) - (VariablesUtils.PreCanvas.getBoundingClientRect().y * (VariablesUtils.PreCanvas.clientHeight / (VariablesUtils.PreCanvas.clientHeight * VariablesUtils.Zoom)));
    }
}