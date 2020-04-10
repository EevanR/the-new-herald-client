import React from "react";
import { connect } from "react-redux";
import auth from "../modules/auth";
import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";

const Signup = props => {

  const { t } = useTranslation()

  const onSignup = async event => {
    event.preventDefault();
    event.persist()
    let register;
    await auth
      .signUp({
        email: event.target.email.value,
        password: event.target.password.value
      })
      .then(userDatas => {
        register = userDatas.status
      })
      .catch(error => {
        props.changeAuthMessage(error.response.data.errors.full_messages);
      });
      if (register === 200) {
      auth
        .signIn(event.target.email.value, event.target.password.value)
        .then(userDatas => {
          props.changeAuth(true);
          props.setUserAttrs(userDatas.data);
          props.changeAuthMessage(`Welcome!${t('login.loggedInMess')} ${userDatas.data.email}`);
        })
        .catch(error => {
          props.changeAuthMessage(error.response.data.errors);
        });
      }
  }; 
  
  let signupFunction;

  switch (true) {
    case props.displaySignupButton &&
      !props.authenticated &&
      props.displayLoginButton:
      signupFunction = (
        <Link
          id="signup-button"
          onClick={() => props.changeSignupButton(false)
          }
        >
          {t('login.signup')}
        </Link>
      );
      break;
    case !props.displaySignupButton && !props.authenticated:
      signupFunction = (
        <div className="sign-form">
          <p>{t('login.signup')}</p>
          <form id="signup-form" onSubmit={onSignup}>
            <label>{t('login.email')}</label>
            <input name="email" type="email" id="email"></input>

            <label>{t('login.password')}</label>
            <input name="password" type="password" id="password"></input>

            <button id="submit">{t('login.signup')}</button>
            <Link
              className="signup-back"
              id="back-button"
              onClick={() => props.changeSignupButton(true)}
            >
              <button>{t('login.cancel')}</button>
            </Link>
          </form>
          {props.authMessage}
        </div>
      );
      break;
    default:
      signupFunction = null;
  }

  return <div id="signup">{signupFunction}</div>;
};

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  authMessage: state.authMessage,
  displaySignupButton: state.displaySignupButton,
  displayLoginButton: state.displayLoginButton
});

const mapDispatchToProps = dispatch => {
  return {
    changeAuth: auth => {
      dispatch({ type: "CHANGE_AUTHENTICATED", payload: auth });
    },
    changeAuthMessage: message => {
      dispatch({ type: "CHANGE_AUTHMESSAGE", payload: message });
    },
    changeSignupButton: value => {
      dispatch({ type: "CHANGE_SIGNUPBUTTON", payload: value });
    },
    changeLoginButton: value => {
      dispatch({ type: "CHANGE_LOGINBUTTON", payload: value });
    },
    setUserAttrs: userAttrs => {
      dispatch({ type: "CHANGE_USER_ATTRIBUTES", payload: userAttrs });
    },
    setActive: value => {
      dispatch({ type: "SET_LOGINACTIVE", payload: value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
