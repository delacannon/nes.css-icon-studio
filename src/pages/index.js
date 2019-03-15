import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { SketchPicker } from "react-color"
import Container from "../components/grid/Container"

import { connect } from "react-redux"
import { changeColor } from "../actions"

class ColorPicker extends React.Component {
  componentDidMount() {
    this.props.changeColor({ background: "#000000" })
  }

  handleChangeComplete = color => {
    this.props.changeColor({ background: color.hex })
  }

  render() {
    const { tiles } = this.props
    return (
      <Layout>
        <SketchPicker
          color={this.props.color.color.background}
          onChangeComplete={this.handleChangeComplete}
        />
        <Container />
        <hr />
        <div className="nes-container">
          <p className="title">Element</p>
          {tiles.tiles.map(e => {
            return (
              <p>
                {e.id} {e.color}
              </p>
            )
          })}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ color, tiles }) => {
  return { color, tiles }
}

export default connect(
  mapStateToProps,
  { changeColor }
)(ColorPicker)
