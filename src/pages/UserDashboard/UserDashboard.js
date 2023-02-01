import { useState, useEffect } from "react";

export default function UserDashboard({
  user,
  setUser,
  showShortenedUrl,
  setShowShortenedUrl,
  userLink,
  setUserLink,
  newUserLink,
  setNewUserLink,
  createUserLink,
  handleUserLinkChange,
}) {
  // const [currentUserLinks, setCurrentUserLinks] = useState(null);

  const [showEditLink, setShowEditLink] = useState(false);

  const [newlyEditedLink, setNewlyEditedLink] = useState({
    title: "",
  });

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
      const response = await fetch(`/api/links/${id}`, {
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
      Hey, {user.name}! Your cat sucks.
      <form onSubmit={createUserLink}>
        <input
          type="url"
          name="url"
          value={newUserLink.url}
          onChange={handleUserLinkChange}
        />

        <button className={newUserLink.url ? "" : "disabled"}>Shorten</button>
      </form>
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
      {user && user.links
        ? user.links.map((link, i) => {
            const { shortUrl, date, url, title, _id } = link;
            return (
              <li key={i}>
                <a href={url} target="_blank">
                  {title ? title : shortUrl}
                </a>
                <br />
                {date}
                <button
                  onClick={() => {
                    deleteLink(_id);
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    setShowEditLink(_id);
                    setNewlyEditedLink({
                      title: title,
                    });
                  }}
                >
                  Edit
                </button>

                {showEditLink === _id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateLink(_id, {
                        title: newlyEditedLink.title,
                      });
                    }}
                  >
                    <input
                      name="title"
                      type="text"
                      value={newlyEditedLink.title}
                      onChange={handleEditChange}
                    />
                  </form>
                ) : (
                  ""
                )}
              </li>
            );
          })
        : ""}
    </>
  );
}
