import React, { useState } from "react";
import { connect } from "react-redux";
import auth from "../modules/auth";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Signup from './Signup';

const Login = props => {
  const [active, setActive] = useState(false)

  const { t } = useTranslation()

  const onLogin = event => {
    event.preventDefault();
    auth
      .signIn(event.target.email.value, event.target.password.value)
      .then(userDatas => {
        props.changeAuth(true);
        props.setUserAttrs(userDatas.data);
        props.changeAuthMessage(`${t('login.loggedInMess')} ${userDatas.data.email}`);
      })
      .catch(error => {
        props.changeAuthMessage(error.response.data.errors);
      });
  };

  const onLogout = () => {
    auth
      .signOut()
      .then(() => {
        props.changeAuth(false);
        props.changeLoginButton(true);
        props.changeSignupButton(true);
        props.changeAuthMessage("");
      })
      .catch(error => {
        if (error.message === "Request failed with status code 404") {
          props.changeAuth(false);
          props.changeLoginButton(true);
          props.changeSignupButton(true);
          props.changeAuthMessage("");
        }
        props.changeAuthMessage(error.message);
      });
  };

  const fadeIn = () => {
    setActive(true)
    setTimeout(() => {
      setActive(false)
    }, 6000);
  }

  let loginFunction;

  switch (true) {
    case !props.authenticated && !props.displaySignupButton:
      loginFunction = (
        <>
          <Signup />
        </>
      );
      break;
    case props.displayLoginButton &&
      !props.authenticated:
      loginFunction = (
        <>
          <Link
            id="login-button"
            onClick={() => props.changeLoginButton(false)}
          >
            {t('login.login')}
          </Link>
          <Signup />
        </>
      );
      break;
    case !props.displayLoginButton && !props.authenticated:
      loginFunction = (
        <div className="login-form">
          <p>{t('login.login')}</p>
          <form id="login-form" onSubmit={onLogin}>
            <label>{t('login.email')} </label>
            <input name="email" type="email" id="email"></input>
            <label>{t('login.password')} </label>
            <input name="password" type="password" id="password"></input>&nbsp;
            <button onClick={() => fadeIn()} id="submit">{t('login.submit')}</button>
            <Link
              id="back-button"
              onClick={() => props.changeLoginButton(true)}
            >
              <button id="cancel">
                {t('login.cancel')}
              </button>
            </Link>
          </form>
          
        </div>
      );
      break;
    case props.authenticated:
      loginFunction = (
        <>
          <Link id="profile-link" to="/profile">
            {t('login.profile')}
          </Link>&nbsp;
          <Link id="logout-link" to="/" onClick={onLogout}>
            {t('login.logout')}
          </Link>
          {props.userAttrs && (props.userAttrs.role === "journalist" || props.userAttrs.role ===  "publisher") && (
            <Link
              id="admin-button"
              to="/admin"
            >
              Admin
            </Link>
          )}
          {props.userAttrs && props.userAttrs.role === null && (
            <Link
              id="subscribe-link"
              to="/profile"
            >
              Subscribe
            </Link>
          )}
        </>
      );
      break;
    default:
      loginFunction = null;
  }

  return (
    <div className="login" >
      {loginFunction}
      <br/>
      <div id="fade-in" className={active ? "fade-in-active" : "fade-out"}>{props.authMessage}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  userAttrs: state.userAttrs,
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
    changeLoginButton: value => {
      dispatch({ type: "CHANGE_LOGINBUTTON", payload: value });
    },
    changeSignupButton: value => {
      dispatch({ type: "CHANGE_SIGNUPBUTTON", payload: value });
    },
    setUserAttrs: userAttrs => {
      dispatch({ type: "CHANGE_USER_ATTRIBUTES", payload: userAttrs });
    },
    showSubForm: value => {
      dispatch({ type: "SET_SUBFORM", payload: value });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
