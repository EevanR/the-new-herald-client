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
      case !props.authenticated: {
        return (
          <Button
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
          </div>
        );
      }
    }
  };

  return (
    <>
      {props.currentArticle ? (
        <div id="main-article-div" key={props.currentArticle.id}>
          <h2 id="article-title">{props.currentArticle.title}</h2>
          {props.currentArticle.image &&
          <img src={props.currentArticle.image} />
          }
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
    language: state.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeMessage: message => {
      dispatch({ type: "CHANGE_MESSAGE", payload: message });
    },
    changeCurrentArticle: article => {
      dispatch({ type: "CHANGE_ARTICLE", payload: article });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCurrentArticle);
