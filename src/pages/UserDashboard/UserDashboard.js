import { useState, useEffect } from "react";
import Content from "../../components/Dashboard/Content/Content";
import Footer from "../../components/Footer/Footer";
import { logOut } from "../../utilities/users-service";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard({
  user,
  setUser,
  showShortenedUrl,
  userLink,
  newUserLink,
  createUserLink,
  handleUserLinkChange,
  setNewUserLink,
}) {
  // const [currentUserLinks, setCurrentUserLinks] = useState(null);

  const [showEditLink, setShowEditLink] = useState(false);

  const [newlyEditedLink, setNewlyEditedLink] = useState({
    title: "",
  });

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLink = async (id) => {
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      getUser();
    } catch (error) {
      console.error(error);
    }
  };

  const updateLink = async (id, updatedLink) => {
    try {
      const response = await fetch(`/api/links/${id}/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedLink }),
      });
      const data = await response.json();
      getUser();
      setShowEditLink(false);
      setNewlyEditedLink({
        title: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditChange = (evt) => {
    setNewlyEditedLink({
      ...newlyEditedLink,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {
    getUser();
  }, [userLink]);

  return (
    <>
      {/* <Content /> */}
      <header id="dashboard" className="flex">
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
              <button
                id="login-button"
                className="login-register"
                onClick={() => {
                  logOut();
                  setUser("");
                  navigate("/");
                }}
              >
                Logout
              </button>

              <button
                id="register-button"
                className="login-register"
                onClick={() => {
                  navigate(`/${user.name}`);
                }}
              >
                Link Tree
              </button>
            </div>
          </nav>
        </div>
      </header>
      {/* <a href={`/${user.name}`} target="_blank">
        linktree
      </a>
      <br />
      <br /> */}

      <div id="user-dashboard-container" className="flex">
        Hey, {user.name}! Your cat sucks.
        <form onSubmit={createUserLink}>
          <input
            type="url"
            name="url"
            value={newUserLink.url}
            onChange={handleUserLinkChange}
          />

          <input
            type="text"
            name="title"
            value={newUserLink.title}
            onChange={handleUserLinkChange}
          />

          <input
            type="checkbox"
            name="linkTree"
            value={newUserLink.linkTree === false ? "on" : "off"}
            onChange={handleUserLinkChange}
          />
          {/* <input
          type="radio"
          name="linkTree"
          value="off"
          onChange={handleUserLinkChange}
        /> */}

          <button
            className={newUserLink.url ? "" : "disabled"}
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
            Shorten
          </button>
        </form>
        {/* <Footer /> */}
        {showShortenedUrl ? (
          <>
            <h1>
              <a
                href={`http://localhost:3001/${userLink.shortUrl}`}
                target="_blank"
              >
                http://localhost:3001/{userLink.shortUrl}
              </a>
            </h1>
            .
          </>
        ) : (
          ""
        )}
        <div id="user-dashboard">
          {/* <div id="user-sidebar"></div>
          <div id="user-content">

          </div> */}

          {user && user.links
            ? user.links
                .map((link, i) => {
                  const { shortUrl, date, url, title, linkTree, _id } = link;
                  return (
                    <div className="link-container" key={i}>
                      <div className="link-title flex">
                        {showEditLink === _id ? (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              updateLink(_id, {
                                title: newlyEditedLink.title,
                              });
                              setShowEditLink(false);
                            }}
                          >
                            <input
                              name="title"
                              type="text"
                              placeholder={newlyEditedLink.title}
                              onChange={handleEditChange}
                              className="link-edit-input"
                            />
                          </form>
                        ) : (
                          <>
                            <div
                              className="link-title-button"
                              onClick={() => {
                                setShowEditLink(_id);
                                setNewlyEditedLink({ title: title });
                              }}
                            >
                              {" "}
                              {title ? title : `Unnamed Shorty`}{" "}
                            </div>{" "}
                          </>
                        )}
                      </div>

                      <div
                        className="link-short"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `http://localhost:3001/${shortUrl}`
                          );
                        }}
                      >
                        http://localhost:3001/{shortUrl}
                      </div>
                      <div className="link-long">{url}</div>
                      {date}
                      <br />

                      <ul className="link-buttons flex">
                        <li>
                          <button
                            onClick={() => {
                              setShowEditLink(_id);
                              setNewlyEditedLink({ title: title });
                            }}
                          >
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12 8.5v5.5h-10v-10h5.5l2-2h-8c-0.825 0-1.5 0.675-1.5 1.5v11c0 0.825 0.675 1.5 1.5 1.5h11c0.825 0 1.5-0.675 1.5-1.5v-8l-2 2z"></path>
                              <path d="M13.5 0l-9.5 9.5v2.5h2.5l9.5-9.5c0-1.5-1-2.5-2.5-2.5z"></path>
                            </svg>
                          </button>
                        </li>

                        <li>
                          <button
                            onClick={() => {
                              deleteLink(_id);
                            }}
                          >
                            <svg
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                            >
                              {" "}
                              <path d="M3 16h10l1-11h-12zM10 2v-2h-4v2h-5v3l1-1h12l1 1v-3h-5zM9 2h-2v-1h2v1z"></path>{" "}
                            </svg>
                          </button>
                        </li>

                        <li>
                          {linkTree === true ? (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                updateLink(_id, { linkTree: "off" });
                              }}
                            >
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.887 13.182l-2.387-3.182h1c0 0 0.001 0 0.001 0 0.276 0 0.5-0.224 0.5-0.5 0-0.121-0.043-0.231-0.114-0.318l-2.387-3.182h1c0.192 0 0.367-0.11 0.451-0.283s0.060-0.379-0.060-0.529l-4-5c-0.095-0.119-0.239-0.188-0.39-0.188s-0.296 0.069-0.39 0.188l-4 5c-0.12 0.15-0.143 0.356-0.060 0.529s0.258 0.283 0.451 0.283h1l-2.4 3.2c-0.114 0.152-0.132 0.354-0.047 0.524s0.258 0.276 0.447 0.276h1l-2.4 3.2c-0.114 0.152-0.132 0.354-0.047 0.524s0.258 0.276 0.447 0.276h4.5v1.5c0 0.276 0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5v-1.5h4.5c0 0 0 0 0.001 0 0.276 0 0.5-0.224 0.5-0.5 0-0.121-0.043-0.231-0.114-0.318z"></path>
                              </svg>
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                updateLink(_id, { linkTree: "on" });
                              }}
                            >
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.887 13.182l-2.387-3.182h1c0 0 0.001 0 0.001 0 0.276 0 0.5-0.224 0.5-0.5 0-0.121-0.043-0.231-0.114-0.318l-2.387-3.182h1c0.192 0 0.367-0.11 0.451-0.283s0.060-0.379-0.060-0.529l-4-5c-0.095-0.119-0.239-0.188-0.39-0.188s-0.296 0.069-0.39 0.188l-4 5c-0.12 0.15-0.143 0.356-0.060 0.529s0.258 0.283 0.451 0.283h1l-2.4 3.2c-0.114 0.152-0.132 0.354-0.047 0.524s0.258 0.276 0.447 0.276h1l-2.4 3.2c-0.114 0.152-0.132 0.354-0.047 0.524s0.258 0.276 0.447 0.276h4.5v1.5c0 0.276 0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5v-1.5h4.5c0 0 0 0 0.001 0 0.276 0 0.5-0.224 0.5-0.5 0-0.121-0.043-0.231-0.114-0.318z"></path>
                              </svg>
                            </button>
                          )}
                        </li>
                      </ul>
                    </div>
                  );
                })
                .reverse()
            : ""}
        </div>
      </div>
    </>
  );
}
