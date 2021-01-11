import React, { Fragment } from "react";
import { Component } from "react";
import { Dropdown, Menu, Badge } from "antd";
import { QuestionCircleOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./Nav.css";
import logo from "../../data/aflogo.png"; // Tell Webpack this JS file uses this image

const staticSiteUrl = "https://americanforests.org/";
const staticSiteMenu = (
  <Menu>
    <Menu.Item>
      <a
        rel="noopener noreferrer"
        href={`${staticSiteUrl}about`}
        target="_blank"
      >
        About
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        rel="noopener noreferrer"
        href={`${staticSiteUrl}datasources`}
        target="_blank"
      >
        Data Sources
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href={`${staticSiteUrl}FAQ`} target="_blank">
        FAQ
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a rel="noopener noreferrer" href={`${staticSiteUrl}`} target="_blank">
        Home Page
      </a>
    </Menu.Item>
  </Menu>
);

export class Nav extends Component {
  state = {};

  showInstructionsDrawer = () => {
    this.setState({
      instructionsVisbile: true,
    });
  };

  onInstructionsDrawer = () => {
    this.setState({
      instructionsVisbile: false,
    });
  };

  render() {
    return (
      <div
        className={styles.taffybar}
        style={{
          height: "40px",
          background: "#FFFFFF",
          width: "100%",
          color: "#555555",
          position: "fixed",
          //   left: 0,
          //   top: 0,
          zIndex: 1000,
          boxShadow: "0 1px 7px rgba(0, 0, 0, 0.2)",
        }}
      >
        <a
          className="brand"
          href="/"
          title="American Forests"
          style={{
            alignContent: "center",
            background: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            width: "170px",
            height: "110px",
            position: "fixed",
            left: "10px",
            top: 0,
            boxShadow: "0 1px 7px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <img
            src={logo}
            alt="American Forests Logo"
            width="170"
            height="100"
          />
        </a>

        <div
          style={{
            position: "absolute",
            right: "82px",
            top: "10px",
            color: "#FFFFFF",
          }}
        >
          <a
            className="ant-dropdown-link"
            onClick={() => this.props.onClick()}
            style={{ color: "#555555" }}
          >
            <QuestionCircleOutlined /> <b>Instructions</b>
          </a>
        </div>

        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "10px",
            color: "#FFFFFF",
          }}
        >
          <Dropdown
            overlay={staticSiteMenu}
            overlayClassName={"user-links"}
            trigger={"click"}
            overlayStyle={{
              zIndex: 10000,
            }}
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ color: "#555555" }}
            >
              <MenuOutlined /> <b>Menu</b>
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}
