import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './authContext';
import Alert from "../../shared/plugins/alert"
import axios from "../../shared/plugins/axios";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Button, Row, Card, Container, Form, FormControl, Breadcrumb, InputGroup, FormGroup } from "react-bootstrap";
import img from "../../assets/img/logo-cds.png";
import FeatherIcon from "feather-icons-react";
import '../../assets/css/util.css'
import '../../assets/css/Styles.css'

export const RecoverPassword = () => {

    const navigation = useNavigate();
    const { dispatch } = useContext(AuthContext);

    return (
        <header className="App-header">
            <Container class="py-5 h-100">
                <Row className='d-flex justify-content-center align-items-center h-100'>
                    <Card style={{ width: "22rem"}}>
                        <div className='text-center'>
                            <Card.Img 
                                variant="top"
                                style={{ 
                                        width: "60%",
                                    }}
                                className="rounded"
                                alt="logo-cds" 
                                src={img}
                            />
                        </div>
                        <hr/>
                        <Card.Body>
                            <Card.Text>
                                <div className='text-center'>
                                    <p>Ingresa el código que llegó a tu correo electrónico</p>
                                </div>
                            <Form onSubmit={console.log("HOLA")}>
                                <FormGroup>
                                    <InputGroup className='mb-3'>
                                            <FormControl
                                                id="code"
                                                type="email"
                                                placeholder='Código'
                                                aria-label='Code...'
                                                autoComplete='off'
                                                name='code'
                                            />
                                           
                                                <InputGroup.Text>
                                                    <FeatherIcon icon="mail"/>
                                                </InputGroup.Text>
                                    </InputGroup>
                                </FormGroup>
                                <div className='text-center'>
                                    <p>Ingrese su nueva contraseña en los siguientes campos</p>
                                </div>
                                <InputGroup className='mb-3'>
                                        <FormControl
                                            id="newPassword"
                                            type="password"
                                            placeholder='Nueva Contraseña'
                                            aria-label='constraseña'
                                            autoComplete='off'
                                            name='password'
                                        />
                                            <InputGroup.Text>
                                                <FeatherIcon icon="lock"/>
                                            </InputGroup.Text>
                                </InputGroup>
                                <InputGroup className='mb-3'>
                                        <FormControl
                                            id="confNewPassword"
                                            type="password"
                                            placeholder='Confirmar Contraseña'
                                            aria-label='constraseña'
                                            autoComplete='off'
                                            name='password'
                                        />
                                            <InputGroup.Text>
                                                <FeatherIcon icon="lock"/>
                                            </InputGroup.Text>
                                </InputGroup>
                                <Form.Group className='form-outline mb-4'>
                                    <div className='d-grid gap-2 text-center pt-1 pb-1'>
                                        <Button 
                                            variant='primary'
                                            className='btn back-blue font-white btn-block'
                                            type="submit" 
                                        >
                                            Cambiar Contraseña
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <script src="../../plugins/jquery/jquery.min.js"></script>
                <script src="../../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
                <script src="../../dist/js/adminlte.min.js"></script>
            </Container>
        </header>
    
      )
}
