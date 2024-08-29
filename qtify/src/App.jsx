import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import Section from "./Album/Section";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div style={{ padding: "20px", backgroundColor: "#000" }}>
        <Section
          title="Top Albums"
          apiEndpoint="https://qtify-backend-labs.crio.do/albums/top"
          isSongSection={false}
        />
        <Section
          title="New Albums"
          apiEndpoint="https://qtify-backend-labs.crio.do/albums/new"
          isSongSection={false}
        />
        <Section
          title="Songs"
          apiEndpoint="https://qtify-backend-labs.crio.do/songs"
          isSongSection={true}
        />
      </div>
    </div>
  );
}

export default App;
