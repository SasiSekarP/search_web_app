import { BsSearch } from "react-icons/bs";
import { useState } from "react";

import "./App.css";

function App() {
  const [searchitem, setsearchitem] = useState("");
  const [searchresponsearr, setsearchresponsearr] = useState([]);
  const updatevalue = (e) => {
    e.preventDefault();
    setsearchitem(e.target.value);
  };

  const handlesearch = async () => {
    const key = "AIzaSyBHrsIxYw_Cl7unc9b-aU3m0vFiYL81aOo";
    const searchengineID = "e01fb3cb9ba694a26";
    const url = `https://www.googleapis.com/customsearch/v1?q=${searchitem}&key=${key}&cx=${searchengineID}`;
    const response = await fetch(url);
    const data = await response.json();
    const arrData = await data.items.slice(0, 5);
    setsearchresponsearr(arrData);
  };
  return (
    <div className="container">
      <div className="searchContainer">
        <input
          placeholder="Enter to search"
          value={searchitem}
          onChange={(e) => {
            updatevalue(e);
          }}
        />
        <button className="searchbtn" type="button" onClick={handlesearch}>
          <BsSearch />
        </button>
      </div>
      {searchresponsearr.length > 0 && (
        <div className="displayContainer">
          {searchresponsearr.map((singledata, index) => {
            return (
              <div key={index} className="card">
                <h2
                  className="headeratag"
                  href={singledata.link}
                  target="_blank"
                >
                  {singledata.title}
                </h2>
                <div
                  href={singledata.link}
                  target="_blank"
                  className="displaylink"
                >
                  {singledata.displayLink}
                </div>
                <div>{singledata.snippet}</div>
              </div>
            );
          })}
        </div>
      )}
      {searchresponsearr.length > 0 || (
        <div className="alternatedisplayContainer">
          <h3>Result will be display here</h3>
          <div>
            <img
              className="globeImg"
              src="https://images.squarespace-cdn.com/content/v1/59b037304c0dbfb092fbe894/1534783597275-LVKGWMI2L4EK1Y3AMHY9/basemap_rotating_globe.gif"
              alt="globe"
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
