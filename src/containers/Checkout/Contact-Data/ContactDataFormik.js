import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card, CardBody, CardTitle, Col, Row, Form, FormGroup, Label, Input, Modal
    , FormFeedback
} from 'reactstrap';
import './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import instance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Notifier from '../../../helpers/NotificationService/Notifier';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import * as burgerBuilderActions from '../../../store/actions/index';



const SignupSchema = Yup.object().shape({
    customer: Yup.object().shape({

        name: Yup.string()
            .min(2)
            .max(50)
            .required(),

        email: Yup.string()
            .email()
            .required(),

        address: Yup.object().shape({

            street: Yup.string()
                .min(2)
                .required(),

            country: Yup.string()
                .min(2)
                .required(),

            city: Yup.string()
                .min(2)
                .required(),

            postalCode: Yup.string()
                .min(5)
                .required()
        })
    }),

    deliveryMethod: Yup.string()
        .required()

});

class ContactDataFormik extends Component {
    state = {
        loading: false
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        if (this.props.token === null || this.props.token === undefined) {
            this.props.history.replace('/');
        } else {
            this.scrollToBottom();

        }
    }


    orderHandler = (formValues) => {
        console.log(formValues);
        const order = {
            ...formValues,
            ingredients: this.props.ings,
            userId:this.props.userId,
            price: this.props.price.toFixed(2)
        }
        console.log(order);
        this.setState({
            loading: true
        });

        instance.post('/orders.json?auth=' + this.props.token, order).then(
            res => {
                console.log(res);
                this.setState({
                    loading: false
                });
                this.props.onInitIngredients();
                Notifier.addNotification('Successful', 'Order Placed', 'success');
                this.props.history.push('/burger');
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

    render() {
        return (
            <div className="Contact-Container">
                <Modal isOpen={this.state.loading}>
                    <Spinner />
                </Modal>
                <Card>
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                    <CardBody>
                        <CardTitle>
                            <h5>Enter Your Contact Data</h5>
                        </CardTitle>

                        <Formik
                            initialValues={{
                                customer: {
                                    name: '',
                                    email: '',
                                    address: {
                                        street: '',
                                        city: '',
                                        country: '',
                                        postalCode: ''
                                    }
                                },
                                deliveryMethod: 'Fastest'
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={values => {
                                this.orderHandler(values);
                            }}
                        >
                            {({ values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting }) => (

                                    <Form onSubmit={handleSubmit}>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="customer.name">Name</Label>
                                                    <Input
                                                        invalid={getIn(errors, 'customer.name') && getIn(touched, 'customer.name')}
                                                        type="text" name="customer.name" id="customer.name"
                                                        placeholder="Name"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <FormFeedback>Oops name is required</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="customer.email">Email</Label>
                                                    <Input
                                                        invalid={getIn(errors, 'customer.email') && getIn(touched, 'customer.email')}
                                                        type="text" name="customer.email" id="customer.email"
                                                        placeholder="Email"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <FormFeedback>Oops email is required</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="customer.address.street">Street</Label>
                                                    <Input
                                                        invalid={getIn(errors, 'customer.address.street') && getIn(touched, 'customer.address.street')}
                                                        type="text" name="customer.address.street" id="customer.address.street"
                                                        placeholder="Street.."
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <FormFeedback>Oops street is required</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="customer.address.city">City</Label>
                                                    <Input
                                                        invalid={getIn(errors, 'customer.address.city') && getIn(touched, 'customer.address.city')}
                                                        type="text" name="customer.address.city" id="customer.address.city"
                                                        placeholder="City"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <FormFeedback>Oops city is required</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="customer.address.postalCode">Postal Code</Label>
                                                    <Input
                                                        invalid={getIn(errors, 'customer.address.postalCode') && getIn(touched, 'customer.address.postalCode')}
                                                        type="text" name="customer.address.postalCode" id="customer.address.postalCode"
                                                        placeholder="Postal Code"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <FormFeedback>Oops postal code is required</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="customer.address.country">Country</Label>
                                                    <Input
                                                        invalid={getIn(errors, 'customer.address.country') && getIn(touched, 'customer.address.country')}
                                                        type="text" name="customer.address.country" id="customer.address.country"
                                                        placeholder="Country"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <FormFeedback>Oops country is required</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <Label for="deliveryMethod">Delivery Method</Label>
                                                <Input type="select" name="deliveryMethod" id="deliveryMethod"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}>
                                                    <option>Fastest</option>
                                                    <option>Cheapest</option>
                                                </Input>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md={{ size: 6, offset: 5 }}>
                                                <Button type="submit" btnType="Success" disabled={isSubmitting}>Order</Button>
                                            </Col>
                                        </Row>
                                    </Form>

                                )}
                        </Formik>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        token: state.auth.idToken,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDataFormik);