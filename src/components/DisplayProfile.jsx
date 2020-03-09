import React, { useEffect, useState } from "react";
import { getUserData } from "../modules/getUserData";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StripeForm from "./StripeForm";
import { Elements } from "react-stripe-elements";
import { Button } from "semantic-ui-react";

const DisplayProfile = props => {
  const { t } = useTranslation("common");

  const userDataGrab = async () => {
    if (props.userAttrs) {
      props.changeUserShowData(await getUserData(props.userAttrs.id));
    }
  };

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
    <div id="profile">
      {props.userShowData ? (
        props.userShowData.email ? (
          <>
            <h1>{t("dp.yourProfile")}:</h1>
            <h4>{t("dp.email")}:</h4> <p>{props.userShowData.email}</p>
            <h4>{t("dp.role")}:</h4> <p>{props.userShowData.role}</p>
            <h4>{t("dp.subscription")}:</h4> <div>{renderSubscription()}</div>
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
  );
};

const mapStateToProps = state => ({
  userAttrs: state.userAttrs,
  userShowData: state.userShowData
});

const mapDispatchToProps = dispatch => {
  return {
    changeUserShowData: data => {
      dispatch({ type: "SET_SHOWDATA", payload: data });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProfile);
