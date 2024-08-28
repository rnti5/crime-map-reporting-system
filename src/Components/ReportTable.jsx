import React from "react";
import { Table } from "react-bootstrap";

const ReportTable = ({ reports }) => (
  <Table striped bordered hover responsive className="rounded-3">
    <thead
      style={{
        background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      <tr>
        <th>ID</th>
        <th>Reporter</th>
        <th>Incident</th>
        <th>Description</th>
        <th>Location</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      {reports.map((report) => (
        <tr key={report.id}>
          <td>{report.id}</td>
          <td>{report.reporter}</td>
          <td>{report.incident}</td>
          <td>{report.incidentDescription}</td>
          <td>
            {report.location}, {report.state}
          </td>
          <td>{report.date}</td>
          <td>{report.time}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ReportTable;
