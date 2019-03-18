import React, { Component } from "react"
import { connect } from "react-redux"

class Tile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false,
      color: "transparent",
      rightClick: false,
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

  removeTile(e) {
    const { x, y, getTile, id, grid } = this.props
    getTile(x, y, id, "transparent")
    this.setState({
      color: "transparent",
    })
  }

  render() {
    const { x, y, getTile, id, grid } = this.props

    return (
      <div
        key={id}
        style={{
          backgroundColor: `${this.state.color}`,
          border: `${!grid.grid ? 0 : 2}px solid ${
            this.props.inverted ? `white` : `black`
          }`,
        }}
        x={x}
        y={y}
        id={id}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
        onContextMenu={e => {
          e.preventDefault()
          this.removeTile(e)
        }}
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
