import { useState, useEffect } from "react";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { logOut } from "../../utilities/users-service";

function App() {
  const [user, setUser] = useState(getUser());
  const [globalLink, setGlobalLink] = useState("");
  const [newGlobalLink, setNewGlobalLink] = useState({
    url: "",
  });

  const [showShortenedUrl, setShowShortenedUrl] = useState(false);

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

  useEffect(() => {}, []);

  return (
    <main className="App">
      {user ? (
        <>
          <div
            onClick={() => {
              logOut();
              setUser("");
            }}
          >
            LOG OUT
          </div>
          <form onSubmit={createGlobalLink}>
            <input
              type="text"
              name="url"
              value={newGlobalLink.url}
              onChange={handleChange}
            />

            <button className={newGlobalLink.url ? "" : "disabled"}>
              Shorten
            </button>
          </form>

          {showShortenedUrl ? (
            <>
              <h1>
                <a
                  href={`http://localhost:3001/${globalLink.shortUrl}`}
                  target="_blank"
                >
                  http://localhost:3001/{globalLink.shortUrl}
                </a>
              </h1>
              Want to save this link? Sign up here.
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
