import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"
import DisplayCurrentArticle from "./DisplayCurrentArticle"
import DisplaySideArticles from "./DisplaySideArticles"
import Footer from "./Footer";
import Weather from "./Weather"
import Headlines from "./Headlines"
import { connect } from "react-redux";
import { getFreeArticle, getArticles } from "../modules/article";

const DisplayNews = props => {
  const [freeContent, setFreeContent] = useState(null)
  const [freatured, setFeatured] = useState(null)

  const loadFreeArticle = async () => {
    let response = await getFreeArticle();
    setFreeContent(response)
  }

  const loadFeatured =  async () => {
    let response = await getArticles(
      props.language,
      1,
      "sports"
    );
    setFeatured(response)
  }

  useEffect(() => {
    loadFreeArticle();
    loadFeatured()
  }, []);
  
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
              {freatured !== null && (
                <>
                  <h4>{freatured.articles[0].title}</h4>
                  <img id="featured-img" src={freatured.articles[0].image} />
                  <h5>{freatured.articles[0].body}</h5>
                  <p id="cat-date" >
                    <span id="red">{freatured.articles[0].category} </span> 
                    {freatured.articles[0].created_at.substring(0, freatured.articles[0].created_at.lastIndexOf("T"))}
                  </p>
                </>
              )}
            </div>
          </div>
          <div id="seperator" className="item-d">
            <div id="border-top">
              {freatured !== null && (
                <>
                  <h4>{freatured.articles[1].title}</h4>
                  <img id="featured-img" src={freatured.articles[1].image} />
                  <h5>{freatured.articles[1].body}</h5>
                  <p id="cat-date" >
                    <span id="red">{freatured.articles[1].category} </span> 
                    {freatured.articles[1].created_at.substring(0, freatured.articles[1].created_at.lastIndexOf("T"))}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="item-e">
            <div id="border-top">
              {freatured !== null && (
                <>
                  <h4>{freatured.articles[2].title}</h4>
                  <img id="featured-img" src={freatured.articles[2].image} />
                  <h5>{freatured.articles[2].body}</h5>
                  <p id="cat-date" >
                    <span id="red">{freatured.articles[2].category} </span> 
                    {freatured.articles[2].created_at.substring(0, freatured.articles[2].created_at.lastIndexOf("T"))}
                  </p>
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
          <div className="item-j">
            <div className="headlines-main">
              <Headlines />
            </div>
          </div>
        </div>
      </div>
      <div className="whitebackground">
        <div className="main2">
          <div className="item-h">
            <div id="border-top">
              {freeContent !== null && (
                <>
                  <h2>FREE READ</h2>
                  <img className="free-read-img" src={freeContent[1]} />
                </>
              )}
            </div>
          </div>
          <div className="item-i">
            {freeContent !== null && (
              <div className="free-read">
                <h1>{freeContent[0].title}</h1>
                <p>{freeContent[0].body}</p>
                <p id="cat-date" >
                  <span id="red">{freeContent[0].category}</span> {freeContent[0].created_at.substring(0, freeContent[0].created_at.lastIndexOf("T"))}
                </p>
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
