import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { toast } from "react-toastify";
import Loading from "./Components/Loading";
import AddMarker from "./Components/AddMarker";
import NavbarComponent from "./NavbarComponent";
import { Form, Button } from "react-bootstrap";
import HeatmapLayer from "./Components/HeatMapLayer"; // Import HeatmapLayer component

const Home = () => {
  const [center, setCenter] = useState();
  const [addmarker, setAddmarker] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true); // State to toggle heatmap visibility

  const [name, setName] = useState("");
  const [incident, setIncident] = useState("");
  const [incidentLocation, setIncidentLocation] = useState();
  const [phone, setPhone] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false); // New state for anonymous reporting

  const [cityName, setCityName] = useState("searching...");
  const [state, setSate] = useState("searching...");
  const [description, setDescription] = useState("");

  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const currentTime = new Date();
  const time = currentTime.toLocaleTimeString("en-US");

  const [markers, setMarkers] = useState();

  const fetchCityName = async (lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=f46a8be772d9e8a8f927576bcf650eb5`
    );
    const data = await response.json();
    setCityName(data[0].name);
    setSate(data[0].state);
  };

  const getUser = () => {
    onAuthStateChanged(authentication, (currentUser) => {
      if (currentUser) {
        setName(currentUser.displayName || "Anonymous");
      } else {
        setName("Guest");
      }
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      toast.error("Allow Location To View Map");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.checked);
    if (e.target.checked) {
      setName("Anonymous");
      setPhone("Anonymous");
    } else {
      setName(""); // Optionally reset to empty, or keep the user's original name
      setPhone(""); // Optionally reset to empty
    }
  };

  const sentData = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        addDoc(collection(db, "Reported Cases"), {
          date: date,
          time: time,
          reporter: isAnonymous ? "Anonymous" : name, // Use "Anonymous" if the report is anonymous
          reporters_location: isAnonymous ? null : center, // Optionally hide the user's location
          incident: incident,
          incidentDescription: description,
          location: cityName,
          state: state,
          incidentLocation: {
            latitude: incidentLocation.lat.toFixed(2),
            longitude: incidentLocation.lng.toFixed(2),
          },
          phone: isAnonymous ? "Anonymous" : phone, // Handle phone number accordingly
        }),
        {
          pending: "Submitting Report",
          success: "Report successfully submitted",
          error: "An issue occurred, Try again!",
        }
      );
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("An error occurred while submitting the report.");
    }
  };

  const MapWithHeatmap = () => {
    const map = useMap();
    return (
      <HeatmapLayer map={map} showHeatmap={showHeatmap} showTooltip={true} />
    );
  };

  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
  };

  return (
    <div>
      {center ? (
        <>
          <div className="sidebar p-4 d-flex flex-column gap-3">
            <NavbarComponent />

            <Button onClick={toggleHeatmap}>
              {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
            </Button>

            {addmarker && (
              <Form className="h-100 bg-dark p-3 rounded-4" onSubmit={sentData}>
                <p className="text-light fw-bolder text-center gy-0 my-0 py-0">
                  {cityName.toUpperCase()}
                </p>
                <p className="text-light mb-4 text-center">{state}</p>

                <div className="d-flex gap-2 text-light">
                  <p>
                    Lat:{" "}
                    <span className="text-dark bg-light px-2 py-1 fw-bold rounded-2">
                      {incidentLocation?.lat?.toFixed(3)}
                    </span>
                  </p>
                  <p>
                    Lon:{" "}
                    <span className="text-dark bg-light px-2 py-1 fw-bold rounded-2">
                      {incidentLocation?.lng?.toFixed(3)}
                    </span>
                  </p>
                </div>
                <div className="form-container">
                  <Form.Group controlId="formAnonymous">
                    <Form.Check
                      type="checkbox"
                      label="Report Anonymously"
                      checked={isAnonymous}
                      onChange={handleAnonymousChange}
                      style={{ color: "white" }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="name">
                    <Form.Text className="text-muted">
                      Reporter's Name
                    </Form.Text>
                    <Form.Control
                      type="text"
                      placeholder={
                        isAnonymous ? "Anonymous" : "Enter your name"
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isAnonymous} // Disable if reporting anonymously
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="incidence">
                    <Form.Text className=" text-secondary">
                      Ongoing Incidence
                    </Form.Text>
                    <Form.Control
                      type="text"
                      placeholder="e.g., fire Outbreak"
                      value={incident}
                      onChange={(e) => setIncident(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="form-group text-secondary">
                    <label htmlFor="exampleFormControlTextarea1">
                      Incidence description
                    </label>
                    <textarea
                      required
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detailed description of the incident you're reporting"
                    />
                  </div>

                  <Form.Group className="mb-3 " controlId="phone">
                    <Form.Text className="text-secondary">
                      Reporter's contact
                    </Form.Text>
                    <Form.Control
                      type="tel"
                      placeholder={
                        isAnonymous ? "Anonymous" : "e.g., 0550104094"
                      }
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isAnonymous} // Disable if reporting anonymously
                      required
                    />
                  </Form.Group>
                </div>

                <div className="d-flex gap-3 mx-auto">
                  <Button variant="primary" type="submit">
                    Report
                  </Button>
                  <Button
                    variant="primary"
                    className="text-dark bg-light"
                    onClick={() => {
                      setAddmarker(false);
                      setMarkers(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </div>
          <MapContainer center={center} zoom={14} className="map-container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={center}>
              <Popup>
                <h5 className="text-primary">You're Here</h5>
              </Popup>
            </Marker>

            {showHeatmap && <MapWithHeatmap />}

            <AddMarker
              setAddmarker={setAddmarker}
              setIncidentLocation={setIncidentLocation}
              setCityName={setCityName}
              fetchCityName={fetchCityName}
              setMarkers={setMarkers}
              markers={markers}
              cityName={cityName}
            />
          </MapContainer>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
