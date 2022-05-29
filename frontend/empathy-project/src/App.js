import "./App.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

import { Container } from "react-bootstrap";
import Board from "./components/Board.jsx";
import WelcomeView from "./components/WelcomeView.jsx";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <main className="py-3">
        <h1>Empathy Game</h1>
        <Container>
            {/*<WelcomeView />*/}
            <Board />
        </Container>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
