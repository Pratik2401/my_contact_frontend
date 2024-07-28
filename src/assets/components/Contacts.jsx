import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import swal from "sweetalert";
import api from "../utils/api";
import "./Contacts.css";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Contacts({ isLoggedIn, setisLoggedIn }) {
  const [contacts, setContacts] = useState([]);

  const updateContact = (contact) => {

    // Prompt for name
    swal({
      title: "Update Contact",
      text: "Enter the new name:",
      content: "input",
      defaultValue: contact.name,
      buttons: true,
    }).then((name) => {
      if (name) {

        swal({
          title: "Update Contact",
          text: "Enter the new email:",
          content: "input",
          defaultValue: contact.email,
          buttons: true,
        }).then((email) => {
          if (email) {

            swal({
              title: "Update Contact",
              text: "Enter the new phone number:",
              content: "input",
              defaultValue: contact.phone,
              buttons: true,
            }).then((phone) => {
              if (phone) {
                api
                  .put(`/${contact}`, {
                    name: name || contact.name,
                    email: email || contact.email,
                    phone: phone || contact.phone,
                  })
                  .then((response) => {
                    swal("Success", "Contact updated successfully!");
                    setContacts(
                      contacts.map((c) =>
                        c._id === contact._id ? response.data : c
                      )
                    );
                  })
                  .catch((error) => {
                    swal(
                      "Error",
                      error.response
                        ? error.response.data.message
                        : "Unknown error"
                    );
                  });
              }
            });
          }
        });
      }
    });
   
  };
  
  const createContact = () => {
    swal({
      title: "Create Contact",
      text: "Please enter the contact details:",
      content: {
        element: "input",
        attributes: {
          placeholder: "Name",
          type: "text",
          id: "swal-input1",
        },
      },
      buttons: {
        cancel: true,
        confirm: true,
      },
      closeOnConfirm: false,
      closeOnCancel: true,
    }).then((name) => {
      if (!name) return;
      swal({
        content: {
          element: "input",
          attributes: {
            placeholder: "Email",
            type: "text",
            id: "swal-input2",
          },
        },
        buttons: {
          cancel: true,
          confirm: true,
        },
        closeOnConfirm: false,
        closeOnCancel: true,
      }).then((email) => {
        if (!email) return;
        swal({
          content: {
            element: "input",
            attributes: {
              placeholder: "Phone",
              type: "text",
              id: "swal-input3",
            },
          },
          buttons: {
            cancel: true,
            confirm: true,
          },
          closeOnConfirm: false,
          closeOnCancel: true,
        }).then((phone) => {
          if (!phone) return;

          api
            .post("/", { name, email, phone })
            .then((response) => {
              swal("Success", "Contact created successfully!");
              setContacts([...contacts, response.data]);
            })
            .catch((error) => {
              swal(
                "Error",
                error.response ? error.response.data.message : "Unknown error"
              );
            });
        });
      });
    });

  };

  const delContact = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this contact!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`/${id}`)
          .then((response) => {
            swal("Success", "Contact deleted successfully!", "success");
            setContacts(contacts.filter((contact) => contact._id !== id));
          })
          .catch((error) => {
            swal(
              "Error",
              error.response ? error.response.data.message : "Unknown error",
              "error"
            );
          });
      }
    });
  };
  useEffect(() => {
    if (isLoggedIn) {
      const getContacts = async () => {
        try {
          const response = await api.get("/"); // Use the api instance for requests
          setContacts(response.data);
      
        } catch (error) {
          swal(
            "Error",
            error.response ? error.response.data.message : "Unknown error"
          );
          console.error(
            "There was an error!",
            error.response ? error.response.data.message : error
          );
        }
      };
      getContacts();
    }
  }, [contacts]); // Added isLoggedIn to the dependency array

  return (
    <>
      {!isLoggedIn && (
        <Container>
          <div className="grid-item d-flex justify-content-center block_info">
            <p className="brand_home">Connect Sphere</p>
            <p className="brand_slogan">You have not Logged In..</p>
            <Row className="btn_group">
              <Button className="contact_btn opt_btn" as={Link} to="/login">
                Login
              </Button>
            </Row>
          </div>
        </Container>
      )}
      {isLoggedIn && (
        <Container>
          <Row className="btn_group">
            <Button className="contact_btn opt_btn" onClick={createContact}>
              Create Contact
            </Button>
            <Button className="contact_btn opt_btn" onClick={updateContact}>
              Update Contact
            </Button>
          </Row>
          <Row className="headers">
            <Col>Sr.No</Col>
            <Col>Name</Col>
            <Col>Email</Col>
            <Col>Phone</Col>
            <Col>Update</Col>
            <Col>Delete</Col>
          </Row>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <Row key={contact} className="contact-item ">
                <Col>{index + 1}</Col>
                <Col>{contact.name}</Col>
                <Col>{contact.email}</Col>
                <Col>{contact.phone}</Col>
                <Col>
                  <Button
            
                    onClick={() => updateContact(contact._id)}
                    className="update_btn"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  </Col>
                  <Col>
                  
                  <Button
                    className="del_btn"
                    onClick={() => delContact(contact._id)}
                  >
                    {" "}
                    <i className="bi bi-trash"></i>
                  </Button>
                </Col>
              </Row>
            ))
          ) : (
            <Row>
              <Col>Contacts Not Found</Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
}
