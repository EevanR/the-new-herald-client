import React, { useEffect, useState } from "react";
import { getHeadlines } from "../modules/article"
import ItemsCarousel from 'react-items-carousel';
import { Button } from "semantic-ui-react";

const Headlines = () => {
  const [headlines, setHeadlines] = useState(null)
  const [message, setMessage] = useState("")
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  const loadHeadlines = async () => {
    let response = await getHeadlines();
    if (response.status === "ok") {
      setHeadlines(response)
    } else {
      setMessage("Cannot grab headlines at the moment")
    }
  }

  let headlinesList;

  if (headlines !== null && headlines.articles.length > 0) {
    headlinesList = headlines.articles.map(article => {
      return (
        <>
          <div key={article.id} className="carousel-item">
            <img src={article.urlToImage} alt="Img"/>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <div className="overlay">
                <h3 className="underline">{article.title}</h3>
              </div>
            </a>
          </div>
        </>
      )
    })
  }

  useEffect(() => {
    loadHeadlines();
  }, []);
  
  return (
    <>
      {headlines !== null && (
        <>
          <h1 className="car-head">BBC HEADLINES</h1>
          <div className="carousel" >
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={2.5}
              gutter={5}
              leftChevron={
                <Button circular icon='angle left' />
              }
              rightChevron={
                <Button circular icon='angle right'/>
              }
              chevronWidth={chevronWidth}
            >
              {headlinesList}
            </ItemsCarousel>
          </div>
        </>
      )}
    </>
  )
}

export default Headlines;