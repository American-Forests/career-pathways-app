import React, { Fragment } from "react";
import { Component } from "react";
import { Dropdown, Menu, Badge, Button } from "antd";
import { QuestionCircleOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./Nav.css";
import logo from "../../data/aflogo.png"; // Tell Webpack this JS file uses this image

const staticSiteUrl = "https://americanforests.org/";
const smolWindow = 855;
const staticSiteMenu = (
  <Menu>
    <Menu.Item>
      <a
        rel="noopener noreferrer"
        href={`https://americanforests.org/`}
        target="_blank"
      >
        Home
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        rel="noopener noreferrer"
        href={`https://www.americanforests.org/our-work/urban-forestry/workforce-development/`}
        target="_blank"
      >
        Career Pathways
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
      <Fragment>
        {window.innerWidth >= smolWindow && (
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
                right: "85px",
                top: "10px",
                color: "#FFFFFF",
                zIndex: 1000,
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
        )}

        {window.innerWidth < smolWindow && (
          <Button
            style={{
              position: "absolute",
              right: "20px",
              top: "10px",
              color: "#FFFFFF",
              zIndex: 1000,
            }}
          >
            <a
              className="ant-dropdown-link"
              onClick={() => this.props.onClick()}
              style={{ color: "#555555" }}
            >
              <QuestionCircleOutlined /> <b>Instructions</b>
            </a>
          </Button>
        )}
      </Fragment>
    );
  }
}
