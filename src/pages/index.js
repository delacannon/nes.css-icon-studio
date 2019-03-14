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
  handleChangeComplete = color => {
    //this.setState({ background: color.hex })
    this.props.changeColor({ background: color.hex })
  }

  render() {
    console.log(this.props.color)
    return (
      <Layout>
        <SketchPicker
          color={this.props.color.color.background}
          onChangeComplete={this.handleChangeComplete}
        />
        <Container />
      </Layout>
    )
  }
}

const mapStateToProps = ({ color }) => {
  return { color }
}

export default connect(
  mapStateToProps,
  { changeColor }
)(ColorPicker)
