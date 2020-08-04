import { combineReducers } from "redux";
import { exampleReducer } from "../containers/ExampleContainer/exampleReducer";
import tableVisualization from "../containers/TableVisualization/reducer";

export default combineReducers({
  exampleReducer,
  tableVisualization,
});
