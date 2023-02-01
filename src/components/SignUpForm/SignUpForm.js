import { Component } from "react";
import { signUp } from "../../utilities/users-service";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    links: [this.props.globalLink],
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      ...this.state,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData);
      console.log(user);
      this.props.setUser(user);
      // this.props.navigate.navigate("/dashboard");
    } catch (error) {
      this.setState({ error: "Sign Up Failed" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;

    return (
      <>
        <form autoComplete="off" onSubmit={this.handleSubmit} className="flex">
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email address"
            required
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirm"
            value={this.state.confirm}
            onChange={this.handleChange}
            placeholder="Confirm password"
            required
          />
          <button type="submit" disabled={disable}>
            Sign up
          </button>
        </form>
        <h1 className="error-message">&nbsp;{this.state.error}</h1>
      </>
    );
  }
}
