import "./main.css";

import FlashCard from "./components/FlashCard/FlashCard";
import { FlashCardType } from "./types";

function App() {
  const testCard: FlashCardType = {
    id: "1234a",
    question: "What is this project built with?",
    answer: "React!",
  };

  return (
    <>
      <h1>Hello world</h1>
      <FlashCard setTitle="Practice" card={testCard} />
    </>
  );
}

export default App;
