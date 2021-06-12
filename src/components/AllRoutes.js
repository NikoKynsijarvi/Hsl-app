import "./../index.css";
import React, { useState } from "react";

function Route({ route, FaPlus, setRoute, viewport, setViewport }) {
  return (
    <div className="singlestation">
      <h2 className="stationname">{route.longName}</h2>
      <div
        className="plusicon"
        onClick={(e) => {
          e.preventDefault();
          setViewport({
            ...viewport,
            latitude: route.stops[0].lat,
            longitude: route.stops[0].lon,
            zoom: 12,
          });
          setRoute(route);
        }}
      >
        {FaPlus}
      </div>
    </div>
  );
}

function AllRoutes({
  allRoutes,
  FaSearch,
  FaPlus,
  setRoute,
  viewport,
  setViewport,
}) {
  const [search, setSearch] = useState("");

  const searchedRoutes = allRoutes.filter((element) => {
    const routeName = element.longName;
    return routeName.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div className="allroutecontainer">
      <form className="filtersearch">
        {FaSearch}
        <div>
          <input
            className="searchinput"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </form>
      <nav className="allrouteslist">
        <div>
          {searchedRoutes.map((r) => (
            <ul key={r.id}>
              <Route
                key={r.id}
                route={r}
                FaPlus={FaPlus}
                setRoute={setRoute}
                viewport={viewport}
                setViewport={setViewport}
              ></Route>
            </ul>
          ))}
        </div>
      </nav>
    </div>
  );
}
export default AllRoutes;
