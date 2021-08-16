import React, { Fragment } from "react";
import { Button, Drawer, Col, Row } from "antd";

export function InfoDrawer(props) {
  return (
    <Fragment>
      <Drawer
        title="Job Information Panel"
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
        {props.currentPointOfInterest["Org"] && (
          <Row gutter={16}>
            <Col span={12}>
              <b>Organization:</b> {props.currentPointOfInterest["Org"]}
            </Col>
          </Row>
        )}
        {props.currentPointOfInterest["Program"] && (
          <Row gutter={16}>
            <Col span={24}>
              <b>Program: </b>
              {props.currentPointOfInterest["Program"]}
            </Col>
          </Row>
        )}
        {props.currentPointOfInterest["Overview"] && (
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
        <Row gutter={16}>
          <Col span={24}>
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
        <Row gutter={16}>
          <Col span={12}>
            <b>Notes: </b>
            {(props.currentPointOfInterest &&
              props.currentPointOfInterest["otherNotes"]) ||
              "No Notes Available"}
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            {(props.currentPointOfInterest &&
              props.currentPointOfInterest["link"] && (
                <b>
                  <a
                    href={
                      props.currentPointOfInterest &&
                      props.currentPointOfInterest["link"]
                    }
                    target="_blank"
                  >
                    Click Here to Learn More
                  </a>
                </b>
              )) ||
              "No link available"}
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  );
}
