import React, { Component } from "react"
import Tile from "./Tile"

import { connect } from "react-redux"
import { getTiles, updateTile } from "../../actions"

class Container extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mouseActive: false,
		}
	}

	componentDidMount() {
		this.props.getTiles(this.renderTiles())
	}

	renderTiles() {
		const m = []
		let id = 0
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				m.push({ x: i, y: j, id: id, color: "transparent" })
				id++
			}
		}
		return m
	}

	getTile(x, y, id, color) {
		let tile = { x: x, y: y, id: id, color: color }

		//console.log({ x: x, y: y, id: id, color: color })
		this.props.updateTile(tile)
	}

	onMouseDown(e) {
		this.setState({
			mouseActive: true,
		})
	}

	onMouseUp(e) {
		this.setState({
			mouseActive: false,
		})
	}

	render() {
		const { tiles } = this.props
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
				{tiles.tiles.map((t, i) => (
					<Tile
						key={i}
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

const mapStateToProps = ({ tiles }) => {
	return { tiles }
}

export default connect(
	mapStateToProps,
	{ getTiles, updateTile }
)(Container)
