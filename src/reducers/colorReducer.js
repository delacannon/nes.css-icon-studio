const initialState = {
	color: "",
	tiles: [],
	rows: 18,
	cols: 8,
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
			return {
				...state,
				tiles: state.tiles.map(t => {
					if (t.id.toString() === action.payload.id.toString()) {
						let newTile = action.payload
						return newTile
					} else {
						return t
					}
				}),
			}

		default:
			return state
	}
}

export default ColorReducer
