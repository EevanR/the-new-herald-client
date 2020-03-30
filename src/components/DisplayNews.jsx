import React from "react";
import Navbar from "./Navbar"
import DisplayCurrentArticle from "./DisplayCurrentArticle"
import DisplaySideArticles from "./DisplaySideArticles"
import Footer from "./Footer";
import Weather from "./Weather"
import { connect } from "react-redux";

const DisplayNews = props => {
  return (
    <>
      <Navbar />
      <div className="backgroundgrey">
        <div className="main">
            <div className="item-a">
              <DisplayCurrentArticle />
            </div>
            <div className="item-b">
              <DisplaySideArticles />
            </div>
            <div id="seperator" className="item-c">
              <div id="border-top">
                {props.sideArticles !== null && (
                  <>
                    <h4>{props.sideArticles.articles[0].title}</h4>
                    <img id="featured-img" src={props.sideArticles.articles[0].image} />
                    <h5>{props.sideArticles.articles[0].body}</h5>
                    <p>{props.sideArticles.articles[0].category}</p>
                  </>
                )}
              </div>
            </div>
            <div id="seperator" className="item-d">
              <div id="border-top">
                {props.sideArticles !== null && (
                  
                  <>
                    <h4>{props.sideArticles.articles[1].title}</h4>
                    <img id="featured-img" src={props.sideArticles.articles[1].image} />
                    <h5>{props.sideArticles.articles[1].body}</h5>
                    <p>{props.sideArticles.articles[1].category}</p>
                  </>
                )}
              </div>
            </div>
            <div className="item-e">
              <div id="border-top">
              {props.sideArticles !== null && (
                  <>
                    <h4>{props.sideArticles.articles[2].title}</h4>
                    <img id="featured-img" src={props.sideArticles.articles[2].image} />
                    <h5>{props.sideArticles.articles[2].body}</h5>
                    <p>{props.sideArticles.articles[2].category}</p>
                  </>
                )}
              </div>
            </div>
            <div className="item-f">
              <div id="weather">
                <>
                  <Weather />
                </>
              </div>
            </div>
            <div className="item-g">
              <div className="advertising">
                ADVERTISING
              </div>
            </div>
            <div className="item-h">
              <div id="border-top">
                {props.sideArticles !== null && (
                  <>
                    <h1>Free Read</h1>
                    <img className="free-read-img" src={props.sideArticles.articles[3].image} />
                  </>
                )}
              </div>
            </div>
            <div className="item-i">
              {props.sideArticles !== null && (
                <div className="free-read">
                  <h1>{props.sideArticles.articles[3].title}</h1>
                  <p>{props.sideArticles.articles[3].body}</p>
                  <p id="cat" >{props.sideArticles.articles[3].category}</p>
                </div>
              )}
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = state => {
  return {
    sideArticles: state.sideArticles
  }
}

export default connect(
  mapStateToProps
)(DisplayNews);
