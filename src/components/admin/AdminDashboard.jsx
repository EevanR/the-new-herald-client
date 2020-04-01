import React from "react";
import { connect } from "react-redux";
import CreateArticle from "./CreateArticle";
import ReviewArticles from "./ReviewArticles";
import { useTranslation } from "react-i18next";

const AdminDashboard = props => {
  const { t } = useTranslation();

  let renderDashboard;

  switch (true) {
    case !props.authenticated:
      renderDashboard = <p>{t("admin.alertLogin")}</p>;
      break;
    case props.userAttrs && props.userAttrs.role === "journalist":
      renderDashboard = <CreateArticle />;
      break;
    case props.userAttrs && props.userAttrs.role === "publisher":
      renderDashboard = <ReviewArticles />;
      break;
    default:
      renderDashboard = null;
  }

  return (
    <div className="backgroundgrey">
      <div className="admin">
        {renderDashboard}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
    userAttrs: state.userAttrs
  };
};

export default connect(mapStateToProps)(AdminDashboard);
