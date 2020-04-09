import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const Navbar = props => {
  const [activeItem, setActiveItem] = useState("")
  const { t, i18n } = useTranslation("common");

  const changeLanguage = event => {
    setActiveItem(event.target.id)
    i18n.changeLanguage(event.target.id);
    props.changeLanguage(event.target.id);
  };

  useEffect(() => {
    const browserLanguages = navigator.languages;
    for (let i = 0; i < browserLanguages.length; i++) {
      if (browserLanguages[i].substring(0, 2) === "sv") {
        i18n.changeLanguage("sv");
        props.changeLanguage("sv");
        setActiveItem("sv")
        break;
      } else if (browserLanguages[i].substring(0, 2) === "en") {
        i18n.changeLanguage("en");
        props.changeLanguage("en");
        setActiveItem("en")
        break;
      }
    }
  }, []);

  const toggleCategory = event => {
    let itemButtons = document.getElementsByClassName("item-button");
      Array.from(itemButtons).forEach(
        button => (document.getElementById(button.id).style.fontWeight = "300")
      );
    if (event.target.id === "return") {
      props.changeCategory(null);
      document.getElementById(event.target.id).style.fontWeight = "900";
    } else {
      props.changeCategory(event.target.id);
      document.getElementById(event.target.id).style.fontWeight = "900";
    }
  };

  return (
    <div className="nav">
      <div className="nav-bar">
        <Menu pointing secondary fluid widths={9} style={{border: "none"}}>
          <Menu.Item 
            name={t("nav.english")} 
            id="en" className="item-button" 
            onClick={changeLanguage} 
            active={activeItem === 'en'}
            />
          <Menu.Item 
            style={{color: "goldenrod"}}
            name={t("nav.swedish")} 
            id="sv" 
            className="item-button" 
            onClick={changeLanguage} 
            active={activeItem === 'sv'}
            />
          <Menu.Item
            name={t("nav.all")}
            className="item-button"
            id="return"
            onClick={toggleCategory}
          />
          <Menu.Item
            name={t("nav.news")}
            className="item-button"
            id="news"
            onClick={toggleCategory}
          />
          <Menu.Item
            name={t("nav.food")}
            className="item-button"
            id="food"
            onClick={toggleCategory}
          />
          <Menu.Item
            name={t("nav.tech")}
            className="item-button"
            id="tech"
            onClick={toggleCategory}
          />
          <Menu.Item
            name={t("nav.culture")}
            className="item-button"
            id="culture"
            onClick={toggleCategory}
          />
          <Menu.Item
            name={t("nav.sports")}
            className="item-button"
            id="sports"
            onClick={toggleCategory}
          />
          <Menu.Item
            name={t("nav.misc")}
            className="item-button"
            id="misc"
            onClick={toggleCategory}
          />
        </Menu>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentArticleId: state.currentArticleId,
    language: state.language,
    currentPage: state.currentPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCategory: category => {
      dispatch({ type: "CHANGE_CATEGORY", payload: category });
    },
    changeLanguage: language => {
      dispatch({ type: "CHANGE_LANGUAGE", payload: language });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
