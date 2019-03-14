export const changeColor = color => dispatch => {
	dispatch({
		type: "CHANGE_COLOR",
		payload: color,
	})
}
