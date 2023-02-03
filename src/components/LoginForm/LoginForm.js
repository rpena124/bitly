import { useState } from "react";
import * as userService from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser, showLogin, setShowShortenedUrl }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await userService.login(credentials);
      setUser(user);
      navigate("/dashboard");
      setShowShortenedUrl(false);
    } catch (error) {
      setError("Sign in failed. Email and/or password may be incorrect.");
    }
  };

  return (
    <div className={`login-register-form ${showLogin ? "" : "hide"}`}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-section flex">
          <div className="form-icon flex">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="M13.657 2.343c-1.511-1.511-3.52-2.343-5.657-2.343s-4.146 0.832-5.657 2.343c-1.511 1.511-2.343 3.52-2.343 5.657s0.832 4.146 2.343 5.657c1.511 1.511 3.52 2.343 5.657 2.343 1.199 0 2.353-0.259 3.429-0.77 0.499-0.237 0.711-0.834 0.474-1.332s-0.834-0.711-1.332-0.474c-0.806 0.383-1.671 0.577-2.571 0.577-3.308 0-6-2.692-6-6s2.692-6 6-6 6 2.692 6 6v1c0 0.551-0.449 1-1 1s-1-0.449-1-1v-4c0-0.552-0.448-1-1-1-0.406 0-0.755 0.242-0.912 0.59-0.608-0.374-1.323-0.59-2.088-0.59-2.206 0-4 1.794-4 4s1.794 4 4 4c1.045 0 1.998-0.403 2.712-1.062 0.551 0.649 1.372 1.062 2.288 1.062 1.654 0 3-1.346 3-3v-1c0-2.137-0.832-4.146-2.343-5.657zM8 10c-1.103 0-2-0.897-2-2s0.897-2 2-2c1.103 0 2 0.897 2 2s-0.897 2-2 2z"></path>
            </svg>
          </div>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-section last-section flex">
          <div className="form-icon flex">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path d="M13 7h-1v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-1c-0.55 0-1 0.45-1 1v7c0 0.55 0.45 1 1 1h10c0.55 0 1-0.45 1-1v-7c0-0.55-0.45-1-1-1zM8 13c-0.552 0-1-0.448-1-1s0.448-1 1-1 1 0.448 1 1-0.448 1-1 1zM10 7h-4v-3c0-1.103 0.897-2 2-2s2 0.897 2 2v3z"></path>
            </svg>
          </div>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">Login</button>
        {error ? <div className="error-message">{error}</div> : ""}
      </form>
    </div>
  );
}
