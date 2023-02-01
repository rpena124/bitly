import { useState, useEffect } from "react";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import UserDashboard from "../UserDashboard/UserDashboard";
import HomePage from "../HomePage/HomePage";

function App() {
  const [user, setUser] = useState(getUser());
  const [globalLink, setGlobalLink] = useState("");
  const [newGlobalLink, setNewGlobalLink] = useState({
    url: "",
  });

  const [showShortenedUrl, setShowShortenedUrl] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const createGlobalLink = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newGlobalLink }),
      });
      const data = await response.json();
      setGlobalLink(data);
      setShowShortenedUrl(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (evt) => {
    setNewGlobalLink({ ...newGlobalLink, [evt.target.name]: evt.target.value });
  };

  const navigate = useNavigate();

  const [createLink, setCreateLink] = useState("");
  const [newlyCreatedLink, setNewlyCreatedLink] = useState({
    url: "",
  });
  const createUserLink = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/links/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newlyCreatedLink,
        }),
      });
      const data = await response.json();
      setCreateLink(data);
      setShowShortenedUrl(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserLinkChange = (evt) => {
    setNewlyCreatedLink({
      ...newlyCreatedLink,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              setUser={setUser}
              globalLink={globalLink}
              createGlobalLink={createGlobalLink}
              newGlobalLink={newGlobalLink}
              handleChange={handleChange}
              signUpModal={signUpModal}
              setSignUpModal={setSignUpModal}
              showShortenedUrl={showShortenedUrl}
              createUserLink={createUserLink}
              newlyCreatedLink={newlyCreatedLink}
              handleUserLinkChange={handleUserLinkChange}
            />
          }
        />
        {user ? (
          <Route
            path="/dashboard"
            element={
              <UserDashboard
                user={user}
                setUser={setUser}
                showShortenedUrl={showShortenedUrl}
                setShowShortenedUrl={setShowShortenedUrl}
                createLink={createLink}
                setCreateLink={setCreateLink}
                newlyCreatedLink={newlyCreatedLink}
                setNewlyCreatedLink={setNewlyCreatedLink}
                createUserLink={createUserLink}
                handleUserLinkChange={handleUserLinkChange}
              />
            }
          />
        ) : (
          ""
        )}
      </Routes>

      {user ? (
        <></>
      ) : (
        <>{/* <AuthPage setUser={setUser} navigate={navigate} /> */}</>
      )}
    </>
  );
}

export default App;
