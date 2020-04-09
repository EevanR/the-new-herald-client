import React, { useState, useEffect } from "react";
import { getArticles } from "../modules/article";
import { getComments } from "../modules/comment"
import { Button } from "semantic-ui-react";
import { useTranslation } from 'react-i18next'
import { connect } from "react-redux"

const Trending = props => {
  const { t } = useTranslation('common')

  const [trending, setTrending] = useState([])
  const [trendingLikes, setTrendingLikes] = useState(null)
  const [comments, setComments] = useState([])

  const getArticlesData = async () => {
    let category = "all"
    let response = await getArticles(null, null, category);
    debugger
    if (response && response.length > 0) {
      debugger
      let highestRankId = Math.max.apply(Math, response.map((object) => { return object.likes.length; }))
      let array = response.filter((item) => item.likes.length === highestRankId)
      setTrending(array[0])
      setTrendingLikes(array[0].likes.length)
      trendComments(array[0].id)
    }
  };

  const trendComments = async (id) => {
    let response = await getComments(id);
    if (response.status === 200) {
      setComments(response.data)
    }
  }

  const changeMainArticle = (id) => {
    props.changeCurrentArticleId(id)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    getArticlesData()
  }, [])

  return (
    <>
      <h2 id="title-slim">REACTIVE TRENDING</h2>
      <div className="trending">
        <h1 id="rank">1</h1>
        <div className="info">
          <h2 onClick={() => changeMainArticle(trending.id)} id="article-title">{trending.title}</h2>
          <p id="cat-date" >
            <span id="red">{trending.category} </span>
            {trendingLikes} Upvotes
          </p>
          <Button
            id="subscribe"
            onClick={() => {
              props.showSubForm(true);
            }}
          >
            {t('dp.subscribe')}
          </Button>
        </div>
        {comments.length > 1 && (
          <>
            <div className="bubble1">
              <div className="speech-bubble">
                { comments[0].body.length > 70 ? `${comments[0].body.substring(0, 70)}...` : comments[0].body }
              </div>
              <span id="red">{comments[0].email}</span>
              <p><span id="comment-role">{comments[0].role}</span></p>
            </div>
            <div className="bubble2">
              <div className="speech-bubble2">
                { comments[1].body.length > 70 ? `${comments[1].body.substring(0, 70)}...` : comments[1].body }
              </div>
              <span id="red">{comments[1].email}</span>
              <p><span id="comment-role">{comments[1].role}</span></p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentArticleId: state.currentArticleId,
    showSubscriptionForm: state.showSubscriptionForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentArticleId: id => {
      dispatch({ type: "CHANGE_ARTICLE_ID", payload: id });
    },
    showSubForm: value => {
      dispatch({ type: "SET_SUBFORM", payload: value });
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);