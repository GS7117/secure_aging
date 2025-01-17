import React from "react";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/ScamNewsNavBar/ScamNewsNavBar";
import News from "./components/News/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./config/config";
import Search from "./components/Search/Search";

function ScamNews() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>

        <NavBar />
        <Routes>
          {router.map((path) => (
            <Route
              exact
              key={uuidv4()}
              path={path.path}
              element={
                <News
                  key={path.key}
                  newscategory={path.category}
                  country={path.country}
                />
              }
            />
          ))}
          <Route path="/search/:query" element={<Search />} />
        </Routes>

    </>
  );
}

export default ScamNews;