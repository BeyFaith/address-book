import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toast, ToastHeader, ToastBody, Button, Col, Row } from "reactstrap";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts([...data.contacts]);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/contacts/${id}`, {
     
      method: "DELETE",
      headers: {
        accept: "application/json, text/plain",
        "content-Type": "application/json",
      },
      
    })
      .then((res) => res.json())
      .then((data) => {window.location.reload()});
  }
  return (
    <div className="contactList">
      {contacts.map((contact, index) => (
        <div key= {contact.id} className="p-2 bg-warning my-12 rounded">
          <Toast>
            <ToastHeader>
              <Row>
                <Col md={8}>{contact.name}</Col>
                <Col md={4}>
                  <Row>
                    <Col md={6}>
                      <Link to={`/add?id=${contact.id}`}>
                      <Button color="primary" size="sm" active style={{marginRight:"70px"}}>
                      Edit
                    </Button>
                      </Link>
                    </Col>
                    <Col md={6}>
                      <Button color="danger" size="sm" active onClick = {()=> handleDelete(contact.id)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ToastHeader>
            <ToastBody style={{ textAlign: "center" }}>
              <p>{contact.name}</p>
              <p>{contact.number}</p>
            </ToastBody>
          </Toast>
        </div>
      ))}
      <Link to="/add">
        <Button color="info" size="lg" active style={{marginLeft:"40%", marginTop:"20px"}}>
          Add new Contact
        </Button>{" "}
      </Link>
    </div>
  );
};

export default ContactList;
