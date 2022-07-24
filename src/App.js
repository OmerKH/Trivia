import "./App.css";
import { ApiProvider } from "./providers/ApiProvider";
import Quiz from "./components/Quiz";
import "./app.scss";

function App() {
  return (
    <ApiProvider>
      <div className="App">
        <Quiz />
      </div>
    </ApiProvider>
  );
}

export default App;
