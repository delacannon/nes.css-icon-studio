import React, { Component } from "react"
import Tile from "./Tile"

class Container extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tiles: [],
			mouseActive: false,
		}
	}

	componentDidMount() {
		this.setState({
			tiles: this.renderTiles(),
		})
	}

	renderTiles() {
		const m = []
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				m.push({ x: i, y: j })
			}
		}
		return m
	}

	getTile(x, y, id, color) {
		//console.log({ x: x, y: y, id: id, color: color })
	}

	onMouseDown(e) {
		console.log("mouse down")
		this.setState({
			mouseActive: true,
		})
	}

	onMouseUp(e) {
		console.log("mouse up")
		this.setState({
			mouseActive: false,
		})
	}

	render() {
		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "32px 32px 32px 32px 32px 32px 32px 32px",
					gridTemplateRows: "32px 32px 32px 32px 32px 32px 32px 32px",
					justifyContent: "center",
				}}
				onMouseDown={this.onMouseDown.bind(this)}
				onMouseUp={this.onMouseUp.bind(this)}
			>
				{this.state.tiles.map((t, i) => (
					<Tile
						x={t.x}
						y={t.y}
						id={i}
						getTile={this.getTile.bind(this)}
						mouseActive={this.state.mouseActive}
					/>
				))}
			</div>
		)
	}
}
export default Container
