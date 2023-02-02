// import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { useState, useEffect } from "react";

export default function SignUpForm({ globalLink, setUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [links, setLinks] = useState([globalLink?._id]);
  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formDataCopy = { ...formData };
      if (links[0]) {
        formDataCopy.links = [...links];
      }
      delete formDataCopy.confirm;
      const user = await signUp(formDataCopy);
      setUser(user);
    } catch (error) {
      setError(
        "Sign up failed. Username and/or email address may already be in use."
      );
    }
  };

  useEffect(() => {
    setLinks([globalLink._id]);
  }, [globalLink]);

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit} className="flex">
        <h2>Join our community!</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          placeholder="Confirm password"
          required
        />
        <button type="submit" disabled={disable}>
          Sign up
        </button>
      </form>
      <h1 className="error-message">&nbsp;{error}</h1>
    </>
  );
}
