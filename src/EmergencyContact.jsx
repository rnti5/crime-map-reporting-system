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
          collection(db, "EmergencyContacts")
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
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Emergency Contacts</h4>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {contacts.map((contact, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
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
  );
};

export default EmergencyContacts;
