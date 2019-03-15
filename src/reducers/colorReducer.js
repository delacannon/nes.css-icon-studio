const initialState = {
	color: "",
	tiles: [],
}

const ColorReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_COLOR":
			return {
				...state,
				color: action.payload,
			}
		case "GET_TILES":
			return {
				...state,
				tiles: action.payload,
			}
		case "UPDATE_TILE":
			console.log(action.payload)
			return {
				...state,
				tiles: state.tiles,
			}
		default:
			return state
	}
}

export default ColorReducer
