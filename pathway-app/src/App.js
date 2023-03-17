import "./App.css";
import { Nav } from "./components/Nav/Nav";
import { InstructionsModal } from "./components/InstructionsModal/InstructionsModal";
import { InfoDrawer } from "./components/InfoDrawer/InfoDrawer";
import { InfoCard } from "./components/InfoCard/InfoCard";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Component, Fragment } from "react";
import regularPin from "./data/regularIcon.svg";
import activePin from "./data/activeIcon.svg";
import afProjPin from "./data/afProjIcon.svg";
import L from "leaflet";

const smolWindow = 855;

const regIcon = L.icon({
  iconUrl: regularPin,
  iconSize: [30, 25.2],
});

const afProjIcon = L.icon({
  iconUrl: afProjPin,
  iconSize: [30, 25.2],
});

const curIcon = L.icon({
  iconUrl: activePin,
  iconSize: [30, 25.2],
});

class App extends Component {
  constructor(props) {
    super(props);
    let afmapdata = require("./data/career_paths.json");
    this.state = {
      map: null,
      currentPointOfInterest: {
        key: null,
      },
      landingLocation: {
        lat: 41.850033,
        lng: -87.6500523,
        zoom: 5,
      },
      data: afmapdata,
      jobinfovisible: false,
      instructionsVisible: true,
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

  // showJobInfoDrawer = () => {
  //   this.setState({
  //     jobinfovisible: true,
  //   });
  // };

  onJobInfoClose = () => {
    this.setState({
      jobinfovisible: false,
    });
  };

  showInstructionsDrawer = () => {
    this.setState({
      instructionsVisible: true,
    });
  };

  onInstructionsDrawerClose = () => {
    this.setState({
      instructionsVisible: false,
    });
  };

  render() {
    const position = [
      this.state.landingLocation.lat,
      this.state.landingLocation.lng,
    ];
    const params = new URLSearchParams(window.location.search.substring(1));
    const embedStatus = params.has("isEmbed");

    return (
      <Fragment>
        <Nav
          onClick={() => this.showInstructionsDrawer()}
          embedStatus={embedStatus}
        />

        <InstructionsModal
          onInstructionsDrawerClose={() => this.onInstructionsDrawerClose()}
          instructionsVisible={this.state.instructionsVisible}
        />

        {/* {(window.innerWidth < smolWindow || embedStatus === true) && (
          <InfoDrawer
            onJobInfoClose={() => this.onJobInfoClose()}
            jobinfovisible={this.state.jobinfovisible}
            currentPointOfInterest={this.state.currentPointOfInterest}
          />
        )} */}

        <InfoCard
          onSelection={this.onSelection.bind(this)}
          data={this.state.data}
          currentPointOfInterest={this.state.currentPointOfInterest}
        />

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
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a><br/> View full map <a href="https://d2dv1x1i9dq9us.cloudfront.net/index.html">here </a></div> '
          />
          {Object.keys(this.state.data).map((key, index) => {
            let currentSpot = this.state.data[key];
            let coordinates = [currentSpot["Lat"], currentSpot["Lon"]];
            return (
              <Marker
                key={key}
                position={coordinates}
                onClick={() => this.onIconClickHandler(key)}
                icon={
                  this.state.currentPointOfInterest.key === key
                    ? curIcon
                    : currentSpot["Career.Pathways.Workstream"]
                    ? afProjIcon
                    : regIcon
                }
              ></Marker>
            );
          })}
        </Map>
      </Fragment>
    );
  }
}

export default App;
