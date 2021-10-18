import React, { Fragment } from "react";
import { Button, Drawer, Col, Row } from "antd";

export function InfoDrawer(props) {
  return (
    <Fragment>
      <Drawer
        title="Program Information"
        mask={false}
        onClose={() => props.onJobInfoClose()}
        visible={props.jobinfovisible}
        placement={"right"}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={() => props.onJobInfoClose()} type="primary">
              Close
            </Button>
          </div>
        }
      >
        {props.currentPointOfInterest && props.currentPointOfInterest["Org"] && (
          <Row gutter={16}>
            <Col span={12}>
              <b>Organization:</b> {props.currentPointOfInterest["Org"]}
            </Col>
          </Row>
        )}
        {props.currentPointOfInterest &&
          props.currentPointOfInterest["Program"] && (
            <Row gutter={16}>
              <Col span={24}>
                <b>Program: </b>
                {props.currentPointOfInterest["Program"]}
              </Col>
            </Row>
          )}
        {props.currentPointOfInterest &&
          props.currentPointOfInterest["Overview"] && (
            <Row gutter={16}>
              <Col span={24}>
                <b>Description: </b>
                {props.currentPointOfInterest["Overview"]}
              </Col>
            </Row>
          )}
        {props.currentPointOfInterest &&
          props.currentPointOfInterest["Blurb.on.AF.involvement"] && (
            <Row gutter={16}>
              <Col span={24}>
                <b>American Forests Involvement: </b>
                {(props.currentPointOfInterest &&
                  props.currentPointOfInterest["Blurb.on.AF.involvement"]) ||
                  "No involvement information available."}
              </Col>
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
        {props.currentPointOfInterest && (
          <Row gutter={16}>
            {" "}
            <Col span={24}>
              {" "}
              <b>City, State: </b>
              {(props.currentPointOfInterest &&
                props.currentPointOfInterest["City"]) ||
                "No City Available"}
              {", "}
              {(props.currentPointOfInterest &&
                props.currentPointOfInterest["State"]) ||
                "No State Available"}
            </Col>
          </Row>
        )}
        {props.currentPointOfInterest &&
          props.currentPointOfInterest["otherNotes"] && (
            <Row gutter={16}>
              {" "}
              <Col span={12}>
                <b>Notes: </b>
                {props.currentPointOfInterest["otherNotes"]}
              </Col>
            </Row>
          )}
        {props.currentPointOfInterest && props.currentPointOfInterest["Link"] && (
          <Row gutter={16}>
            <Col span={24}>
              <b>
                <a
                  href={props.currentPointOfInterest["Link"]}
                  target="_blank"
                  rel="noreferrer"
                >
                  Click Here to Learn More
                </a>
              </b>
            </Col>
          </Row>
        )}
      </Drawer>
    </Fragment>
  );
}
