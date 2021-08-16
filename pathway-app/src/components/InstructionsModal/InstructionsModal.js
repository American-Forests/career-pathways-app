import React from "react";
import { Row, Modal } from "antd";

export function InstructionsModal(props) {
  return (
    <Modal
      title="Instructions"
      visible={props.instructionsVisbile}
      onOk={() => props.onInstructionsDrawerClose()}
      onCancel={() => props.onInstructionsDrawerClose()}
    >
      <Row gutter={16}>
        <p>
          <b>Urban Forestry Job Training Programs</b>
        </p>
        <p>
          Please being by zoom in and out of various parts of the map to view to
          see the different locations of each career pathway.
        </p>
        <p>
          When you feel like are ready to look at a particular job location more
          closely, click on the icon associated with that location.
        </p>
        <p>
          This icon will turn red, indicating that this is the location you are
          currently viewing more information for. A scrollabe panel will pop up
          containing a description for that particular location. After you have
          finished reading the description and you are ready to see the next job
          site, click the close button and continue exploring!
        </p>
        <p>
          <i>Note:</i> You cannot continue exploring the map until after you
          have closed the information panel for that particular job.
        </p>
      </Row>
    </Modal>
  );
}
