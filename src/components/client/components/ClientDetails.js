import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
// import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
// import axios from "../../../../shared/plugins/axios";


export const ClientDetails = ({ 
  isOpenDetails, 
  handleClose, 
  setClients, 
  name,
  surname,
  secondSurname,
  company,
  typeClient,
  status
}) => {

    const [values, setValues] = useState({name: name, surname: surname, secondSurname:secondSurname, company: company, typeClient: typeClient, status: status});

    const handleChange = (event) =>{
      const { name, value } = event.target;
      setValues({ ...values, [name]: value});
    }  

    // const handleSubmit = (event) =>{
    //   event.preventDefault();
    //   console.log(values);
    //   Alert.fire({
    //   title: titleConfirmacion,
    //   text: msjConfirmacion,
    //   confirmButtonText: "Aceptar",
    //   cancelButtonText: "Cancelar",
    //   showCancelButton: true,
    //   reverseButtons: true,
    //   showLoaderOnConfirm: true,
    //   icon: "warning",
    //   preConfirm: () => {
    //     return axios({
    //       url: "/category/",
    //       method: "PUT",
    //       data: JSON.stringify(values),
    //     })
    //       .then((response) => {
    //         console.log(response);
    //         if (!response.error) {
    //           setCategories((categories) => [
    //             ...categories.filter((it) => it.id !== values.id),
    //             values,
    //           ]);
    //           handleCloseForm();
    //           Alert.fire({
    //             title: titleExito,
    //             text: msjExito,
    //             icon: "success",
    //             confirmButtonText: "Aceptar",
    //           });
    //         }
    //         return response;
    //       })
    //       .catch((error) => {
    //         Alert.fire({
    //           title: titleError,
    //           confirmButtonColor: "#198754",
    //           text: msjError,
    //           icon: "error",
    //           confirmButtonText: "Aceptar",
    //         });
    //       });
    //   },
    //   backdrop: true,
    //   allowOutsideClick: !Alert.isLoading,
    //   });
    // };

    const handleCloseForm = () =>{
      handleClose(false);
      setValues({});
    };

    useEffect(() => {
      setValues({
        name: name,
        surname: surname,
        secondSurname: secondSurname,
        company: company,
        typeClient: typeClient
      });
    }, [name, surname, secondSurname, company, typeClient]);
  
    return (
      <>
      <Modal show={isOpenDetails} onHide={handleCloseForm}>
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Detalles del cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row">
            <Form.Group className="col-md-6">
              <Form.Label className="form-label">Nombre</Form.Label>
              <Form.Control
                name="name"
                placeholder="Nombre"
                value={values.name}
                onChange={handleChange}
                readOnly
              />
      
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label className="form-label">Primer apellido</Form.Label>
              <Form.Control
                name="surname"
                placeholder="Primer apellido"
                value={values.surname}
                onChange={handleChange}
                readOnly
              />
              
            </Form.Group>
            <Form.Group className="col-md-6 topBottom">
              <Form.Label className="form-label">Segundo apellido</Form.Label>
              <Form.Control
                name="secondSurname"
                placeholder="Segundo apellido"
                value={values.secondSurname}
                onChange={handleChange}
                readOnly
              />
              
            </Form.Group>
            <Form.Group className="col-md-6 topBottom">
              <Form.Label className="form-label">Empresa</Form.Label>
              <Form.Control
                name="company"
                placeholder="Nombre del proyecto"
                value={values.company}
                onChange={handleChange}
                readOnly
              />
              
            </Form.Group>
            <Form.Group className="col-md-6 topBottom">
              <Form.Label className="form-label">Tipo de cliente</Form.Label>
              <Form.Control
                name="typeClient"
                placeholder="Nombre del proyecto"
                value={values.typeClient}
                // value={values.typeClient?.description}
                onChange={handleChange}
                readOnly
              />
              
            </Form.Group>
            <br/>
            <Form.Group className="md-4">
              <Row>
                <Col className="text-end">
                  <Button variant="secondary" type="button" onClick={handleCloseForm}>
                    Cerrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      </>
    );
  };