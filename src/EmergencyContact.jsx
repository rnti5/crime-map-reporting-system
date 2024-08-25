import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { Container, ListGroup, Card } from "react-bootstrap";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsCollection = await getDocs(
        collection(db, "EmergencyContacts")
      );
      const contactsData = contactsCollection.docs.map((doc) => doc.data());
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

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
