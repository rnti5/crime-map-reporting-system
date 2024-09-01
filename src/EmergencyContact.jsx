import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { Container, ListGroup, Card, Spinner, Alert } from "react-bootstrap";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsCollection = await getDocs(
          collection(db, "EmergencyContact")
        );
        const contactsData = contactsCollection.docs.map((doc) => doc.data());
        setContacts(contactsData);
      } catch (err) {
        setError("Failed to load contacts. Please try again later.");
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (contacts.length === 0) {
    return (
      <Container className="my-4">
        <Alert variant="info">No emergency contacts available.</Alert>
      </Container>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1687157829884-fae305709c06?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGVtZXJnZW5jeXxlbnwwfHwwfHx8MA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container style={{ maxWidth: "600px", width: "100%" }}>
        <Card
          className="shadow-sm"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
            color: "#fff", // White text color
          }}
        >
          <Card.Header
            style={{
              backgroundColor: "rgba(0, 123, 255, 0.8)", // Semi-transparent blue background for the header
              color: "#fff",
            }}
          >
            <h4 className="mb-0 text-center">Emergency Contacts</h4>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {contacts.map((contact, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // Light semi-transparent background for list items
                    color: "#fff", // White text color
                    borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Light border for separation
                  }}
                >
                  <span>
                    <strong>{contact.name}</strong>
                  </span>
                  <span>{contact.emergencyNumber}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EmergencyContacts;
