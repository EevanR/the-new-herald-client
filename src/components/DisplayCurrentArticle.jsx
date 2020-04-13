import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentArticle, getCurrentArticleAuth } from "../modules/article";
import { Button } from "semantic-ui-react";
import { useTranslation } from 'react-i18next'
import Comments from "./Comments"

const DisplayCurrentArticle = props => {
  const { t } = useTranslation('common')

  const getArticleShowData = async id => {
    if (localStorage.getItem("J-tockAuth-Storage") && props.authenticated === true 
    && props.userAttrs !== null && props.userAttrs.role !== null) {
      const article = await getCurrentArticleAuth(id, props.language);
      if (article.error) {
        props.changeMessage(article.error);
      } else {
        props.changeCurrentArticle(article);
      }
    } else {
      const article = await getCurrentArticle(id, props.language);
      if (article.error) {
        props.changeMessage(article.error);
      } else {
        props.changeCurrentArticle(article);
      }
    }
  };

  const payWall = () => {
    props.showSubForm(true);
  }

  useEffect(() => {
    debugger
    getArticleShowData(props.currentArticleId);
  }, [props.currentArticleId, props.language]);

  useEffect(() => {
    getArticleShowData(props.currentArticleId);
  }, [props.authenticated]);

  let mainDisplay;
  switch (true) {
    case !props.authenticated: {
      return (
        <>
          {props.currentArticle ? (
            <div className="main-article-div" key={props.currentArticle.id}>
              {props.currentArticle.image &&
                <img src={props.currentArticle.image} />
              }
              <div className="current-text">
                <div className="text">
                  <h2 id="article-title">{props.currentArticle.title}</h2>
                  <p id="article-body">{props.currentArticle.body}</p>
                </div>
                {!props.authenticated && !props.showSubscriptionForm && (
                <Button
                  id="subscribe"
                  onClick={() => payWall()}>
                  {t('dp.subscribe')}
                </Button>
                )}
              </div>
            </div>
          ) : (
            <p id="message">{props.message}</p>
          )}
        </>
      )
    }
    case props.authenticated: {
      return (
        <>
          {props.currentArticle ? (
            <>
              <div className="main-article-auth" key={props.currentArticle.id}>
                <div className="main-article-upper">
                  {props.currentArticle.image &&
                    <img src={props.currentArticle.image} />
                  }
                  <h2 id="article-title">{props.currentArticle.title}</h2>
                  <p id="article-body">{props.currentArticle.body}</p>
                  <p id="cat-date" >
                    <span id="red">{props.currentArticle.category} </span> 
                    {props.currentArticle.created_at.substring(0, props.currentArticle.created_at.lastIndexOf("T"))}
                  </p>
                </div>
                <Comments 
                  articleData={getArticleShowData}
                  articleId={props.currentArticleId}
                  article={props.currentArticle}
                  userAttr={props.userAttrs}
                />
              </div>
            </>
          ) : (
            <p id="message">{props.message}</p>
          )}
        </>
      )
    }
  }

  return (
    <>
      {mainDisplay}
      
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
    paymentMessage: state.paymentMessage,
    showSubscriptionForm: state.showSubscriptionForm
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
    },
    showSubForm: value => {
      dispatch({ type: "SET_SUBFORM", payload: value });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayCurrentArticle);
