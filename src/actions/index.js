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
