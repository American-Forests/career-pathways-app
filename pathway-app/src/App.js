import "./App.css";
import { Nav } from "./components/Nav/Nav";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Component, Fragment } from "react";
import locationPin from "./data/betterIcon.svg";
import locationPin2 from "./data/betterIcon2.svg";
import L, { point } from "leaflet";
import { Button, Drawer, Col, Row } from "antd";

const myIcon = L.icon({
  iconUrl: locationPin,
  iconSize: [50, 42],
});

const curIcon = L.icon({
  iconUrl: locationPin2,
  iconSize: [50, 42],
});

class App extends Component {
  constructor(props) {
    super(props);
    let afmapdata = require("./data/career_paths.json");
    this.state = {
      currentPointOfInterest: null,
      landingLocation: {
        lat: 41.850033,
        lng: -87.6500523,
        zoom: 5,
        description: "this was a cool thingy",
      },
      data: afmapdata,
      visible: false,
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
      lat: pointOfInterest.Lat,
      lng: pointOfInterest.Lon,
      zoom: 12,
    };
    this.setState({
      landingLocation: newLandingLocation,
      currentPointOfInterest: pointOfInterest,
      visible: true,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const position = [
      this.state.landingLocation.lat,
      this.state.landingLocation.lng,
    ];
    console.log(this.state);

    return (
      <Fragment>
        <Nav />
        <Drawer
          title="Job Information Panel"
          height={300}
          onClose={this.onClose}
          visible={this.state.visible}
          placement={"bottom"}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button onClick={this.onClose} type="primary">
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

        <Map
          className="map"
          center={position}
          zoom={this.state.landingLocation.zoom}
          zoomControl={false}
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
