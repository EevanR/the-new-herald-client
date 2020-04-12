import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import DisplayCurrentArticle from "./DisplayCurrentArticle"
import DisplaySideArticles from "./DisplaySideArticles"
import Footer from "./Footer";
import Weather from "./Weather"
import Headlines from "./Headlines"
import Trending from "./Trending"
import Featured from "./Featured"
import { connect } from "react-redux";
import { getFreeArticle } from "../modules/article";
import { useTranslation } from 'react-i18next'
import StripeForm from "./StripeForm";
import { Elements } from "react-stripe-elements";
import { Button } from "semantic-ui-react";

const DisplayNews = props => {
  const { t } = useTranslation('common')
  const [freeContent, setFreeContent] = useState(null)
  const [paywall, setPaywall] = useState(null)
  const [paywallshow, setPaywallshow] = useState(false)
  const [paywallHeader, setPaywallHeader] = useState("panel")

  const loadFreeArticle = async () => {
    let response = await getFreeArticle(props.language);
    if (response.status === 200 ) {
      setFreeContent(response.data)
    }
  }

  useEffect(() => {
    if (props.showSubscriptionForm === true ) {
      setPaywall(true)
      setPaywallshow(true)
      setTimeout(() => {
        setPaywallHeader("panel-in")
      }, 400);
    }
    if (!props.showSubscriptionForm) {
      setPaywallHeader("panel")
      setTimeout(() => {
        setPaywallshow(false)
      }, 300);
    }
  }, [props.showSubscriptionForm]);

  useEffect(() => {
    loadFreeArticle();
  }, [props.language]);
  
  return (
    <>
      {paywall === true && (
        <div id="paywall" className={paywallshow ?  "paywall-in" : "paywall-out"}>
          <div id={paywallHeader}>
            <Button id="paywall-button" onClick={() => props.showSubForm(false)}>
              {t("stripe.cancel")}
            </Button>
          </div>
          <div className="subscrip">
            <Elements>
              <StripeForm />
            </Elements>
          </div>
        </div>
      )}
      <Navbar />
      <div className="backgroundgrey">
        <div className="main">
          <div className="item-a">
            <DisplayCurrentArticle />
          </div>
          <div className="item-b">
            <DisplaySideArticles />
          </div>
          {props.authenticated === false && (
            <>
              <div className="item-c">
                <Featured />
              </div>
            </>
          )}
          <div className="item-f">
            <div id="weather">
              <>
                <Weather />
              </>
            </div>
          </div>
          <div className="item-j">
            <div className="headlines-main">
              <Headlines />
            </div>
          </div>
          <div className="item-k">
            <div id="border-top">
              <Trending />
            </div>
          </div>
        </div>
      </div>
      <div className="whitebackground">
        <div className="main2">
          {props.authenticated === false ? (
            <>
              <div className="item-h">
                  <div id="border-top">
                    {freeContent !== null && (
                      <>
                        <h2>{t('dp.freeRead')}</h2>
                        <img className="free-read-img" src={freeContent[1]} />
                      </>
                    )}
                  </div>
              </div>
              <div className="item-i">
                {freeContent !== null && freeContent.length > 0 && (
                  <div className="free-read">
                    <h1>{freeContent[0].title}</h1>
                    <p>{freeContent[0].body}</p>
                    <p id="cat-date" >
                      <span id="red">{freeContent[0].category}</span> {freeContent[0].created_at.substring(0, freeContent[0].created_at.lastIndexOf("T"))}
                    </p>
                  </div>
                )}
              </div>
              <div className="item-g">
                <div className="advertising">
                  ADVERTISING
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="item-d">
                <Featured />
              </div>
              <div className="item-e">
                <div className="advertising">
                  ADVERTISING
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    sideArticles: state.sideArticles,
    language: state.language,
    showSubscriptionForm: state.showSubscriptionForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showSubForm: value => {
      dispatch({ type: "SET_SUBFORM", payload: value });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayNews);
