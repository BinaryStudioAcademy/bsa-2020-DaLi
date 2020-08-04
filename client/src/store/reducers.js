import { combineReducers } from "redux";
import { exampleReducer } from '../containers/ExampleContainer/exampleReducer'
import { barChartReducer } from '../containers/BarChart/barChartReducer'

export default combineReducers({
    exampleReducer,
    barChart: barChartReducer
});