import React, { Component } from 'react';
import { Modal,Form, FormGroup, FormFeedback, Label, Input,InputGroup,InputGroupAddon, Row, Col, Card, CardBody, Button } from 'reactstrap';
import Logo from '../../components/UI/Logo/Logo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../../components/UI/Spinner/Spinner';

const Auth_Schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required()
});
class Auth extends Component {

    state = {
        signIn: true,
        passwordShow:false
    };

    componentDidUpdate(){
        if(this.props.userId !== null && this.props.userId !== undefined){
            console.log(this.props.history);
            this.props.history.replace('/burger');
        }
    }

    componentDidMount(){
        if(this.props.userId !== null && this.props.userId !== undefined){
            console.log(this.props.history);
            this.props.history.replace('/burger');
        }
    }


    switchMethodHandler = () => {
        this.setState((prevState) => ({
            signIn: !prevState.signIn
          }));
    }

    passwordShowHandler = () => {
        this.setState((prevState) => ({
            passwordShow: !prevState.passwordShow
          }));
    }


    render() {
        return (
            <div className="Auth">
                <Modal isOpen={this.props.loading}>
                    <Spinner />
                </Modal>
                <Row>
                    <Col sm={0} md={3}>
                    </Col>
                    <Col sm={12} md={6}>
                        <Card>
                            <CardBody>
                                <div className="Auth-Container">
                                    <div className="Auth-Logo">
                                        <Logo />
                                    </div>
                                </div>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: ''
                                    }}
                                    validationSchema={Auth_Schema}
                                    onSubmit={values => {

                                        console.log(values)
                                        this.props.onAuth(values.email, values.password,this.state.signIn);
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
                                                <h4>Authentication</h4>
                                                <FormGroup>
                                                    <Label for="exampleEmail">Email</Label>
                                                    <Input invalid={errors.email && touched.email} type="email" name="email" id="exampleEmail"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <FormFeedback>Oops email is required</FormFeedback>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="examplePassword">Password</Label>
                                                    <InputGroup>
                                                        <Input invalid={errors.password && touched.password} 
                                                        type={this.state.passwordShow?'text':'password'} name="password" id="examplePassword"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <Button outline color="secondary" size="sm" onClick={this.passwordShowHandler}>
                                                            <FontAwesomeIcon 
                                                            icon={this.state.passwordShow?faEyeSlash:faEye}/>
                                                        </Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                    
                                                    <FormFeedback>Wohoo password is not suitable</FormFeedback>
                                                </FormGroup>
                                                <Row>
                                                    <Col md={5}>
                                                        <Button type="submit" className="Auth-Btn">
                                                        {this.state.signIn?' Sign In':' Sign Up'}</Button>

                                                    </Col>
                                                    <Col md={7}>
                                                        <Button type="button" 
                                                        onClick={this.switchMethodHandler}>Switch to 
                                                        {this.state.signIn?' Sign Up':' Sign In'}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password,signInBool) => { 
            let type = signInBool?'signin':'signup';
            dispatch(actions.auth(email, password,type)); 
        }
    }
}

const mapStateToProps = (state) => {

    return {
        loading:state.auth.loading,
        token:state.auth.idToken,
        userId:state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);