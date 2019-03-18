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
import CopyToClipboard from "react-copy-to-clipboard"

class ColorPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showGrid: false,
      cols: 8,
      rows: 8,
      name: "test",
      disabled: false,
      isSprite: "true",
      tileSize: 6,
      scale: 1,
      copied: false,
      inverted: false,
    }

    this.textarea = React.createRef()
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
      str += ` ${e.x * this.state.tileSize}px ${e.y * this.state.tileSize}px ${
        e.color === "transparent" ? `` : e.color
      }${i === tiles.length - 1 ? `;` : `,`}`
    })

    return str.toString()
  }

  renderTextMoz(tiles) {
    var str = ""

    tiles.forEach((e, i) => {
      str += ` ${e.x * this.state.tileSize}px ${e.y *
        this.state.tileSize}px 0 0.020em${
        e.color === "transparent" ? `` : e.color
      }${i === tiles.length - 1 ? `;` : `,`}`
    })

    return str.toString()
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
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

  componentDidUpdate(prevProps) {
    if (this.props.grid.tiles !== prevProps.grid.tiles) {
      this.setState({
        copied: false,
      })
    }
  }

  render() {
    const { grid } = this.props
    const { isSprite, gridSize, tileSize, copied, name, inverted } = this.state

    const CanvasSprite = styled.div`
      display: block;
      position: relative;
      display: inline-block;
      width: ${grid.cols * 6 + 3}px;
      height: ${grid.rows * 6 + 3}px;
      margin-top: ${grid.cols}px;
      margin-bottom: ${grid.cols}px !important;
      border: 2px solid ${inverted ? `#FFF` : `#000`};
      background: ${!inverted ? `#FFF` : `#000`};
      transform: scale(${this.state.scale});
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

    const CanvasIcon = styled.div`
      display: block;
      position: relative;
      display: inline-block;
      margin-top: ${grid.cols * 3}px;
      margin-bottom: ${grid.cols * 3}px !important;
      width: ${grid.cols * 3}px;
      height: ${grid.cols * 3}px;
      border: 1px solid #000;
      background: ${!inverted ? `#FFF` : `#000`};
      transform: scale(3);
      &::before {
        position: absolute;
        top: -3px;
        left: -3px;
        content: "";
        width: 1px;
        height: 1px;
        transform: scale(3);
        background: transparent;
        color: transparent;
        box-shadow: ${this.renderText(grid.tiles)};
      }
    `

    const Button = styled.button`
      margin-left: 8px;
    `

    const SpriteString = `.nes-${slugify(
      name.toLowerCase(),
      "-"
    )} {\nposition: relative;\ndisplay: inline-block;\nwidth: ${grid.cols *
      tileSize}px;\nheight: ${grid.rows * tileSize}px;\n}\n.nes-${slugify(
      name.toLowerCase(),
      "-"
    )}::before {\nposition: absolute;\ntop: -6px;\nleft: -6px;\ncontent: "";\nbackground: transparent;\nwidth: ${tileSize}px;\nheight: ${tileSize}px;\ncolor: transparent;\nbox-shadow: ${this.renderText(
      grid.tiles
    )}\n}\n@supports (-moz-appearance: meterbar) {\n.nes-${slugify(
      name.toLowerCase(),
      "-"
    )}::before {\nbox-shadow: ${this.renderTextMoz(grid.tiles)}\n}\n}\n`

    const IconString = `.nes-icon.${slugify(
      name.toLowerCase(),
      "-"
    )}::before{\nwidth: 1px;\nheight: 1px;\ncolor: transparent;${grid.cols <=
      12 &&
      grid.rows <= 12 &&
      `\ntransform: scale(2);`}\nbox-shadow: ${this.renderText(
      grid.tiles
    )}\n}\n@supports (-moz-appearance: meterbar) {\n.nes-icon.${slugify(
      name.toLowerCase(),
      "-"
    )}::before{\nbox-shadow: ${this.renderTextMoz(grid.tiles)}\n}\n}\n`

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
                  NES.css Pixelbox Studio
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
            <div
              className={`nes-container with-title is-rounded is-centered ${inverted &&
                "is-dark"}`}
            >
              <p className="title">
                {!gridSize
                  ? `Set Grid Size`
                  : `${isSprite === "true" ? `Sprite` : `Icon`} Grid ${
                      grid.cols
                    }x${grid.rows}`}
              </p>
              {!gridSize && (
                <div>
                  <div className="nes-field is-inline">
                    <label for="inline_field">Rows</label>
                    <input
                      type="text"
                      pattern="\d*"
                      maxlength="2"
                      className="nes-input"
                      name="cols"
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
                      name="rows"
                      placeholder="8"
                      onChange={this.changeHandler.bind(this)}
                    />
                    <br />
                  </div>
                  <div>
                    <br />
                    <label>
                      <input
                        type="radio"
                        class="nes-radio"
                        name="isSprite"
                        value={true}
                        onChange={e => {
                          this.changeHandler(e)
                          this.setState({
                            tileSize: 6,
                          })
                        }}
                      />
                      <span>Sprite or</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        class="nes-radio"
                        name="isSprite"
                        value={false}
                        onChange={e => {
                          this.changeHandler(e)
                          this.setState({
                            tileSize: 1,
                          })
                        }}
                      />
                      <span>Icon</span>
                    </label>
                  </div>
                  <br />
                  <Button
                    type="button"
                    className="nes-btn is-primary"
                    onClick={() => {
                      this.setState({
                        gridSize: !gridSize,
                      })
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
              {gridSize && (
                <span>
                  <GridCanvas inverted={inverted} />
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
            {gridSize && (
              <div className="nes-container with-title is-rounded is-centered">
                <p className="title">Output</p>
                {isSprite === "true" ? <CanvasSprite /> : <CanvasIcon />}
              </div>
            )}
          </Col>
        </Row>
        <br />

        {gridSize && (
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
                className={`nes-btn ${!inverted && `is-primary`}`}
                onClick={() => {
                  this.setState({
                    inverted: !inverted,
                  })
                }}
              >
                {inverted ? `Light BG` : `Dark BG`}
              </Button>
              <Button
                type="button"
                className="nes-btn is-warning"
                onClick={() => {
                  this.setState({
                    gridSize: !gridSize,
                  })
                  this.props.resetGrid()
                }}
              >
                Reset
              </Button>
            </Col>
            <Col lg={4} md={4} xs={6} sm={6}>
              <CopyToClipboard
                text={this.textarea.current.innerHTML}
                onCopy={() => {
                  this.setState({ copied: true })
                  console.log(this.textarea.current.innerHTML)
                }}
              >
                <button
                  type="button"
                  className={`nes-btn ${copied ? `is-success` : `is-primary`}`}
                >
                  <i className="nes-icon file-white is-small" />{" "}
                  {copied ? `Copied!` : `Copy CSS`}
                </button>
              </CopyToClipboard>
            </Col>
          </Row>
        )}
        <br />
        <Row>
          <Col lg={12} md={12} xs={12} sm={12}>
            <div className="nes-field">
              <label>
                {isSprite === "true" ? `Sprite Name:` : `Icon Name`}
              </label>
              <input
                type="text"
                className="nes-input"
                placeholder={isSprite === "true" ? `sprite-name:` : `icon`}
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
              <p className="title">Css Output</p>
              <textarea
                ref={this.textarea}
                className="nes-textarea is-dark"
                rows="20"
                cols="50"
                value={isSprite === "true" ? SpriteString : IconString}
              />
              )}
            </div>
          </Col>
        </Row>
        <br />
        <i className="nes-tetris" />
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
