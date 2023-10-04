import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllProjectListContainer from "../containers/AllProjectListContainer";
import FavoritesListContainer from "../containers/FavoriteListContainer";
import { FavoritesProvider } from "../contexts/FavoritesProvider";
import Nav from "../components/Nav";

export default function App() {
  return (
    <FavoritesProvider>
      <div className="flex bg-slate-900 text-slate-100">
        <Router>
          <Nav />
          <Routes>
            <Route
              exact={true}
              path="/"
              element={<div>Home Placeholder</div>}
            />
            <Route
              exact={true}
              path="/my-void-elements"
              element={<div>My Void Elements Placeholder</div>}
            />
            <Route
              exact={true}
              path="/explore-void-elements"
              element={<AllProjectListContainer />}
            />
            <Route
              exact={true}
              path="/favorites"
              element={<FavoritesListContainer />}
            />
            <Route
              exact={true}
              path="/create"
              element={<div>Create Placeholder</div>}
            />
            <Route
              exact={true}
              path="/user"
              element={<div>User Placeholder</div>}
            />
          </Routes>
        </Router>
      </div>
    </FavoritesProvider>
  );
}
