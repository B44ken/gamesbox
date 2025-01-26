import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App showWhichPage={"landing"}/>} />
      <Route path="/authentication" element={<App showWhichPage={"authentication"}/>} />
    </Routes>
  </BrowserRouter>,
)
