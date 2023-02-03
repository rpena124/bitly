import { useState, useEffect } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { logOut } from "../../utilities/users-service";
import { Link, useNavigate } from "react-router-dom";

import LoginForm from "../../components/LoginForm/LoginForm";

export default function HomePage({
  user,
  setUser,
  globalLink,
  createGlobalLink,
  newGlobalLink,
  handleChange,
  showShortenedUrl,
  setShowShortenedUrl,
  createUserLink,
  userLink,
  newUserLink,
  setNewUserLink,
  handleUserLinkChange,
}) {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <header className="flex">
        <div id="nav-container" className="flex">
          <nav className="flex">
            <div id="logo" className="flex">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M8.38 5.59c0-2.038-1.652-3.69-3.69-3.69s-3.69 1.652-3.69 3.69c0 2.038 1.652 3.69 3.69 3.69 0.96 0 1.826-0.376 2.483-0.976l1.827 1.687 0.012 0.009-0.004 0.003-1.836 1.693c-0.656-0.6-1.522-0.976-2.482-0.976-2.038 0-3.69 1.652-3.69 3.69s1.652 3.69 3.69 3.69 3.69-1.652 3.69-3.69c0-0.297-0.044-0.582-0.111-0.858l2.844-1.991 4.127 3.065c2.212 1.549 3.76-0.663 3.76-0.663l-10.731-7.515c0.066-0.276 0.111-0.561 0.111-0.858zM4.69 7.39c-0.994 0-1.8-0.806-1.8-1.8s0.806-1.8 1.8-1.8 1.8 0.806 1.8 1.8-0.806 1.8-1.8 1.8zM4.69 16.21c-0.994 0-1.8-0.806-1.8-1.8s0.806-1.8 1.8-1.8 1.8 0.806 1.8 1.8-0.806 1.8-1.8 1.8zM19 6.038c0 0-1.548-2.212-3.76-0.663l-3.205 2.235 2.354 1.648 4.611-3.22z"></path>
              </svg>
              SHORTY
            </div>

            <div id="user-buttons" className="flex">
              {user ? (
                <button
                  id="login-button"
                  className="login-register"
                  onClick={() => {
                    logOut();
                    setUser("");
                    setShowShortenedUrl(false);
                    setNewUserLink({ url: "" });
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  id="login-button"
                  className={`login-register ${showLogin ? "active" : ""}`}
                  onClick={() => {
                    setShowLogin(!showLogin);
                    setShowRegister(false);
                  }}
                >
                  Login
                </button>
              )}

              {user ? (
                <button
                  id="register-button"
                  className="login-register"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  id="register-button"
                  className={`login-register ${showRegister ? "active" : ""}`}
                  onClick={() => {
                    setShowLogin(false);
                    setShowRegister(!showRegister);
                  }}
                >
                  Register
                </button>
              )}
              <LoginForm
                setUser={setUser}
                showLogin={showLogin}
                setShowShortenedUrl={setShowShortenedUrl}
              />
              <SignUpForm
                setUser={setUser}
                globalLink={globalLink}
                showRegister={showRegister}
                setShowShortenedUrl={setShowShortenedUrl}
              />
            </div>
          </nav>
        </div>

        <h1>Link Size Matters...</h1>
        <h2>
          Nobody likes a link that's too big. Impress your friends with one
          that's the perfect size.
        </h2>
        {/* <img src="https://assets.codepen.io/8370674/Wave-6.3s-1704px.svg" /> */}
        <div id="form-container" className={showShortenedUrl ? "" : "hide"}>
          {user ? (
            <form onSubmit={createUserLink} className="flex">
              <input
                type="url"
                name="url"
                value={newUserLink.url}
                onChange={handleUserLinkChange}
                placeholder="Paste your URL here..."
                required
              />

              <button
                onClick={() => {
                  setNewUserLink({
                    ...newUserLink,
                    date: new Date().toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }),
                  });
                }}
              >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.38 5.59c0-2.038-1.652-3.69-3.69-3.69s-3.69 1.652-3.69 3.69c0 2.038 1.652 3.69 3.69 3.69 0.96 0 1.826-0.376 2.483-0.976l1.827 1.687 0.012 0.009-0.004 0.003-1.836 1.693c-0.656-0.6-1.522-0.976-2.482-0.976-2.038 0-3.69 1.652-3.69 3.69s1.652 3.69 3.69 3.69 3.69-1.652 3.69-3.69c0-0.297-0.044-0.582-0.111-0.858l2.844-1.991 4.127 3.065c2.212 1.549 3.76-0.663 3.76-0.663l-10.731-7.515c0.066-0.276 0.111-0.561 0.111-0.858zM4.69 7.39c-0.994 0-1.8-0.806-1.8-1.8s0.806-1.8 1.8-1.8 1.8 0.806 1.8 1.8-0.806 1.8-1.8 1.8zM4.69 16.21c-0.994 0-1.8-0.806-1.8-1.8s0.806-1.8 1.8-1.8 1.8 0.806 1.8 1.8-0.806 1.8-1.8 1.8zM19 6.038c0 0-1.548-2.212-3.76-0.663l-3.205 2.235 2.354 1.648 4.611-3.22z"></path>
                </svg>
              </button>
            </form>
          ) : (
            <form onSubmit={createGlobalLink} className="flex">
              <input
                type="url"
                name="url"
                value={newGlobalLink.url}
                onChange={handleChange}
                placeholder="Paste your URL here..."
                required
              />

              <button>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.38 5.59c0-2.038-1.652-3.69-3.69-3.69s-3.69 1.652-3.69 3.69c0 2.038 1.652 3.69 3.69 3.69 0.96 0 1.826-0.376 2.483-0.976l1.827 1.687 0.012 0.009-0.004 0.003-1.836 1.693c-0.656-0.6-1.522-0.976-2.482-0.976-2.038 0-3.69 1.652-3.69 3.69s1.652 3.69 3.69 3.69 3.69-1.652 3.69-3.69c0-0.297-0.044-0.582-0.111-0.858l2.844-1.991 4.127 3.065c2.212 1.549 3.76-0.663 3.76-0.663l-10.731-7.515c0.066-0.276 0.111-0.561 0.111-0.858zM4.69 7.39c-0.994 0-1.8-0.806-1.8-1.8s0.806-1.8 1.8-1.8 1.8 0.806 1.8 1.8-0.806 1.8-1.8 1.8zM4.69 16.21c-0.994 0-1.8-0.806-1.8-1.8s0.806-1.8 1.8-1.8 1.8 0.806 1.8 1.8-0.806 1.8-1.8 1.8zM19 6.038c0 0-1.548-2.212-3.76-0.663l-3.205 2.235 2.354 1.648 4.611-3.22z"></path>
                </svg>
              </button>
            </form>
          )}

          <div
            id="short-link"
            className={`flex ${showShortenedUrl ? "" : "hide"}`}
          >
            <div id="copied-message" className={showCopyMessage ? "" : "hide"}>
              Copied
            </div>
            <input
              value={
                user
                  ? `http://localhost:3001/${userLink.shortUrl}`
                  : `http://localhost:3001/${globalLink.shortUrl}`
              }
              className={showCopyMessage ? "highlighted" : ""}
              disabled
            />
            <button
              onClick={() => {
                {
                  user
                    ? navigator.clipboard.writeText(
                        `http://localhost:3001/${userLink.shortUrl}`
                      )
                    : navigator.clipboard.writeText(
                        `http://localhost:3001/${globalLink.shortUrl}`
                      );
                }
                setShowCopyMessage(true);
                setTimeout(() => {
                  setShowCopyMessage(false);
                }, 1000);
              }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M18.984 21v-14.016h-10.969v14.016h10.969zM18.984 5.016q0.797 0 1.406 0.586t0.609 1.383v14.016q0 0.797-0.609 1.406t-1.406 0.609h-10.969q-0.797 0-1.406-0.609t-0.609-1.406v-14.016q0-0.797 0.609-1.383t1.406-0.586h10.969zM15.984 0.984v2.016h-12v14.016h-1.969v-14.016q0-0.797 0.586-1.406t1.383-0.609h12z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div id="sign-up-message" className={showShortenedUrl ? "" : "hide"}>
          {user ? (
            <>
              {user.name}, if you want to manage your links, visit the{" "}
              <Link to="/dashboard">dashboard</Link>.
            </>
          ) : (
            <>
              Want to save this link and the others you create? Sign up{" "}
              <span
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(!showRegister);
                }}
              >
                here
              </span>
              !
            </>
          )}
        </div>
      </header>
    </>
  );
}
