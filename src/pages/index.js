import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { SketchPicker } from "react-color"
import GridCanvas from "../components/grid/GridCanvas"

import { connect } from "react-redux"
import {
  changeColor,
  showGrid,
  addOneRow,
  addOneCol,
  resetGrid,
} from "../actions"

import styled from "@emotion/styled"
import { css } from "@emotion/core"

import slugify from "slugify"

import { Row, Col } from "react-grid-system"

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showGrid: false,
      cols: 8,
      rows: 8,
      name: "test",
      disabled: false,
    }
  }
  componentDidMount() {
    this.props.changeColor({ background: "#000000" })
  }

  handleChangeComplete = color => {
    this.props.changeColor({ background: color.hex })
  }

  renderText(tiles) {
    var str = ""

    tiles.forEach((e, i) => {
      str += ` ${e.x * 6}px ${e.y * 6}px${
        e.color === "transparent" ? `` : e.color
      }${i === tiles.length - 1 ? `;` : `,`}`
    })

    return str.toString()
  }

  renderTextMoz(tiles) {
    var str = ""

    tiles.forEach((e, i) => {
      str += ` ${e.x * 6}px ${e.y * 6}px 0 0.020em${
        e.color === "transparent" ? `` : e.color
      }${i === tiles.length - 1 ? `;` : `,`}`
    })

    return str.toString()
  }

  changeHandler(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  checkGridSize() {
    if (this.state.cols > 16) {
      this.setState({
        cols: 16,
      })
    }

    if (this.state.rows > 16) {
      this.setState({
        rows: 16,
      })
    }
    if (this.state.cols < 1) {
      this.setState({
        cols: 1,
      })
    }

    if (this.state.rows < 1) {
      this.setState({
        rows: 1,
      })
    }
  }

  render() {
    const { grid } = this.props

    const Canvas = styled.div`
      display: block;
      position: relative;
      display: inline-block;
      width: ${grid.cols * 6 + 3}px;
      height: ${grid.rows * 6 + 3}px;
      border: 2px solid #000;
      transform: scale(1);
      &::before {
        position: absolute;
        top: -6px;
        left: -6px;
        content: "";
        width: 6px;
        height: 6px;
        background: transparent;
        color: transparent;
        box-shadow: ${this.renderText(grid.tiles)};
      }
    `

    const Button = styled.button`
      margin-left: 8px;
    `
    this.checkGridSize()
    return (
      <Layout>
        <Row>
          <Col>
            <div className="nes-container with-title is-rounded">
              <p className="title">Hello!</p>
              <p>
                Welcome to{" "}
                <span className="nes-text is-primary">
                  NES.css Pixelart Studio
                </span>
                . Build your own CSS piexl art graphics and icons ready to use
                with{" "}
                <a href="https://github.com/nostalgic-css/NES.css?ref=devawesome">
                  <span className="nes-text is-success">nes.css</span>
                </a>
              </p>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={8} md={6} xs={12} sm={12}>
            <div className="nes-container with-title is-rounded is-centered">
              <p className="title">
                {!this.state.gridSize
                  ? `Set Grid Size`
                  : `Grid ${grid.cols}x${grid.rows}`}
              </p>
              {!this.state.gridSize && (
                <div>
                  <div className="nes-field is-inline">
                    <label for="inline_field">Rows</label>
                    <input
                      type="text"
                      pattern="\d*"
                      maxlength="2"
                      className="nes-input"
                      name="rows"
                      placeholder="8"
                      onChange={this.changeHandler.bind(this)}
                    />
                  </div>
                  <br />
                  <div className="nes-field is-inline">
                    <label for="inline_field">Cols</label>
                    <input
                      type="text"
                      className="nes-input"
                      pattern="\d*"
                      maxlength="2"
                      name="cols"
                      placeholder="8"
                      onChange={this.changeHandler.bind(this)}
                    />
                    <br />
                  </div>
                  <br />
                  <Button
                    type="button"
                    className="nes-btn is-primary"
                    onClick={() => {
                      this.setState({
                        gridSize: !this.state.gridSize,
                      })
                      //console.log(this.state.rows, this.state.cols)

                      this.props.addOneRow(parseInt(this.state.rows))
                      this.props.addOneCol(parseInt(this.state.cols))
                    }}
                  >
                    {" "}
                    Set Grid Size
                  </Button>
                  <br />
                  <br />
                  <p>
                    <span className="nes-text is-primary">
                      Max grid size will be 16 x 16
                    </span>
                  </p>
                </div>
              )}
              {this.state.gridSize && (
                <span>
                  <GridCanvas />
                </span>
              )}
            </div>
          </Col>
          <Col lg={4} md={6} xs={12} sm={12}>
            <div className="nes-container is-rounded with-title">
              <p className="title">Options</p>
              <SketchPicker
                color={grid.color.background}
                onChangeComplete={this.handleChangeComplete}
                className="nes-container is-rounded"
              />
            </div>
            <br />
            <div className="nes-container with-title is-rounded is-centered">
              <p className="title">Output</p>
              <Canvas />
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={8} md={4} xs={6} sm={6}>
            <Button
              type="button"
              className="nes-btn"
              onClick={() => {
                this.props.showGrid(!grid.grid)
              }}
            >
              Grid {grid.grid ? `Off` : `On`}
            </Button>
            <Button
              type="button"
              className="nes-btn is-warning"
              onClick={() => {
                this.setState({
                  gridSize: !this.state.gridSize,
                })
                this.props.resetGrid()
              }}
            >
              Reset
            </Button>
          </Col>
          <Col lg={4} md={4} xs={6} sm={6}>
            <div className="nes-container" style={{ textAlign: "center" }}>
              <button type="button" className="nes-btn is-success">
                Copy CSS
              </button>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={12} md={12} xs={12} sm={12}>
            <div className="nes-field">
              <label>Sprite Name:</label>
              <input
                type="text"
                className="nes-input"
                placeholder="sprite-name"
                name="name"
                onChange={this.changeHandler.bind(this)}
              />
            </div>
          </Col>
        </Row>

        <br />
        <Row>
          <Col>
            <div className="nes-container with-title is-dark">
              <p className="title">Sprite CSS Code</p>

              <p id="text">
                {`.nes-${slugify(this.state.name.toLowerCase(), "-")} 
                    {
                      position: relative;
                      display: inline-block;
                      width: 48px;
                      height: 48px;
                    }
                    
                    .nes-${slugify(this.state.name.toLowerCase(), "-")}::before 
                    {
                      position: absolute;
                      top: -6px;
                      left: -6px;
                      content: "";
                      background: transparent;
                      width: 6px;
                      height: 6px;
                      color: transparent;
                      box-shadow: ${this.renderText(grid.tiles)} 
                    }

                    @supports (-moz-appearance: meterbar) {
                      .nes-${slugify(
                        this.state.name.toLowerCase(),
                        "-"
                      )}::before {
                        box-shadow: ${this.renderTextMoz(grid.tiles)} 
                      }
                    }
                    

                `}
              </p>
            </div>
          </Col>
        </Row>
        <br />
        <div className="nes-container with-title">
          <p className="title">Examples</p>
          <div className="icon-list">
            <i className="nes-phone" />
            <i className="nes-test" />
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ grid }) => {
  return { grid }
}

export default connect(
  mapStateToProps,
  { changeColor, showGrid, addOneRow, addOneCol, resetGrid }
)(ColorPicker)
