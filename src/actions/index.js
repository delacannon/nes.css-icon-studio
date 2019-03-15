export const changeColor = color => dispatch => {
	dispatch({
		type: "CHANGE_COLOR",
		payload: color,
	})
}

export const getTiles = tiles => dispatch => {
	dispatch({
		type: "GET_TILES",
		payload: tiles,
	})
}

export const updateTile = tile => dispatch => {
	dispatch({
		type: "UPDATE_TILE",
		payload: tile,
	})
}

export const showGrid = grid => dispatch => {
	dispatch({
		type: "SHOW_GRID",
		payload: grid,
	})
}

export const addOneRow = num => dispatch => {
	dispatch({
		type: "ADD_ONE_ROW",
		payload: num,
	})
}

export const addOneCol = num => dispatch => {
	dispatch({
		type: "ADD_ONE_COL",
		payload: num,
	})
}

export const resetGrid = () => dispatch => {
	dispatch({
		type: "RESET_GRID",
		payload: null,
	})
}
