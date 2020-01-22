import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCurrentArticle } from "../modules/getArticlesData";

const DisplayCurrentArticle = props => {
  const getArticleShowData = async id => {
    const article = await getCurrentArticle(id);
    if (article.error) {
      props.changeMessage(article.error);
    } else {
      props.changeCurrentArticle(article);
    }
  };

  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false)

  useEffect(() => {
    getArticleShowData(props.currentArticleId);
  }, [props.currentArticleId]);

  const limitedDisplayUI = () => {
    switch (true) {
      case (!props.authenticated): {
        return null
      }
      case (props.authenticated && !showSubscriptionForm): {
        return (
          <button
            onClick={() => { setShowSubscriptionForm(true) }}
          >Subscribe!
          </button>
        )
      }
      case (showSubscriptionForm): {
        return (
          <>
            <p>Form will go here</p>
          </>
        )
      }

    }
  }

  return (
    <>
      {props.currentArticle ? (
        <div id="main-article-div" key={props.currentArticle.id}>
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
    authenticated: state.authenticated
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
