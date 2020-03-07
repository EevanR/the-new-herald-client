import axios from "axios";

const getOnThisDay = async () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(1);
  let mm = String(today.getMonth() + 1).padStart(1);

  try {
    let response = await axios.get(
      `https://byabbe.se/on-this-day/${mm}/${dd}/events.json`
    );
    let events = response.data.events;
    for (let i = events.length - 1; i >= 0; --i) {
      if (events[i].description.length < 115) {
        events.splice(i, 1);
      } else {
        if (events[i].description.length > 139) {
          events.splice(i, 1);
        }
      }
    }
    return events;
  } catch (error) {
    return error;
  }
};

const getForexData = async () => {
  try {
    let token = "x50DVsx9yOqZCBXGZGrqMbBUlJeITZM2pY2vxhyqubikgYB4Db2UNZ0BxAnq";
    let response = await axios.get(
      `https://api.worldtradingdata.com/api/v1/forex?base=USD&api_token=${token}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getOnThisDay, getForexData };
