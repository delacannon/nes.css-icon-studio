/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 1024,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer style={{ textAlign: "center" }}>
            {new Date().getFullYear()}, View repo on
            {` `}
            <a href="https://github.com/delacannon/nes.css-icon-studio">
              Github
            </a>
            <br />
            <br />
            <a href="https://github.com/delacannon/nes.css-icon-studio">
              <i className="nes-octocat animate" />
            </a>
            <br />
            <br />
            Made with <i className="nes-icon heart" /> by
            <a href="https://twitter.com/delacannon"> @delacannon</a>
            <br />
            <br />
            Share{" "}
            <a href="https://twitter.com/share?url=https://pixelbox.netlify.com', 'twitter-popup', 'height=350,width=600">
              <i className="nes-icon twitter" />
            </a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
