import React, { Fragment } from "react";
import { Space, Row, Card } from "antd";
import { Dropdown } from "../Dropdown/Dropdown";

export function InfoCard(props) {
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
