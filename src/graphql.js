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
