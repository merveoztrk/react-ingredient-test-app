import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import NumberofQuestion from './components/NumberofQuestion';
import QuestionPage from './components/QuestionPage';



const App = () => {
  return (
    <main>
      <section className='container'>
        <div className='title'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FirstPage />}></Route>
              <Route path="/numberofquestion" element={<NumberofQuestion />}></Route>
              <Route path="/questionpage" element={<QuestionPage />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </section>
    </main>
  )
}

export default App
