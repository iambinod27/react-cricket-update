import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import News from "./pages/News";
import Matches from "./pages/Matches";
import NewsDetail from "./pages/NewsDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="matches" element={<Matches />} />
          <Route path="news" element={<News />} />
          <Route path="newsdetail/:id" element={<NewsDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
