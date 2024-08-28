import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import {
  Container,
  Spinner,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Pagination,
  Card, // Import the Card component here
} from "react-bootstrap";
import { FaFileExcel, FaMapMarkerAlt } from "react-icons/fa";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import localizedFormat from "dayjs/plugin/localizedFormat";
import KPICard from "./Components/KPICard"; // Import KPICard component
import ReportTable from "./Components/ReportTable"; // Import ReportTable component

dayjs.extend(isBetween);
dayjs.extend(localizedFormat);

const ReportDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [monthReports, setMonthReports] = useState(0);
  const [weekReports, setWeekReports] = useState(0);
  const [topLocation, setTopLocation] = useState("");
  const [topLocationCount, setTopLocationCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsCollection = await getDocs(
          collection(db, "Reported Cases")
        );
        const reportsData = reportsCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const now = dayjs();
        const startOfWeek = now.startOf("week");
        const startOfMonth = now.startOf("month");

        let monthCount = 0;
        let weekCount = 0;
        const locationCounts = {};

        reportsData.forEach((report) => {
          const reportDate = dayjs(report.date, "dddd, MMM D, YYYY");

          if (reportDate.isBetween(startOfMonth, now, null, "[]")) {
            monthCount++;
          }

          if (reportDate.isBetween(startOfWeek, now, null, "[]")) {
            weekCount++;
          }

          const location = report.location || "Unknown Location";
          if (locationCounts[location]) {
            locationCounts[location]++;
          } else {
            locationCounts[location] = 1;
          }
        });

        const topLocationEntry = Object.entries(locationCounts).reduce(
          (a, b) => (b[1] > a[1] ? b : a),
          ["Unknown", 0]
        );

        setMonthReports(monthCount);
        setWeekReports(weekCount);
        setTopLocation(topLocationEntry[0]);
        setTopLocationCount(topLocationEntry[1]);

        setReports(reportsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.incident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.incidentDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleExportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(filteredReports);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
      XLSX.writeFile(workbook, "Crime_Reports.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="my-5"
      style={{
        backgroundColor: "#f0f2f5",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          paddingBottom: "15px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <Container>
          <Row className="mb-4">
            <Col>
              <h4
                className="mb-4 text-center"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                Reported Crimes Dashboard
              </h4>
            </Col>
          </Row>

          {/* KPI Cards Section */}
          <Row className="mb-4">
            <Col md={3}>
              <KPICard
                title="Total Reports"
                value={reports.length}
                style={{
                  background: "linear-gradient(45deg, #ff9966, #ff5e62)",
                  color: "#fff",
                }}
              />
            </Col>
            <Col md={3}>
              <KPICard
                title="Reports This Month"
                value={monthReports}
                style={{
                  background: "linear-gradient(45deg, #00c6ff, #0072ff)",
                  color: "#fff",
                }}
              />
            </Col>
            <Col md={3}>
              <KPICard
                title="Reports This Week"
                value={weekReports}
                style={{
                  background: "linear-gradient(45deg, #a8ff78, #78ffd6)",
                  color: "#212529",
                }}
              />
            </Col>
            <Col md={3}>
              <KPICard
                title="Top Location"
                value={topLocation}
                subtitle={`${topLocationCount} reports`}
                icon={<FaMapMarkerAlt className="me-2" />}
                style={{
                  background: "linear-gradient(45deg, #ff9966, #ff5e62)",
                  color: "#fff",
                }}
              />
            </Col>
          </Row>

          {/* Search and Export Section */}
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup>
                <FormControl
                  placeholder="Search reports"
                  aria-label="Search reports"
                  aria-describedby="search-icon"
                  onChange={handleSearch}
                  className="rounded-pill"
                  style={{
                    borderColor: "#0072ff",
                    boxShadow: "0 2px 5px rgba(0, 114, 255, 0.5)",
                  }}
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Button
                variant="success"
                className="w-100 rounded-pill"
                onClick={handleExportToExcel}
                style={{
                  background: "linear-gradient(45deg, #00b09b, #96c93d)",
                  borderColor: "#00b09b",
                  color: "#fff",
                  boxShadow: "0 2px 5px rgba(0, 176, 155, 0.5)",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <FaFileExcel className="me-2" />
                Export to Excel
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Spacer for Fixed Header */}
      <div style={{ height: "350px" }}></div>

      {/* Data Table Section */}
      <Row>
        <Col>
          <Card
            className="shadow-sm border-0"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              transition: "transform 0.3s ease-in-out",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Card.Body>
              <ReportTable reports={currentReports} />
              <Pagination className="justify-content-center mt-4">
                <Pagination.Prev
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Pagination.Prev>
                {[
                  ...Array(Math.ceil(filteredReports.length / reportsPerPage)),
                ].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredReports.length / reportsPerPage)
                  }
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDashboard;
