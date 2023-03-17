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
              <b>Organization/Company:</b> {props.currentPointOfInterest["Org"]}
            </Col>
          </Row>
        )}
        {props.currentPointOfInterest &&
          props.currentPointOfInterest["Type"] && (
            <Row gutter={16}>
              <Col span={24}>
                <b>Type: </b>
                {props.currentPointOfInterest["Type"]}
              </Col>
            </Row>
          )}
        {props.currentPointOfInterest &&
          props.currentPointOfInterest["Career.Pathways.Workstream"] && (
            <Row gutter={16}>
              <Col span={24}>
                <b>Career Pathways Workstream: </b>
                {props.currentPointOfInterest["Career.Pathways.Workstream"]}
              </Col>
            </Row>
          )}
        {props.currentPointOfInterest && (
          <Row gutter={16}>
            {" "}
            <Col span={24}>
              {" "}
              <b>City, State: </b>
              {props.currentPointOfInterest["City"] ||
                ("No City Available" &&
                  ", " &&
                  props.currentPointOfInterest["State"]) ||
                "No State Available"}
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
