import WelcomeForm from "./components/WelcomeForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to Our App</h1>
        <p>Fill in the form below to get started</p>
      </header>
      <main className="app-main">
        <WelcomeForm />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Welcome App</p>
      </footer>
    </div>
  );
}

export default App;
