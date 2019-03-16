const initialState = {
	color: "",
	tiles: [],
	rows: 8,
	cols: 8,
	grid: true,
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
		case "SHOW_GRID":
			return {
				...state,
				grid: action.payload,
			}
		case "ADD_ONE_ROW":
			return {
				...state,
				rows: action.payload,
			}
		case "ADD_ONE_COL":
			return {
				...state,
				cols: action.payload,
			}
		case "RESET_GRID":
			return {
				...state,
				cols: 8,
				rows: 8,
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
