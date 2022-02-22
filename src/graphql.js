import { gql } from "@apollo/client";

export const ALL_STATIONS = gql`
  query {
    stations {
      name
      lat
      lon
      zoneId
      vehicleMode
      id
      gtfsId
    }
  }
`;

export const ALL_CARPARKS = gql`
  query {
    carParks {
      name
      spacesAvailable
      maxCapacity
      realtime
      lon
      lat
      id
    }
  }
`;

export const ALL_ROUTES = gql`
  query {
    routes {
      longName
      id
      stops {
        name
        gtfsId
        lat
        lon
      }
    }
  }
`;

export const STATION_INFO = gql`
  query ($id: String!) {
    station(id: $id) {
      name
      vehicleMode
      zoneId
      stoptimesForPatterns {
        pattern {
          name
          stops {
            name
          }
        }
        stoptimes {
          scheduledArrival
        }
      }
    }
  }
`;

export const YOUR_TRIP = gql`
  query ($fromlat: Float!, $fromlon: Float!, $tolat: Float!, $tolon: Float!) {
    plan(
      from: { lat: $fromlat, lon: $fromlon }
      to: { lat: $tolat, lon: $tolon }
    ) {
      itineraries {
        duration
        fares {
          type
          cents
          components {
            fareId
          }
        }
        legs {
          mode
          from {
            name
            lat
            lon
            stop {
              name
            }
          }
          to {
            name
            lat
            lon
          }
          trip {
            gtfsId
            routeShortName
          }
        }
      }
    }
  }
`;
