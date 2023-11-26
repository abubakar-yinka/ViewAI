import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Card from "@material-ui/core/Card";
import "./App.css";
import { useUsers } from "hooks/useUsers";
import { convertUsersToDataRows } from "utils/helpers";

type AppProps = {};

export interface DataRow {
  city: string;
  state: string;
  country: string;
  postcode: number;
  streetNumber: number;
  streetName: string;
  lat: number;
  long: number;
}

const App: React.FC<AppProps> = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { users, loading } = useUsers(rowsPerPage);

  const columns: TableColumn<DataRow>[] = React.useMemo(
    () => [
      {
        name: "City",
        selector: (row) => row.city,
        sortable: true,
      },
      {
        name: "State",
        selector: (row) => row.state,
        sortable: true,
      },
      {
        name: "Country",
        selector: (row) => row.country,
        sortable: true,
      },
      {
        name: "Postcode",
        selector: (row) => row.postcode,
        sortable: true,
      },
      {
        name: "Street Number",
        selector: (row) => row.streetNumber,
        sortable: true,
      },
      {
        name: "Street Name",
        selector: (row) => row.streetName,
        sortable: true,
      },
      {
        name: "Latitude",
        selector: (row) => row.lat,
        sortable: true,
      },
      {
        name: "Longitude",
        selector: (row) => row.long,
        sortable: true,
      },
    ],
    []
  );

  return (
    <div className="App">
      <h1>ViewAI - Frontend Assessment</h1>
      <Card>
        <DataTable
          title="Location of Users"
          progressPending={loading}
          columns={columns}
          data={convertUsersToDataRows(users)}
          pagination
          paginationServer
          defaultSortFieldId={1}
          selectableRows
          onChangeRowsPerPage={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
        />
      </Card>
    </div>
  );
};

export default App;
