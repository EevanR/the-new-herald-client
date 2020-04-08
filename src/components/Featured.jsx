import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getArticles } from "../modules/article";

const Featured = props => {
  const [featured, setFeatured] = useState(null)

  const loadFeatured =  async () => {
    let response = await getArticles(
      props.language,
      1,
      "sports"
    );
    setFeatured(response)
  }

  useEffect(() => {
    loadFeatured()
  }, []);

  return (
    <div className="featured-div">
      <div id="seperator-a">
        <div id="border-top" className={props.authenticated ? "feature2" : "feature"}>
          {featured !== null && featured.articles.length > 0 && (
            <>
              <h4
                onClick={() => props.changeCurrentArticleId(featured.articles[0].id)}
                id="featured-title"
              >
                {featured.articles[0].title}
              </h4>
              <img id="featured-img" src={featured.articles[0].image} />
              <h5 id="featured-body">{featured.articles[0].body}</h5>
              <p id="cat-date" >
                <span id="red">{featured.articles[0].category} </span>
                {featured.articles[0].created_at.substring(0, featured.articles[0].created_at.lastIndexOf("T"))}
              </p>
              <p id="feature-hover">FEATURED</p>
              <p id="feature2-hover">FEATURED</p>
            </>
          )}
        </div>
      </div>
      <div id="seperator-b" >
        <div id="border-top" className={props.authenticated ? "feature2" : "feature"}>
          {featured !== null && featured.articles.length > 1 && (
            <>
              <h4
                onClick={() => props.changeCurrentArticleId(featured.articles[1].id)}
                id="featured-title"
              >
                {featured.articles[1].title}
              </h4>
              <img id="featured-img" src={featured.articles[1].image} />
              <h5 id="featured-body">{featured.articles[1].body}</h5>
              <p id="cat-date" >
                <span id="red">{featured.articles[1].category} </span>
                {featured.articles[1].created_at.substring(0, featured.articles[1].created_at.lastIndexOf("T"))}
              </p>
              <p id="feature-hover">FEATURED</p>
              <p id="feature2-hover">FEATURED</p>
            </>
          )}
        </div>
      </div>
      <div id="seperator-c">
        <div id="border-top" className={props.authenticated ? "feature2" : "feature"}>
          {featured !== null && featured.articles.length > 2 && (
            <>
              <h4
                onClick={() => props.changeCurrentArticleId(featured.articles[2].id)}
                id="featured-title"
              >
                {featured.articles[2].title}
              </h4>
              <img id="featured-img" src={featured.articles[2].image} />
              <h5 id="featured-body">{featured.articles[2].body}</h5>
              <p id="cat-date" >
                <span id="red">{featured.articles[2].category} </span>
                {featured.articles[2].created_at.substring(0, featured.articles[2].created_at.lastIndexOf("T"))}
              </p>
              <p id="feature-hover">FEATURED</p>
              <p id="feature2-hover">FEATURED</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentArticleId: id => {
      dispatch({ type: "CHANGE_ARTICLE_ID", payload: id });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Featured);