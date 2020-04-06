import React, { useEffect, useState } from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import StripeForm from "./StripeForm";
import { Elements } from "react-stripe-elements";
import { Button } from "semantic-ui-react";

const DisplayProfile = props => {
  const { t } = useTranslation("common");

  const userDataGrab = async () => {
    if (props.userAttrs) {
      let response = await getUserData(props.userAttrs.id)
      if (response === "Request failed with status code 401") {
        props.changeAuth(false);
        props.changeLoginButton(true);
        props.changeSignupButton(true);
        props.changeAuthMessage("Inactivity timeout has occured, please log in again.");
      } else {
      props.changeUserShowData(response);
      }
    }
  };

  const date = () => {
    let newDate = props.userShowData.created_at
    if (newDate) {
      return newDate.substring(0, newDate.indexOf("T"))
    }
  }

  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);

  useEffect(() => {
    userDataGrab();
  }, [props.userAttrs]);

  const renderSubscription = () => {
    switch (true) {
      case props.userAttrs.role !== null: {
        return props.userAttrs.role;
      }
      case props.userAttrs.role === null && !showSubscriptionForm: {
        return (
          <>
            <div>{t("dp.nosub")}</div>
            <div>
              <Button
                id="subscribe"
                onClick={() => {
                  setShowSubscriptionForm(true);
                }}
              >
                {t("dp.subscribe")}
              </Button>
            </div>
          </>
        );
      }
      case showSubscriptionForm: {
        return (
          <Elements>
            <StripeForm />
          </Elements>
        );
      }
    }
  };

  return (
    <div className="backgroundgrey">
      <div className="profile">
        {props.userShowData ? (
          props.userShowData.email ? (
            <>
              <h1>{t("dp.yourProfile")}:</h1>
              <h4>{t("dp.email")}:</h4> <p>{props.userShowData.email}</p>
              <h4>{t("dp.role")}:</h4> <p>{props.userShowData.role}</p>
              <h4>{t("dp.subscription")}:</h4> <div>{renderSubscription()}</div>
              <h4>Member Since</h4> <div>{date()}</div>
            </>
          ) : (
            <>
              <h1>{t("dp.yourProfile")}:</h1>
              <h4>{props.userShowData}</h4>
            </>
          )
        ) : (
          <>
            <p>{t("dp.loginProfile")}</p>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userAttrs: state.userAttrs,
  userShowData: state.userShowData,
  authMessage: state.authMessage,
  authenticated: state.authenticated,
  displaySignupButton: state.displaySignupButton,
  displayLoginButton: state.displayLoginButton
});

const mapDispatchToProps = dispatch => {
  return {
    changeUserShowData: data => {
      dispatch({ type: "SET_SHOWDATA", payload: data });
    },
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    },
    changeAuthMessage: message => {
      dispatch({ type: "CHANGE_AUTHMESSAGE", payload: message });
    },
    changeLoginButton: value => {
      dispatch({ type: "CHANGE_LOGINBUTTON", payload: value });
    },
    changeSignupButton: value => {
      dispatch({ type: "CHANGE_SIGNUPBUTTON", payload: value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProfile);
