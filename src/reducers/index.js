import { combineReducers } from "redux"
import ColorReducer from "./colorReducer"

const rootReducer = combineReducers({
	grid: ColorReducer,
})

export default rootReducer
