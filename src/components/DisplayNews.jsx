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

const DisplayNews = props => {
  const [freeContent, setFreeContent] = useState(null)

  const loadFreeArticle = async () => {
    let response = await getFreeArticle();
    if (response.status === 200 ) {
      setFreeContent(response.data)
    }
  }

  useEffect(() => {
    loadFreeArticle();
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
                        <h2>FREE READ</h2>
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
    sideArticles: state.sideArticles
  }
}

export default connect(
  mapStateToProps
)(DisplayNews);
