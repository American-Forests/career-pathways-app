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
          <b>Explore Urban Forestry Job Training Programs</b>
        </p>
        <p>
          Begin by zooming in and out of the map to view where urban forestry
          job training programs are located.
        </p>
        <p>
          Click on the blue or green icons associated with a specific location.
        </p>
        <p>
          The icon will turn red, indicating that this is the program you are
          currently viewing. A scrollable panel will pop up with the name and a
          brief description of the program.
        </p>
        <p>
          <i>Note:</i> You cannot continue exploring the map until you have
          closed the information panel for a program.
        </p>
      </Row>
    </Modal>
  );
}
