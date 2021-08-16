import "./App.css";
import { Nav } from "./components/Nav/Nav";
import { InstructionsModal } from "./components/InstructionsModal/InstructionsModal";
import { InfoDrawer } from "./components/InfoDrawer/InfoDrawer";
import { InfoCard } from "./components/InfoCard/InfoCard";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Component, Fragment } from "react";
import locationPin from "./data/betterIcon.svg";
import locationPin2 from "./data/betterIcon2.svg";
import L from "leaflet";
import { Space, Button, Drawer, Col, Row, Card, Select } from "antd";

const { Option } = Select;
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

    return (
      <Fragment>
        <Nav onClick={() => this.showInstructionsDrawer()} />

        <InstructionsModal
          onInstructionsDrawerClose={() => this.onInstructionsDrawerClose()}
          instructionsVisbile={this.state.instructionsVisbile}
        />

        {window.innerWidth < smolWindow && (
          <InfoDrawer
            onJobInfoClose={() => this.onJobInfoClose()}
            jobinfovisible={this.state.jobinfovisible}
            currentPointOfInterest={this.state.currentPointOfInterest}
          />
        )}

        {window.innerWidth >= smolWindow && (
          <InfoCard
            onSelection={() => this.onSelection.bind(this)}
            data={this.state.data}
            currentPointOfInterest={this.state.currentPointOfInterest}
          />
          // <Fragment>
          //   <Card
          //     title="Career Pathways Dashboard"
          //     style={{
          //       zIndex: 500,
          //       width: "35%",
          //       right: 25,
          //       top: 50,
          //       backgroundColor: "#FFFFFF",
          //       position: "absolute",
          //       overflowY: "scroll",
          //       maxHeight: "800px",
          //     }}
          //   >
          //     <div style={{}}>
          //       <Row gutter={16} style={{ paddingBottom: "15px" }}>
          //         <Select
          //           showSearch
          //           style={{ width: 200 }}
          //           placeholder="Select An Organization"
          //           optionFilterProp="children"
          //           onChange={this.onSelection.bind(this)}
          //           filterOption={(input, option) =>
          //             option.children
          //               .toLowerCase()
          //               .indexOf(input.toLowerCase()) >= 0
          //           }
          //         >
          //           {Object.keys(this.state.data).map((key, index) => {
          //             let currentSpot = this.state.data[key];

          //             if (currentSpot.Lat) {
          //               return (
          //                 <Option value={key}>{currentSpot["Org"]}</Option>
          //               );
          //             }
          //           })}
          //         </Select>
          //       </Row>
          //       <Space direction="vertical" size="100" />
          //       <Row gutter={8}>
          //         <p>
          //           {this.state.currentPointOfInterest && <b>Organization: </b>}
          //           {this.state.currentPointOfInterest && (
          //               <b>Organization: </b>
          //             ) &&
          //             (this.state.currentPointOfInterest["Org"] ||
          //               "No Org Available")}
          //         </p>
          //       </Row>
          //       <Row gutter={16}>
          //         <p>
          //           {this.state.currentPointOfInterest && <b>Program: </b>}
          //           {this.state.currentPointOfInterest && <b>Program: </b> &&
          //             (this.state.currentPointOfInterest["Program"] ||
          //               "No Program Available")}
          //         </p>
          //       </Row>
          //       <Row gutter={8}>
          //         <p>
          //           {this.state.currentPointOfInterest && <b>Overview: </b>}
          //           {this.state.currentPointOfInterest && <b>Overview: </b> &&
          //             (this.state.currentPointOfInterest["Overview"] ||
          //               "No Overview Available")}
          //         </p>
          //       </Row>
          //       {this.state.currentPointOfInterest &&
          //         this.state.currentPointOfInterest[
          //           "Blurb.on.AF.involvement"
          //         ] && (
          //           <Row gutter={8}>
          //             <p>
          //               <b>American Forests Involvement: </b>
          //               {(this.state.currentPointOfInterest &&
          //                 this.state.currentPointOfInterest[
          //                   "Blurb.on.AF.involvement"
          //                 ]) ||
          //                 "No involvement information available."}
          //             </p>
          //           </Row>
          //         )}
          //       {this.state.currentPointOfInterest &&
          //         this.state.currentPointOfInterest["Images"] && (
          //           <Row gutter={8}>
          //             <img
          //               src={this.state.currentPointOfInterest["Images"]}
          //               width="100%"
          //               height="100%"
          //             ></img>
          //           </Row>
          //         )}
          //       <Row gutter={8}>
          //         <p>
          //           {this.state.currentPointOfInterest && <b>City, State: </b>}
          //           {this.state.currentPointOfInterest && (
          //               <b>City, State: </b>
          //             ) &&
          //             (this.state.currentPointOfInterest["City"] ||
          //               "No City Available") &&
          //             ", " &&
          //             (this.state.currentPointOfInterest["State"] ||
          //               "No State Available")}
          //         </p>
          //       </Row>
          //       <Row gutter={8}>
          //         <p>
          //           {this.state.currentPointOfInterest && (
          //             <b>Training/Credentials: </b>
          //           )}
          //           {this.state.currentPointOfInterest && (
          //               <b>Training/Credentials: </b>
          //             ) &&
          //             (this.state.currentPointOfInterest[
          //               "Training.Credentials.Offered"
          //             ] ||
          //               "No Notes Available")}
          //         </p>
          //       </Row>
          //       <Row gutter={8}>
          //         {this.state.currentPointOfInterest &&
          //           ((this.state.currentPointOfInterest["Link"] && (
          //             <b>
          //               <a
          //                 href={
          //                   this.state.currentPointOfInterest &&
          //                   this.state.currentPointOfInterest["Link"]
          //                 }
          //                 target="_blank"
          //               >
          //                 Click Here to Learn More
          //               </a>
          //             </b>
          //           )) ||
          //             "No link available")}
          //       </Row>
          //     </div>
          //   </Card>
          // </Fragment>
        )}

        <Map
          className="map"
          center={position}
          zoom={this.state.landingLocation.zoom}
          zoomControl={window.innerWidth < smolWindow}
          ref={(ref) => {
            this.map = ref;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a><br/> View full map <a href="https://d2dv1x1i9dq9us.cloudfront.net/index.html">here </a></div> '
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
                  key={currentSpot["Program"]}
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
                  key={currentSpot["Program"]}
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
