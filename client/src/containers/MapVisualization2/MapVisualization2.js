import React, { useState } from "react";
// import Video from "./Video";
import MapVisualizationComp2 from "./MapVisualizationComp2";
import data from "./GeoChart.world.geo.json";

import './styles.css';

const MapVisualization2 = () => {
  const [property, setProperty] = useState("pop_est");
  return (
    <React.Fragment>
      <MapVisualizationComp2 data={data} property={property} />
      <h2>Select property to highlight</h2>
      <select
        value={property}
        onChange={event => setProperty(event.target.value)}
      >
        <option value="pop_est">Population</option>
        <option value="name_len">Name length</option>
        <option value="gdp_md_est">GDP</option>
      </select>
      {/* <Video /> */}
    </React.Fragment>
  );
};

export default MapVisualization2;
