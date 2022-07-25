import React from "react";

const Home = ({ startGame }) => (
  <div className="container">
    <h2 className="titel">Quizzical</h2>
    <p>Answer 5 questions correct to win</p>
    <button className="start-btn" onClick={startGame}>
      Start
    </button>
  </div>
);

export default Home;
