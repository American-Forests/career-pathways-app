import "./App.css";
import { Nav } from "./components/Nav/Nav";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Component, Fragment } from "react";
import locationPin from "./data/betterIcon.svg";
import locationPin2 from "./data/betterIcon2.svg";
import L, { point } from "leaflet";
import {
  Space,
  Button,
  Drawer,
  Col,
  Row,
  Modal,
  Card,
  Tabs,
  Select,
} from "antd";

const { Option } = Select;
const { TabPane } = Tabs;
const smolWindow = 855;

const myIcon = L.icon({
  iconUrl: locationPin,
  iconSize: [30, 25.2],
});

const curIcon = L.icon({
  iconUrl: locationPin2,
  iconSize: [30, 25.2],
});

class App extends Component {
  constructor(props) {
    super(props);
    let afmapdata = require("./data/career_paths.json");
    this.state = {
      map: null,
      currentPointOfInterest: null,
      landingLocation: {
        lat: 41.850033,
        lng: -87.6500523,
        zoom: 5,
        description: "this was a cool thingy",
      },
      data: afmapdata,
      jobinfovisible: false,
      instructionsVisbile: true,
    };
  }

  capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // getNextPlace = (position) => {
  //   this.onIconClickHandler(String(Number(position) + 1));
  // };

  // getPrevPlace = (position) => {
  //   this.onIconClickHandler(String(Number(position) - 1));
  // };

  onIconClickHandler = (positionTagKey) => {
    const pointOfInterest = {
      key: positionTagKey,
      ...this.state.data[positionTagKey],
    };

    const newLandingLocation = {
      lat: pointOfInterest.Lat + 0.0,
      lng: pointOfInterest.Lon + 0.03,
      zoom: 12,
    };
    this.setState({
      landingLocation: newLandingLocation,
      currentPointOfInterest: pointOfInterest,
      jobinfovisible: true,
    });
  };

  onSelection(value) {
    console.log(this.state.data[value]);
    const pointOfInterest = {
      key: value,
      ...this.state.data[value],
    };
    const newLandingLocation = {
      lat: pointOfInterest.Lat,
      lng: pointOfInterest.Lon,
      zoom: 12,
    };
    this.setState({
      landingLocation: newLandingLocation,
      currentPointOfInterest: pointOfInterest,
      jobinfovisible: true,
    });
  }

  showJobInfoDrawer = () => {
    this.setState({
      jobinfovisible: true,
    });
  };

  onJobInfoClose = () => {
    this.setState({
      jobinfovisible: false,
    });
  };

  showInstructionsDrawer = () => {
    this.setState({
      instructionsVisbile: true,
    });
  };

  onInstructionsDrawerClose = () => {
    this.setState({
      instructionsVisbile: false,
    });
  };
  render() {
    const position = [
      this.state.landingLocation.lat,
      this.state.landingLocation.lng,
    ];

    console.log("inner width", window.innerWidth);
    if (this.map) {
      console.log(this.map.leafletElement.getZoom());
    }

    return (
      <Fragment>
        <Nav onClick={() => this.showInstructionsDrawer()} />

        <Modal
          title="Instructions"
          visible={this.state.instructionsVisbile}
          onOk={this.onInstructionsDrawerClose}
          onCancel={this.onInstructionsDrawerClose}
        >
          <Row gutter={16}>
            <p>
              <b>Welcome to the Career Pathways Dashboard!</b>
            </p>
            <p>
              Please being by zoom in and out of various parts of the map to
              view to see the different locations of each career pathway.
            </p>
            <p>
              When you feel like are ready to look at a particular job location
              more closely, click on the icon associated with that location.
            </p>
            <p>
              This icon will turn red, indicating that this is the location you
              are currently viewing more information for. A scrollabe panel will
              pop up containing a description for that particular location.
              After you have finished reading the description and you are ready
              to see the next job site, click the close button and continue
              exploring!
            </p>
            <p>
              <i>Note:</i> You cannot continue exploring the map until after you
              have closed the information panel for that particular job.
            </p>
          </Row>
        </Modal>

        {window.innerWidth < smolWindow && (
          <Fragment>
            <Drawer
              title="Job Information Panel"
              // height={300}
              mask={false}
              onClose={this.onJobInfoClose}
              visible={this.state.jobinfovisible}
              placement={"right"}
              footer={
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Button onClick={this.onJobInfoClose} type="primary">
                    Close
                  </Button>
                </div>
              }
            >
              <Row gutter={16}>
                <Col span={12}>
                  <b>Organization:</b>{" "}
                  {(this.state.currentPointOfInterest &&
                    this.state.currentPointOfInterest["Org"]) ||
                    "No Org Available"}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <b>Program: </b>
                  {(this.state.currentPointOfInterest &&
                    this.state.currentPointOfInterest["Program"]) ||
                    "No Program Available"}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <b>Description: </b>
                  {(this.state.currentPointOfInterest &&
                    this.state.currentPointOfInterest["additional.notes"]) ||
                    "No Description Available"}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <b>City, State: </b>
                  {(this.state.currentPointOfInterest &&
                    this.state.currentPointOfInterest["City"]) ||
                    "No City Available"}
                  {", "}
                  {(this.state.currentPointOfInterest &&
                    this.state.currentPointOfInterest["State"]) ||
                    "No State Available"}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <b>Notes: </b>
                  {(this.state.currentPointOfInterest &&
                    this.state.currentPointOfInterest["otherNotes"]) ||
                    "No Notes Available"}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  {(this.state.currentPointOfInterest &&
                    this.state.currentPointOfInterest["link"] && (
                      <b>
                        <a
                          href={
                            this.state.currentPointOfInterest &&
                            this.state.currentPointOfInterest["link"]
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
        )}

        {window.innerWidth >= smolWindow && (
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
                maxHeight: "800px",
              }}
            >
              <div>
                <Row gutter={16}>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select An Organization"
                    optionFilterProp="children"
                    onChange={this.onSelection.bind(this)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {Object.keys(this.state.data).map((key, index) => {
                      let currentSpot = this.state.data[key];

                      if (currentSpot.Lat) {
                        return (
                          <Option value={key}>{currentSpot["Org"]}</Option>
                        );
                      }
                    })}
                  </Select>
                </Row>
                <Space direction="vertical" size="100" />
                <Row gutter={16}>
                  <p>
                    {this.state.currentPointOfInterest && <b>Organization: </b>}
                    {this.state.currentPointOfInterest && (
                        <b>Organization: </b>
                      ) &&
                      (this.state.currentPointOfInterest["Org"] ||
                        "No Org Available")}
                  </p>
                </Row>
                <Row gutter={16}>
                  <p>
                    {this.state.currentPointOfInterest && <b>Program: </b>}
                    {this.state.currentPointOfInterest && <b>Program: </b> &&
                      (this.state.currentPointOfInterest["Program"] ||
                        "No Program Available")}
                  </p>
                </Row>
                <Row gutter={16}>
                  <p>
                    {this.state.currentPointOfInterest && <b>Description: </b>}
                    {this.state.currentPointOfInterest && (
                        <b>Description: </b>
                      ) &&
                      (this.state.currentPointOfInterest["additional.notes"] ||
                        "No Description Available")}
                  </p>
                </Row>
                <Row gutter={16}>
                  <p>
                    {this.state.currentPointOfInterest && <b>City, State: </b>}
                    {this.state.currentPointOfInterest && (
                        <b>City, State: </b>
                      ) &&
                      (this.state.currentPointOfInterest["City"] ||
                        "No City Available") &&
                      ", " &&
                      (this.state.currentPointOfInterest["State"] ||
                        "No State Available")}
                  </p>
                </Row>
                <Row gutter={16}>
                  <p>
                    {this.state.currentPointOfInterest && <b>Notes: </b>}
                    {this.state.currentPointOfInterest && <b>Notes: </b> &&
                      (this.state.currentPointOfInterest["otherNotes"] ||
                        "No Notes Available")}
                  </p>
                </Row>
                <Row gutter={16}>
                  {this.state.currentPointOfInterest &&
                    ((this.state.currentPointOfInterest["link"] && (
                      <b>
                        <a
                          href={
                            this.state.currentPointOfInterest &&
                            this.state.currentPointOfInterest["link"]
                          }
                          target="_blank"
                        >
                          Click Here to Learn More
                        </a>
                      </b>
                    )) ||
                      "No link available")}
                </Row>
              </div>
            </Card>
          </Fragment>
        )}

        <Map
          className="map"
          center={position}
          zoom={this.state.landingLocation.zoom}
          // zoomControl={false}
          ref={(ref) => {
            this.map = ref;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
'
          />
          {Object.keys(this.state.data).map((key, index) => {
            let currentSpot = this.state.data[key];
            if (
              this.state.currentPointOfInterest &&
              this.state.currentPointOfInterest.key == key
            ) {
              let coordinates = [currentSpot["Lat"], currentSpot["Lon"]];
              return (
                <Marker
                  position={coordinates}
                  onClick={() => this.onIconClickHandler(key)}
                  icon={curIcon}
                ></Marker>
              );
            }
            if (currentSpot.Lat) {
              let coordinates = [currentSpot["Lat"], currentSpot["Lon"]];
              return (
                <Marker
                  position={coordinates}
                  onClick={() => this.onIconClickHandler(key)}
                  icon={myIcon}
                ></Marker>
              );
            }
          })}
        </Map>
      </Fragment>
    );
  }
}

export default App;
