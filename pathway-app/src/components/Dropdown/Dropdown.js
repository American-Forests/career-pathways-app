import { Row, Select } from "antd";

export function Dropdown(props) {
  const { Option } = Select;
  return (
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
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
  );
}
