import { combineReducers } from "redux"
import ColorReducer from "./colorReducer"

const rootReducer = combineReducers({
	color: ColorReducer,
	tiles: ColorReducer,
	cols: ColorReducer,
	rows: ColorReducer,
})

export default rootReducer
