import "./../index.css";

function Route({ route, FaPlus, setRoute, viewport, setViewport }) {
  return (
    <div className="singlestation">
      <h2 className="stationname">{route.longName}</h2>
      <div
        className="plusicon"
        onClick={(e) => {
          e.preventDefault();
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
  return (
    <div>
      <form className="filtersearch">
        {FaSearch}
        <div>
          <input className="searchinput" />
        </div>
      </form>
      <nav className="stationslist">
        <div>
          {allRoutes.map((r) => (
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
