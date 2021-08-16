import React, { Fragment } from "react";
import { Space, Row, Card, Select } from "antd";

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
              value={props.currentPointOfInterest.key}
              onChange={(e) => {
                props.onSelection(e);
              }}
              filterOption={(input, option) => {
                console.log(option);
                return (
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                );
              }}
            >
              {Object.keys(props.data).map((key, index) => {
                let currentSpot = props.data[key];

                return (
                  <Option key={key} value={key}>
                    {currentSpot["Org"]}
                  </Option>
                );
              })}
            </Select>
          </Row>
          <Space direction="vertical" size="100" />
          {props.currentPointOfInterest && props.currentPointOfInterest["Org"] && (
            <Row gutter={8}>
              <p>
                <b>Organization: </b> {props.currentPointOfInterest["Org"]}
              </p>
            </Row>
          )}
          {props.currentPointOfInterest &&
            props.currentPointOfInterest["Program"] && (
              <Row gutter={8}>
                <p>
                  <b>Program: </b>
                  {props.currentPointOfInterest["Program"]}
                </p>
              </Row>
            )}
          {props.currentPointOfInterest &&
            props.currentPointOfInterest["Overview"] && (
              <Row gutter={8}>
                <p>
                  <b>Overview: </b> {props.currentPointOfInterest["Overview"]}
                </p>
              </Row>
            )}
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
                  alt={props.currentPointOfInterest["Org"]}
                  width="100%"
                  height="100%"
                ></img>
              </Row>
            )}
          {props.currentPointOfInterest &&
            (props.currentPointOfInterest.City ||
              props.currentPointOfInterest.State) && (
              <Row gutter={8}>
                <p>
                  <b>City, State: </b>{" "}
                  {props.currentPointOfInterest["City"] ||
                    ("No City Available" &&
                      ", " &&
                      props.currentPointOfInterest["State"]) ||
                    "No State Available"}
                </p>
              </Row>
            )}
          {props.currentPointOfInterest &&
            props.currentPointOfInterest["Training.Credentials.Offered"] && (
              <Row gutter={8}>
                <p>
                  <b>Training/Credentials: </b>
                  {props.currentPointOfInterest["Training.Credentials.Offered"]}
                </p>
              </Row>
            )}
          {props.currentPointOfInterest && props.currentPointOfInterest.Link && (
            <Row gutter={8}>
              <b>
                <a
                  href={props.currentPointOfInterest["Link"]}
                  target="_blank"
                  ref="noreferrer"
                >
                  Click Here to Learn More
                </a>
              </b>
            </Row>
          )}
        </div>
      </Card>
    </Fragment>
  );
}
