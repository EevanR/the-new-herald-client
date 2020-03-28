import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentArticle } from "../modules/article";
import StripeForm from "./StripeForm";
import { Elements } from "react-stripe-elements";
import { Button } from "semantic-ui-react";
import { useTranslation } from 'react-i18next'

const DisplayCurrentArticle = props => {
  const { t } = useTranslation('common')

  const getArticleShowData = async id => {
    const article = await getCurrentArticle(id, props.language);
    if (article.error) {
      props.changeMessage(article.error);
    } else {
      props.changeCurrentArticle(article);
    }
  };

  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);

  useEffect(() => {
    getArticleShowData(props.currentArticleId);
  }, [props.currentArticleId, props.language]);

  const limitedDisplayUI = () => {
    switch (true) {
      case !props.authenticated && !showSubscriptionForm: {
        return (
          <Button
            id="subscribe"
            onClick={() => {
              setShowSubscriptionForm(true);
            }}
          >
            {t('dp.subscribe')}
          </Button>
        );
      }
      case props.userAttrs && props.userAttrs.role === null && !showSubscriptionForm: {
        return (
          <Button
            id="subscribe"
            onClick={() => {
              setShowSubscriptionForm(true);
            }}
          >
            {t('dp.subscribe')}
          </Button>
        );
      }
      case showSubscriptionForm: {
        return (
          <div id="stripe-form">
            <Elements>
              <StripeForm />
            </Elements>
            <Button onClick={() => {
              setShowSubscriptionForm(false);
              props.changePaymentMessage(null)
            }}>
              {t("stripe.cancel")}
            </Button>
          </div>
        );
      }
    }
  };

  return (
    <>
      {props.currentArticle ? (
        <div className="main-article-div" key={props.currentArticle.id}>
          {props.currentArticle.image &&
            <img src={props.currentArticle.image} />
          }
          <h2 id="article-title">{props.currentArticle.title}</h2>
          <p id="article-body">{props.currentArticle.body}</p>
          {limitedDisplayUI()}
        </div>
      ) : (
          <p id="message">{props.message}</p>
        )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentArticle: state.currentArticle,
    currentArticleId: state.currentArticleId,
    message: state.message,
    authenticated: state.authenticated,
    userAttrs: state.userAttrs,
    language: state.language,
    paymentMessage: state.paymentMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: message => {
      dispatch({ type: "CHANGE_MESSAGE", payload: message });
    },
    changeCurrentArticle: article => {
      dispatch({ type: "CHANGE_ARTICLE", payload: article });
    },
    changePaymentMessage: message => {
      dispatch({ type: "CHANGE_PAYMENTMESSAGE", payload: message });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCurrentArticle);
