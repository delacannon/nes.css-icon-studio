import React from "react"
import { Provider } from "react-redux"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./src/reducers"

const loadDevTools = () =>
	process.env.NODE_ENV === "development" && window.devToolsExtension
		? window.__REDUX_DEVTOOLS_EXTENSION__ &&
		  window.__REDUX_DEVTOOLS_EXTENSION__()
		: f => f

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept("./src/reducers", () => {
		const nextRootReducer = require("./src/reducers/index")
		store.replaceReducer(nextRootReducer)
	})
}

export default ({ element }) => <Provider store={store}>{element}</Provider>
