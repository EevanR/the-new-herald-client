import React, { useState, useEffect } from "react";
import { getArticles } from "../modules/article";
import { getComments } from "../modules/comment";

const Trending = () => {
  const [trending, setTrending] = useState([])
  const [trendingLikes, setTrendingLikes] = useState(null)
  const [comments, setComments] = useState([])

  const getArticlesData = async () => {
    let category = "all"
    let response = await getArticles(null, null, category);
    if (response) {
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

  useEffect(() => {
    getArticlesData()
  }, [])

  return (
    <>
      <h2 id="title-slim">REACTIVE TRENDING</h2>
      <div className="trending">
        <h1 id="rank">1</h1>
        <div className="info">
          <h2 id="article-title">{trending.title}</h2>
          <p id="cat-date" >
            <span id="red">{trending.category} </span>
            {trendingLikes} Upvotes
          </p>
        </div>
        {comments.length > 1 && (
          <>
            <div className="bubble1">
              <div className="speech-bubble">
                {comments[0].body}
              </div>
              <span id="red">{comments[0].email}</span>
              <p>{comments[0].role}</p>
            </div>
            <div className="bubble2">
              <div className="speech-bubble2">
                {comments[1].body}
              </div>
              <span id="red">{comments[0].email}</span>
              <p>{comments[0].role}</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Trending;