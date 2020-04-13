import React, { useEffect, useState } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { getOnThisDay, getForexData } from "../modules/footer";
import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Footer = props => {
  let [thisDayEvent, setOnThisDayEvent] = useState("");
  let [forexDisplay, setForexDisplay] = useState("");
  const { t } = useTranslation('common')

  let loadOnThisDayEvent = async () => {
    const onThisDayData = await getOnThisDay();
    setOnThisDayEvent(
      onThisDayData[Math.floor(Math.random() * onThisDayData.length)]
    );
  };

  const loadForexData = async () => {
    let forexData = await getForexData();
    if (!forexData.isAxiosError) {
      let forexSpecificData = [
        parseFloat(forexData.data.EUR).toFixed(2),
        parseFloat(forexData.data.SEK).toFixed(2),
        parseFloat(forexData.data.CAD).toFixed(2),
        Math.round(1 / forexData.data.BTC)
      ];
      setForexDisplay(forexSpecificData);
    } else {
      setForexDisplay("")
    }
  };
  
  const toggleCategory = event => {
    let itemButtons = document.getElementsByClassName("item-button");
      Array.from(itemButtons).forEach(
        button => (document.getElementById(button.id).style.fontWeight = "300")
      );
    if (event.target.id === "return") {
      props.changeCategory(null);
      document.getElementById(event.target.id).style.fontWeight = "900";
      window.scrollTo(0, 0)
    } else {
      props.changeCategory(event.target.id);
      document.getElementById(event.target.id).style.fontWeight = "900";
      window.scrollTo(0, 0)
    }
  };

  useEffect(() => {
    loadOnThisDayEvent();
    loadForexData();
  }, []);

  return (
    <div className="footer-container">
      <div className="footer">
        <Grid celled="internally">
          <Grid.Column style={{paddingLeft: "0px"}} width={4}>
            <div id="footer-info">
              <h5>Information: </h5>
              {t('footer.info1')}
              <br />
              {t('footer.info2')}
              <br />
              {t('footer.info3')}
            </div>
          </Grid.Column>
          <Grid.Column width={9}>
            <div id="footer-onthisday">
              {thisDayEvent ? (
                <>
                  <h5>On this day in {thisDayEvent.year}:</h5>
                  <div> {thisDayEvent.description}</div>
                </>
              ) : (
                <p>{t('dsa.loading')}</p>
              )}
            </div>
          </Grid.Column>
          <Grid.Column width={3}>
            <div id="footer-financials">
              {forexDisplay ? (
                <>
                  <h5>{t('footer.financeHeader')}</h5>
                  <p>Dollar / Euro: {forexDisplay[0]}</p>
                  <p>Dollar / SEK: {forexDisplay[1]}</p>
                  <p>Dollar / Canadian Dollar: {forexDisplay[2]}</p>
                  <p>Bitcoin: {forexDisplay[3]} $</p>
                </>
              ) : (
                <p>{t('dsa.loading')}</p>
              )}
            </div>
          </Grid.Column>
        </Grid>
        <div id="footer-links">
          <Link
            className="footer-links"
            id="return"
            onClick={toggleCategory}
          >
            {t("nav.all")}
          </Link>
          <br/>
          <Link
            className="footer-links"
            id="news"
            onClick={toggleCategory}
          >
            {t("nav.news")}
          </Link>
          <br/>
          <Link
            className="footer-links"
            id="food"
            onClick={toggleCategory}
          >
            {t("nav.food")}
          </Link>
          <br/>
          <Link
            className="footer-links"
            id="tech"
            onClick={toggleCategory}
          >
            {t("nav.tech")}
          </Link>
          <br/>
          <Link
            className="footer-links"
            id="culture"
            onClick={toggleCategory}
          >
            {t("nav.culture")}
          </Link>
          <br/>
          <Link
            className="footer-links"
            id="sports"
            onClick={toggleCategory}
          >
            {t("nav.sports")}
          </Link> 
          <br/> 
          <Link
            className="footer-links"
            id="misc"
            onClick={toggleCategory}
          >
            {t("nav.misc")}
          </Link> 
        </div>
      </div>
      <div className="sub-footer">
        <h1 className="footer-heading">The Reactive Herald
          <Icon id="footer-icon" color='blue' name="twitter" />
          <Icon id="footer-icon" color='blue' name="mail" />
        </h1>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    language: state.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCategory: category => {
      dispatch({ type: "CHANGE_CATEGORY", payload: category });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
