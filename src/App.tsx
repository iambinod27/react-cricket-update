import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import News from "./pages/News";
import Matches from "./pages/Matches";
import NewsDetail from "./pages/NewsDetail";
import Players from "./pages/Players";
import Ranking from "./pages/Ranking";
import Teams from "./pages/Teams";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="matches" element={<Matches />} />
          <Route path="news" element={<News />} />
          <Route path="newsdetail/:id" element={<NewsDetail />} />
          <Route path="players" element={<Players />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="teams" element={<Teams />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
