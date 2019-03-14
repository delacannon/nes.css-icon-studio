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
    const { x, y, getTile, id } = this.props
    if (this.props.mouseActive) {
      getTile(x, y, id, this.state.color)
      this.setState({
        color: this.props.color.color.background,
      })
    }
  }

  onMouseDown(e) {
    const { x, y, getTile, id } = this.props

    getTile(x, y, id, this.state.color)
    this.setState({
      color: this.props.color.color.background,
    })
  }

  render() {
    const { x, y, getTile, id } = this.props

    return (
      <div
        style={{
          backgroundColor: `${this.state.color}`,
          border: "1px solid black",
        }}
        x={x}
        y={y}
        id={id}
        color={this.state.color}
        /* onClick={() => {
          getTile(x, y, id, this.state.color)
          this.setState({
            color: this.props.color.color.background,
          })
        }}*/
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
      />
    )
  }
}

const mapStateToProps = ({ color }) => {
  return { color }
}

export default connect(
  mapStateToProps,
  {}
)(Tile)
