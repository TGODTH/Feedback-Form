import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Form from "./pages/Form";
import Nav from "./components/Nav";
import { useState } from "react";
import Context from "./Context";
import Succeed from "./pages/Succeed";
import "./App.css"

function App() {
  interface QuestionData {
    department: string;
    departmentName: string;
    questions: {
      questionGroup: number;
      questionGroupName: string;
      allQuestions: string[];
    }[];
  }

  const [Questions, setData] = useState<QuestionData>();
  const [password, setPassword] = useState<string>();

  return (
    <div className="min-h-screen">
      <p className="creator">By TGOD</p>
      <Context.Provider value={{ password, Questions, setData, setPassword }}>
        <Router>
          <Nav />
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="form" element={<Form />} />
              <Route path="succeed" element={<Succeed />} />
            </Route>
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
