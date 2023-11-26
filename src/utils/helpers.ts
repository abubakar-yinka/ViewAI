import { DataRow } from "App";
import { User } from "interfaces/user";

export const convertUsersToDataRows = (users: User[]): DataRow[] =>
  users.map((user) => ({
    city: user.location.city,
    state: user.location.state,
    country: user.location.country,
    postcode: user.location.postcode,
    streetNumber: user.location.street.number,
    streetName: user.location.street.name,
    lat: parseFloat(user.location.coordinates.latitude),
    long: parseFloat(user.location.coordinates.longitude),
  }));
