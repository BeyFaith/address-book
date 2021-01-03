import React, { useState,useEffect } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./ContactForm.scss";

const ContactForm = ({ contactList, setContactList, addContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  console.log(id)
  useEffect(() => {
    fetch(`http://localhost:5000/api/contacts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        
        setName(data.comment.name)
        setNumber(data.comment.number)
      });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(id){
      fetch(`http://localhost:5000/api/contacts/${id}`, {
     
      method: "PUT",
      body: JSON.stringify({ name, number }),
      headers: {
        accept: "application/json, text/plain",
        "content-Type": "application/json",
      },
      
    })
      .then((res) => res.json())
      .then((data) => {window.location="/"});
    }else{
      fetch("http://localhost:5000/api/create", {
     
      method: "POST",
      body: JSON.stringify({ name, number }),
      headers: {
        accept: "application/json, text/plain",
        "content-Type": "application/json",
      },
      
    })
      .then((res) => res.json())
      .then((data) => {window.location="/"});
    }
    
  };

  return (
    <div className="contactForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type="name"
              name="contact-name"
              placeholder="Enter contact name..."
              className="bey"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="number" sm={2}>
            Number
          </Label>
          <Col sm={10}>
            <Input
              type="name"
              name="contact-number"
              placeholder="Enter phone number..."
              className="bey"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button className="btn-submit">{id?"Update":"Add Contact"}</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default ContactForm;
