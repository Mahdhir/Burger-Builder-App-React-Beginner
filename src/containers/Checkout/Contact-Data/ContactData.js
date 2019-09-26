import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Col, Row, Form, FormGroup, Label, Input, Modal
    ,FormFeedback } from 'reactstrap';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import instance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Notifier from '../../../helpers/NotificationService/Notifier';



class ContactData extends Component {
    state = {
        form:{
            name: {
                value:'',
                touched:false,
                valid:false
            },
            email: {
                value:'',
                touched:false,
                valid:false
            },
            street: {
                value:'',
                touched:false,
                valid:false
            },
            postalCode: {
                value:'',
                touched:false,
                valid:false
            },
            city: {
                value:'',
                touched:false,
                valid:false
            },
            country: {
                value:'',
                touched:false,
                valid:false
            },
            deliveryMethod:{
                value:'Fastest',
                touched:true,
                valid:true
            },   
        },
        loading: false
    }

    formErrorHandler = (formObj) =>{
        let error = true;
        for(let key in formObj){
            console.log(key);
            const obj = formObj[key];
            error = !obj.valid;
            if(error)
            break
        }
        return error;
    }

    orderHandler = (event) => {
        event.preventDefault();
        let form = this.state.form;
        const errorStatus = this.formErrorHandler(form);
        if(errorStatus){
            Notifier.addNotification('Error','You have incorrectly filled the form','danger');
            return;
        }
        this.setState({
            loading: true
        });
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: form.name.value,
                address: {
                    street: form.street.value,
                    country: form.country.value,
                    postalCode:form.postalCode.value
                },
                email: form.email.value
            },
            deliveryMethod: form.deliveryMethod.value
        };
        instance.post('/orders.json', order).then(
            res => {
                console.log(res);
                this.setState({
                    loading: false
                });
                Notifier.addNotification('Successful', 'Order Placed', 'success');
                this.props.history.push('/');
            }
        ).catch(
            err => {
                console.log(err);
                this.setState({
                    loading: false
                });
                Notifier.addNotification('Failure', 'Order Failed', 'danger');
            }
        );
    }

    changeHandler = (event, identifier) => {
        let value = event.target.value;
        const obj = {
            ...this.state.form[identifier]
        };
        obj.touched = true;
        if(value !== null && value !== ''){
            obj.value = value;
            obj.valid=true;
            if(identifier==='email'){
                let validity = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                if(validity===null){
                    obj.valid=false;
                }
            }   
        } else{
            obj.valid=false;
            obj.value = '';
        } 
        const form = {
            ...this.state.form
        };
        form[identifier]=obj;
        this.setState({
            form:form
        });
    }

    render() {
        return (
            <div className="Contact-Container">
                <Modal isOpen={this.state.loading}>
                    <Spinner />
                </Modal>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h5>Enter Your Contact Data</h5>
                        </CardTitle>
                        <Form onSubmit={this.orderHandler}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input invalid={!this.state.form.name.valid && this.state.form.name.touched} type="text" name="name" id="name" placeholder="with a placeholder" onChange={(event) => this.changeHandler(event, 'name')} />
                                        <FormFeedback>Oops name is required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input invalid={!this.state.form.email.valid  && this.state.form.email.touched} type="email" name="email" id="email" placeholder="with a placeholder" onChange={(event) => this.changeHandler(event, 'email')} />
                                        <FormFeedback>Oops email is required</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="street">Street</Label>
                                        <Input invalid={!this.state.form.street.valid && this.state.form.street.touched}  type="text" name="street" id="street" placeholder="with a placeholder" onChange={(event) => this.changeHandler(event, 'street')} />
                                        <FormFeedback>Oops street is required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="city">City</Label>
                                        <Input invalid={!this.state.form.city.valid && this.state.form.city.touched} type="text" name="city" id="city" placeholder="with a placeholder" onChange={(event) => this.changeHandler(event, 'city')} />
                                        <FormFeedback>Oops city is required</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="postal">Postal Code</Label>
                                        <Input invalid={!this.state.form.postalCode.valid && this.state.form.city.touched} type="text" name="postal" id="postal" placeholder="with a placeholder" onChange={(event) => this.changeHandler(event, 'postalCode')} />
                                        <FormFeedback>Oops postal is required</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                <FormGroup>
                                        <Label for="country">Country</Label>
                                        <Input invalid={!this.state.form.country.valid && this.state.form.country.touched} type="text" name="country" id="country" placeholder="with a placeholder" onChange={(event) => this.changeHandler(event, 'country')} />
                                        <FormFeedback>Oops country is required</FormFeedback>
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <Label for="select">Delivery Method</Label>
                                    <Input type="select" name="select" id="select" onChange={(event) => this.changeHandler(event, 'deliveryMethod')}>
                                        <option>Fastest</option>
                                        <option>Cheapest</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="12" md={{ size: 6, offset: 5 }}>
                                    <Button type="submit" btnType="Success" clicked={this.orderHandler}>Order</Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ContactData;