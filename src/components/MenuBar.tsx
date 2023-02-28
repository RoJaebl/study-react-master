import { faHouse, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "../routes/atom";

const MenuBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 20px;
    left: -60px;
    width: 70px;
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px;
    border-radius: 0px 10px 10px 0px;
    box-shadow: 1px 2px 3px 2px ${(props) => props.theme.cardBoard};
    transition: all 0.5s;
    &:hover {
        left: 0px;
    }
`;
const MenuItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: ${(props) => props.theme.textColor};
    margin: 5px;
    &:hover {
        cursor: pointer;
    }
`;
export function Menu() {
    const isDark = useRecoilValue(isDarkAtom);
    const setIsDark = useSetRecoilState(isDarkAtom);
    const homeMatch = useMatch("/");
    return (
        <MenuBar>
            <Helmet>
                <script
                    src="https://kit.fontawesome.com/eb99a9e97b.js"
                    crossOrigin="anonymous"
                ></script>
            </Helmet>
            {!homeMatch ? (
                <MenuItem className="">
                    <Link to="/">
                        <FontAwesomeIcon icon={faHouse} size="2x" />
                    </Link>
                </MenuItem>
            ) : (
                <></>
            )}

            <MenuItem onClick={() => setIsDark((current) => !current)}>
                {isDark ? (
                    <FontAwesomeIcon icon={faMoon} size="2x" />
                ) : (
                    <FontAwesomeIcon icon={faSun} size="2x" />
                )}
            </MenuItem>
        </MenuBar>
    );
}
export default Menu;
