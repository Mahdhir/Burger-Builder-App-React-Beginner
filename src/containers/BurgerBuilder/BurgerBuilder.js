import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux-Hoc/Aux-Hoc'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';
import {Alert} from 'reactstrap';

class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false
        }
    }

    componentDidMount() {
        // console.log('[Burger] DID MOUNT');
        // if(this.props.userId === null || this.props.userId === undefined){
        //     console.log(this.props.history);
        //     this.props.history.replace('/');
        // }
        if(this.props.ings === '' || this.props.ings === null){
            this.props.onInitIngredients();
        }


    }


    updatePurchaseState = (ingredients) => {

        const values = Object.values(ingredients);
        let sum = 0;

        sum = values.reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum>0;

    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    // addIngredientHandler = (type) => {

    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {

    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount - 1;
    //     if (updatedCount < 0)
    //         return;

    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });

    //     this.updatePurchaseState(updatedIngredients);

    // }

    closeModal = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {

        this.props.history.push({
            pathname: '/checkout'
        });

    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = (
            <Spinner />
        );

        if(this.props.ings === ''){
            burger = (<Alert color="danger">
            <h4 className="alert-heading">Error</h4>
            <p>
              We are currently encountering a server issue. Please try again later.
            </p>
          </Alert>);
        }

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        currentPrice={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        orderClicked={this.purchaseHandler}
                        ingredients={this.props.ings}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                clicked={this.closeModal}
                purchaseContinue={this.purchaseContinueHandler}
                totalPrice={this.props.price} />;

        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.closeModal}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (name) => dispatch(burgerBuilderActions.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);