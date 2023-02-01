import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage(props) {
  return (
    <main>
      <h1>Auth Page</h1>
      <SignUpForm setUser={props.setUser} navigate={props.navigate} />
      <LoginForm setUser={props.setUser} />
    </main>
  );
}
