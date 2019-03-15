import React, { Component } from "react"
import { connect } from "react-redux"

class Tile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      color: "transparent",
    }
  }

  onMouseEnter(e) {
    const { x, y, getTile, id, grid } = this.props
    if (this.props.mouseActive) {
      getTile(x, y, id, grid.color.background)
      this.setState({
        color: grid.color.background,
      })
    }
  }

  onMouseDown(e) {
    const { x, y, getTile, id, grid } = this.props

    getTile(x, y, id, grid.color.background)
    this.setState({
      color: grid.color.background,
    })
  }

  render() {
    const { x, y, getTile, id, grid } = this.props

    return (
      <div
        key={id}
        style={{
          backgroundColor: `${this.state.color}`,
          border: `${!grid.grid ? 0 : 2}px solid black`,
        }}
        x={x}
        y={y}
        id={id}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
      />
    )
  }
}

const mapStateToProps = ({ grid }) => {
  return { grid }
}

export default connect(
  mapStateToProps,
  {}
)(Tile)
