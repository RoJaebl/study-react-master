import { faHouse, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 20px;
    left: -60px;
    width: 70px;
    background-color: white;
    padding: 5px;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 1px 2px 3px 2px rgba(38, 50, 56, 0.5);
    transition: all 0.5s;
    &:hover {
        left: 0px;
        transition: all 0.4s;
    }
`;
const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: rgb(38, 50, 56);
    margin: 5px;
`;

export function Menu() {
    return (
        <MenuBar>
            <Helmet>
                <script
                    src="https://kit.fontawesome.com/eb99a9e97b.js"
                    crossOrigin="anonymous"
                ></script>
            </Helmet>
            <MenuItem className="">
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} size="2x" />
                </Link>
            </MenuItem>
            <MenuItem>
                {/* <FontAwesomeIcon icon={faSun} size="2x" /> */}
                <FontAwesomeIcon icon={faMoon} size="2x" />
            </MenuItem>
        </MenuBar>
    );
}
export default Menu;
