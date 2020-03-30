import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAdminArticles,
  publishArticle,
  undoPublishArticle,
  deleteArticle,
  setFreeStatus
} from "../../modules/article";
import { Header, Table } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import ArticleRow from "./ArticleRow";

const ReviewArticles = props => {
  let [articles, setArticles] = useState([]);
  let [publishedArticles, setPublishedArticles] = useState([]);
  let [publishMessage, setPublishMessage] = useState("");
  let [lastPublishedArticle, setLastPublishedArticle] = useState("");
  let [deleteMessage, setDeleteMessage] = useState("");
  
  let articlesList;
  let publishedArticlesList;
  const { t } = useTranslation();

  const loadArticles = async () => {
    let response = await getAdminArticles(false);
    setArticles(response);
  };

  const loadPublishedArticles = async () => {
    let response = await getAdminArticles(true);
    setPublishedArticles(response);
  };

  const onPublishHandler = async id => {
    let response = await publishArticle(id);
    if (response === "OK") {
      let message = `You published article ${id}`;
      setPublishMessage(message);
      setLastPublishedArticle(id);
    } else {
      setPublishMessage(response);
    }
  };

  const onDeleteHandler = async id => {
    let response = await deleteArticle(id);
    if (response === "OK") {
      let message = `Article ${id} was deleted`;
      setDeleteMessage(message);
    } else {
      setDeleteMessage(response);
    }
  };

  const onUndoPublishHandler = async id => {
    let response = await undoPublishArticle(id);
    if (response === "OK") {
      let message = `Undid the publishing of article ${id}`;
      setPublishMessage(message);
      setLastPublishedArticle("");
    } else {
      setPublishMessage(response);
    }
  };

  const onFreeHandler = async (id, status) => {
    let response = await setFreeStatus(id, status);
    if (response === "OK") {
      let message = `Article ${id} free status changed`;
      setPublishMessage(message);
    } else {
      setPublishMessage(response);
    }
  }

  useEffect(() => {
    loadArticles();
    loadPublishedArticles();
  }, []);

  useEffect(() => {
    loadArticles();
    loadPublishedArticles();
  }, [publishMessage, deleteMessage]);
  
  if (articles === "Request failed with status code 401") {
    props.changeAuth(false);
    props.changeLoginButton(true);
    props.changeSignupButton(true);
    props.changeAuthMessage("Inactivity timeout has occured, please log in again.");
  } else if (articles.length > 0) {
    articlesList = articles.map(article => {
      return (
        <ArticleRow
          key={article.id}
          article={article}
          publishHandler={onPublishHandler}
          deleteHandler={onDeleteHandler}
          pubStatus={false}
        />
      );
    });
  }

  if (publishedArticles === "Request failed with status code 401") {
    return "Inactivity timeout has occured, please log in again."
  } else if (publishedArticles.length > 0) {
    publishedArticlesList = publishedArticles.map(article => {
      return (
        <ArticleRow
          key={article.id}
          article={article}
          publishHandler={onUndoPublishHandler}
          deleteHandler={onDeleteHandler}
          freeHandler={onFreeHandler}
          pubStatus={true}
          freeStatus={article.free}
        />
      );
    });
  }

  return (
    <>
      <Header>
        <Header as="h1" id="publish-header">
          {t("admin.reviewArticles")}
        </Header>
        <div id="message">
          {publishMessage}
          <p style={{ color: "red" }}>{deleteMessage}</p>
          {lastPublishedArticle && (
            <button onClick={() => onUndoPublishHandler(lastPublishedArticle)}>
              {t("admin.undo")}
            </button>
          )}
        </div>
      </Header>
      <div id="unpublished-articles">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Publish</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{articlesList}</Table.Body>
        </Table>
      </div>
      <Header as="h1" id="publish-header">
        Published articles
      </Header>
      <div id="published-articles">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Free</Table.HeaderCell>
              <Table.HeaderCell>Publish</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{publishedArticlesList}</Table.Body>
        </Table>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  authMessage: state.authMessage,
  authenticated: state.authenticated,
  displaySignupButton: state.displaySignupButton,
  displayLoginButton: state.displayLoginButton
});

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewArticles);
