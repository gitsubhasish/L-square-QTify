import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import Section from "./Album/Section";

function App() {
  return (
    <div className="App">
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <Navbar />
      <Hero />
      <div style={{ padding: "20px", backgroundColor: "#000" }}>
        <Section
          title="Top Albums"
          apiEndpoint="https://qtify-backend-labs.crio.do/albums/top"
        />
        <Section
          title="New Albums"
          apiEndpoint="https://qtify-backend-labs.crio.do/albums/new"
        />
      </div>
    </div>
  );
}

export default App;
