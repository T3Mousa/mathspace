import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state?.session?.user);
  // console.log(user)
  const handleNonFunctioningLinks = () => {
    alert("Feature Coming Soon...");
  };

  return (
    <div className="navBar">
      <div className="homeButton">
        <NavLink className="homeButton" to="/">mathspace</NavLink>
      </div>
      <div className="searchBarContainer">
        {user &&
          <div className="searchBar">
            <input
              type="text"
              className="searchBarInput"
              placeholder="Search"
            />
            <div className="searchIcon">
              <div
                className="magnifyingGlass"
                onClick={handleNonFunctioningLinks}
              >
                <i className="fas fa-search" />
              </div>
            </div>
          </div>
        }
      </div>
      <div>

      </div>
      <div className="rightNavBar">
        <ProfileButton user={user} />
      </div>
    </div>
  );
}

export default Navigation;
