import { combineReducers } from "redux"
import ColorReducer from "./colorReducer"

const rootReducer = combineReducers({
	color: ColorReducer,
	tiles: ColorReducer,
})

export default rootReducer
