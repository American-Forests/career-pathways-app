import React, { Fragment } from "react";
import { Space, Button, Drawer, Col, Row, Card, Select } from "antd";

export function InfoCard(props) {
  const { Option } = Select;
  return (
    <Fragment>
      <Card
        title="Career Pathways Dashboard"
        style={{
          zIndex: 500,
          width: "35%",
          right: 25,
          top: 50,
          backgroundColor: "#FFFFFF",
          position: "absolute",
          overflowY: "scroll",
          maxHeight: "800px",
        }}
      >
        <div style={{}}>
          <Row gutter={16} style={{ paddingBottom: "15px" }}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select An Organization"
              optionFilterProp="children"
              onChange={() => props.onSelection()}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {Object.keys(props.data).map((key, index) => {
                let currentSpot = props.data[key];

                if (currentSpot.Lat) {
                  return (
                    <Option key={key} value={key}>
                      {currentSpot["Org"]}
                    </Option>
                  );
                }
              })}
            </Select>
          </Row>
          <Space direction="vertical" size="100" />
          <Row gutter={8}>
            <p>
              {props.currentPointOfInterest && <b>Organization: </b>}
              {props.currentPointOfInterest && <b>Organization: </b> &&
                (props.currentPointOfInterest["Org"] || "No Org Available")}
            </p>
          </Row>
          <Row gutter={16}>
            <p>
              {props.currentPointOfInterest && <b>Program: </b>}
              {props.currentPointOfInterest && <b>Program: </b> &&
                (props.currentPointOfInterest["Program"] ||
                  "No Program Available")}
            </p>
          </Row>
          <Row gutter={8}>
            <p>
              {props.currentPointOfInterest && <b>Overview: </b>}
              {props.currentPointOfInterest && <b>Overview: </b> &&
                (props.currentPointOfInterest["Overview"] ||
                  "No Overview Available")}
            </p>
          </Row>
          {props.currentPointOfInterest &&
            props.currentPointOfInterest["Blurb.on.AF.involvement"] && (
              <Row gutter={8}>
                <p>
                  <b>American Forests Involvement: </b>
                  {(props.currentPointOfInterest &&
                    props.currentPointOfInterest["Blurb.on.AF.involvement"]) ||
                    "No involvement information available."}
                </p>
              </Row>
            )}
          {props.currentPointOfInterest &&
            props.currentPointOfInterest["Images"] && (
              <Row gutter={8}>
                <img
                  src={props.currentPointOfInterest["Images"]}
                  width="100%"
                  height="100%"
                ></img>
              </Row>
            )}
          <Row gutter={8}>
            <p>
              {props.currentPointOfInterest && <b>City, State: </b>}
              {props.currentPointOfInterest && <b>City, State: </b> &&
                (props.currentPointOfInterest["City"] || "No City Available") &&
                ", " &&
                (props.currentPointOfInterest["State"] || "No State Available")}
            </p>
          </Row>
          <Row gutter={8}>
            <p>
              {props.currentPointOfInterest && <b>Training/Credentials: </b>}
              {props.currentPointOfInterest && <b>Training/Credentials: </b> &&
                (props.currentPointOfInterest["Training.Credentials.Offered"] ||
                  "No Notes Available")}
            </p>
          </Row>
          <Row gutter={8}>
            {props.currentPointOfInterest &&
              ((props.currentPointOfInterest["Link"] && (
                <b>
                  <a
                    href={
                      props.currentPointOfInterest &&
                      props.currentPointOfInterest["Link"]
                    }
                    target="_blank"
                  >
                    Click Here to Learn More
                  </a>
                </b>
              )) ||
                "No link available")}
          </Row>
        </div>
      </Card>
    </Fragment>
  );
}
