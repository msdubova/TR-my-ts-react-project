import { Routes, Route } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Trends from "../Trends/Trends";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Trends />} />
        {/* <Route path="/Movies" element={<Movies />} */}
        {/* <Route path="/Genres" element={<Genres />} */}
        {/* <Route path="/Search" element={<Search />} */}
      </Route>
    </Routes>
  );
};

export default Router;
