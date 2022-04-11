import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './authContext';
import Alert from "../../shared/plugins/alert"
import axios from "../../shared/plugins/axios";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Button, Row, Card, Col, Container, Form, FormControl, Breadcrumb, InputGroup, FormGroup } from "react-bootstrap";
import img from "../../assets/img/logo-cds.png";
import FeatherIcon from "feather-icons-react";
import '../../assets/css/util.css'
import '../../assets/css/Styles.css'

export const ForgotPassword = () => {

    const navigation = useNavigate();
    const { dispatch } = useContext(AuthContext);

    return (
        <header className="App-header">
            <Container>
                <Row className='d-flex justify-content-center align-items-center'>
                    <Card style={{ width: "22rem"}}>
                        <Col className='text-center'>
                            <Card.Img 
                                variant="top"
                                className="rounded"
                                alt="logo-cds" 
                                src={img}
                            />
                        </Col>
                        <hr/>
                        <Card.Body>
                            <Card.Text>
                                <div className='text-center'>
                                    <p>¿Olvidaste tu contraseña? Solicita una nueva ingresando tu correo a continuación</p>
                                </div>
                            <Form onSubmit={console.log("Forgot")}>
                                <FormGroup>
                                    <InputGroup className='mb-3'>
                                            <FormControl
                                                id="email"
                                                type="email"
                                                placeholder='Correo electrónico'
                                                aria-label='Email...'
                                                autoComplete='off'
                                                name='email'
                                            />
                                                <InputGroup.Text>
                                                    <FeatherIcon icon="mail"/>
                                                </InputGroup.Text>
                                    </InputGroup>
                                </FormGroup>
                                <Form.Group className='form-outline mb-4'>
                                    <div className='d-grid gap-2 text-center pt-1 pb-1'>
                                        <Button 
                                            style={{ background: "#042B61", borderColor: "#042B61" }}
                                            type="submit" 
                                        >
                                            Confirmar
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Form>
                                <Link to={`/`} className={"breadcrumb-item"}>
                                    Volver al inicio de sesión
                                </Link>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </header>
    
      )
}
