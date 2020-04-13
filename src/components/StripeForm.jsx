import React, { useState, useEffect} from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import { Button, Form, Icon } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import auth from "../modules/auth";

const StripeForm = props => {
  const { t } = useTranslation("common");
  const [user, setUser] = useState("")

  const payWithStripe = async (event, props) => {
    event.preventDefault();
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let register;
    if (headers === null) {
      await auth
      .signUp({
        email: event.target.email.value,
        password: event.target.password.value
      })
      .then(userDatas => {
        headers = userDatas.headers
        register = userDatas.status
      })
      .catch(error => {
        props.changeAuthMessage(error.response.data.errors.full_messages);
      });
    } else {
      return register === 200
    }
  if (register === 200) {
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
          props.changePaymentMessage("Account registerd BUT " + response.error.message);
        }
      })
    }
  };

  useEffect(() => {
    if (localStorage.getItem("J-tockAuth-Storage")) {
      setUser(JSON.parse(localStorage.getItem("J-tockAuth-Storage")).uid)
    } 
  }, [props.authenticated]);

  return (
    <div className="paywall">
      <h2>{t("paywall.l1")}</h2>
      <h5 id="line-two">{t("paywall.l2")}</h5>
      <h4 id="paywall-subheading">{t("paywall.l3")}&#128;</h4>
      <div className="paywall-info">
        <h5><Icon color='red' name='check' /> {t("paywall.check1")}</h5>
        <h5><Icon color='red' name='check' /> {t("paywall.check2")}</h5>
        <h5><Icon color='red' name='check' /> {t("paywall.check3")}</h5>
        <h5><Icon color='red' name='check' /> {t("paywall.check4")}</h5>
      </div>
      <h3 className="stripe-heading">{t("paywall.stripe")} 
        <span className="stripe-icon"><Icon color='blue' name='cc stripe' /></span>
      </h3>
      <h5 id="total">Sub Total <span id="right">99&#128;</span></h5>
      <Form id="payment" onSubmit={event => payWithStripe(event, props)}>
        <div className="payment-grid">
          <div className="paywall-reg">
            {localStorage.getItem("J-tockAuth-Storage") ? (
              <h4 id="sub-msg">{t("paywall.thankYou")}, {user}.</h4>
            ) : (
              <>
                <label>{t('login.email')}</label>
                <input name="email" type="email" id="email"></input>
                <label>{t("paywall.desire")} {t('login.password')}</label>
                <input name="password" type="password" id="password"></input>
              </>
            )}
          </div>
          <div>
            <div className="error field">
              <label>{t("stripe.cardNumber")}</label>
              <div className="stripe-input">
                <CardNumberElement />
              </div>
            </div>
            <div className="error field">
              <label>{t("stripe.cardExpDate")}</label>
              <div className="stripe-input">
                <CardExpiryElement />
              </div>
            </div>
            <div className="error field">
              <label>CVC</label>
              <div className="stripe-input">
                <CardCVCElement />
              </div>
            </div>
          </div>
        </div>
        <Button>{t("stripe.submit")}</Button>
      </Form>
      <p id="message">{props.paymentMessage}</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    paymentMessage: state.paymentMessage,
    authenticated: state.authenticated
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
