import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

const StripeForm = props => {
  const { t } = useTranslation("common");

  const payWithStripe = async (event, props) => {
    event.preventDefault();
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    await props.stripe.createToken().then(async response => {
      try {
        let paymentResponse = await axios.post(
          "https://the-new-herald.herokuapp.com/api/v1/subscriptions",
          { stripeToken: response.token.id },
          { headers: headers }
        );
        if (paymentResponse.status === 200) {
          props.changePaymentMessage(`${t("stripe.paySuccessMess")}`);
        }
      } catch (error) {
        props.changePaymentMessage(response.error.message);
      }
    });
  };
  return (
    <>
      <h3>Buy Subscription</h3>
      <Form id="payment" onSubmit={event => payWithStripe(event, props)}>
        <div class="error field">
          <label>{t("stripe.cardNumber")}</label>
          <div className="stripe-input">
            <CardNumberElement />
          </div>
        </div>
        <div class="error field">
          <label>{t("stripe.cardExpDate")}</label>
          <div className="stripe-input">
            <CardExpiryElement />
          </div>
        </div>
        <div class="error field">
          <label>CVC</label>
          <div className="stripe-input">
            <CardCVCElement />
          </div>
        </div>
        <Button>{t("stripe.submit")}</Button>
      </Form>
      <p id="message">{props.paymentMessage}</p>
    </>
  );
};

const mapStateToProps = state => {
  return {
    paymentMessage: state.paymentMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePaymentMessage: message => {
      dispatch({ type: "CHANGE_PAYMENTMESSAGE", payload: message });
    }
  };
};

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(StripeForm)
);
