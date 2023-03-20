import React, { Fragment } from "react";
import { Space, Row, Card } from "antd";
import { Dropdown } from "../Dropdown/Dropdown";

export function InfoCard(props) {
  return (
    <Fragment>
      <Card
        title="Explore Career Pathways Partners"
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
        <div>
          <Dropdown
            currentPointOfInterest={props.currentPointOfInterest}
            data={props.data}
            onSelection={props.onSelection}
          />
          <Space direction="vertical" size="100" />
          {props.currentPointOfInterest && props.currentPointOfInterest["Org"] && (
            <Row gutter={8}>
              <p>
                <b>Organization/Company: </b> {props.currentPointOfInterest["Org"]}
              </p>
            </Row>
          )}
          {props.currentPointOfInterest &&
            props.currentPointOfInterest["Type"] && (
              <Row gutter={8}>
                <p>
                  <b>Type: </b>
                  {props.currentPointOfInterest["Type"]}
                </p>
              </Row>
            )}
          {props.currentPointOfInterest &&
            props.currentPointOfInterest["Career.Pathways.Workstream"] && (
              <Row gutter={8}>
                <p>
                  <b>Career Pathways Workstream: </b> {props.currentPointOfInterest["Career.Pathways.Workstream"]}
                </p>
              </Row>
            )}
          {props.currentPointOfInterest &&
            (props.currentPointOfInterest.City ||
              props.currentPointOfInterest.State) && (
              <Row gutter={8}>
                <p>
                  <b>City, State: </b>{" "}
                  {(props.currentPointOfInterest &&
                    props.currentPointOfInterest["City"]) ||
                    "No City Available"}
                  {", "}
                  {(props.currentPointOfInterest &&
                    props.currentPointOfInterest["State"]) ||
                    "No State Available"}
                </p>
              </Row>
            )}
          {props.currentPointOfInterest && props.currentPointOfInterest.Link && (
            <Row gutter={8}>
              <b>
                <a
                  href={props.currentPointOfInterest["Link"]}
                  target="_blank"
                  rel="noreferrer"
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
