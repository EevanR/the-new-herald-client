import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { getOnThisDay, getForexData } from "../modules/footer";
import { useTranslation } from 'react-i18next'

const Footer = () => {
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
        Math.round(1 / forexData.data.BTC)
      ];
      setForexDisplay(forexSpecificData);
    } else {
      setForexDisplay("")
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
          <Grid.Column width={5}>
            <div id="footer-info">
              <h5>Information: </h5>
              {t('footer.info1')}
              <br />
              {t('footer.info2')}
              <br />
              {t('footer.info3')}
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
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
          <Grid.Column width={5}>
            <div id="footer-financials">
              {forexDisplay ? (
                <>
                  <h5>{t('footer.financeHeader')}</h5>
                  <p>Dollar / Euro: {forexDisplay[0]}</p>
                  <p>Bitcoin: {forexDisplay[1]} $</p>
                </>
              ) : (
                <p>{t('dsa.loading')}</p>
              )}
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
