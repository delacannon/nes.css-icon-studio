import React, { Component } from "react"
import Tile from "./Tile"

import { connect } from "react-redux"
import { getTiles, updateTile } from "../../actions"

class GridCanvas extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mouseActive: false,
			cols: "",
			rows: "",
		}
	}

	componentDidMount() {
		this.props.getTiles(this.renderTiles())

		let cols = ""
		let rows = ""

		for (let i = 0; i < this.props.grid.cols; i++) {
			cols += "32px "
		}
		for (let i = 0; i < this.props.grid.rows; i++) {
			rows += "32px "
		}

		this.setState({
			cols,
			rows,
		})
	}

	renderTiles() {
		const m = []
		let id = 0
		for (var i = 1; i < this.props.grid.rows + 1; i++) {
			for (var j = 1; j < this.props.grid.cols + 1; j++) {
				m.push({ x: j, y: i, id: id, color: "transparent" })
				id++
			}
		}
		return m
	}

	getTile(x, y, id, color) {
		let tile = { x, y, id, color }
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
		const { grid } = this.props

		let cols = ""
		let rows = ""

		for (let i = 0; i < this.props.grid.cols; i++) {
			cols += "32px "
		}
		for (let i = 0; i < this.props.grid.rows; i++) {
			rows += "32px "
		}

		return (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `${cols}`,
					gridTemplateRows: `${rows}`,
					justifyContent: "center",
				}}
				onMouseDown={this.onMouseDown.bind(this)}
				onMouseUp={this.onMouseUp.bind(this)}
			>
				{grid.tiles.map((t, i) => (
					<Tile
						inverted={this.props.inverted}
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

const mapStateToProps = ({ grid }) => {
	return { grid }
}

export default connect(
	mapStateToProps,
	{ getTiles, updateTile }
)(GridCanvas)
