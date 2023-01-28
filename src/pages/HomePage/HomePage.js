import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { logOut } from "../../utilities/users-service";

export default function HomePage({
  setUser,
  globalLink,
  createGlobalLink,
  newGlobalLink,
  handleChange,
  signUpModal,
  setSignUpModal,
  showShortenedUrl,
}) {
  return (
    <>
      {signUpModal ? (
        <div className="pop-up">
          <SignUpForm setUser={setUser} globalLink={globalLink._id} />
        </div>
      ) : (
        ""
      )}

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
          type="url"
          name="url"
          value={newGlobalLink.url}
          onChange={handleChange}
        />

        <button className={newGlobalLink.url ? "" : "disabled"}>Shorten</button>
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
          Want to save this link? Sign up
          <span
            onClick={() => {
              setSignUpModal(true);
            }}
          >
            here
          </span>
          .
        </>
      ) : (
        ""
      )}
    </>
  );
}
