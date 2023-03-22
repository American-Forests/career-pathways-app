import React from "react";
import { Row, Modal } from "antd";

export function InstructionsModal(props) {
  return (
    <Modal
      title="Instructions"
      visible={props.instructionsVisible}
      onOk={() => props.onInstructionsDrawerClose()}
      onCancel={() => props.onInstructionsDrawerClose()}
    >
      <Row gutter={16}>
        <p>
          <b>Explore Tree Equity Workforce Network Members and WorkForest Organizations</b>
        </p>
        <p>
          Begin by zooming in and out of the map to view where Career Pathways partner programs are located.
        </p>
        <p>
          Click on the green icons associated with a specific location.
        </p>
        <p>
          The icon will turn red, indicating that this is the program you are
          currently viewing. A scrollable panel will pop up with the name and a
          link to the organization's website.
        </p>
        <p>
          <i>Note:</i> You cannot continue exploring the map until you have
          closed the information panel for a program.
        </p>
      </Row>
    </Modal>
  );
}
