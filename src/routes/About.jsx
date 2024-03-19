import { NavLink, Outlet } from "react-router-dom";
import Header from "@/components/basic/Header";
import MonsterDescription from "@/components/descriptions/MonsterDescription";
import monsters from '@/data/monsters'

const About = () => {
    return <>
        <Header>
            <h1>About page.</h1>
        </Header>
        <div /*className="about"*/>
            <MonsterDescription monsterData={monsters[1]} />
            {/*<ul className="about_list">
                <li>
                    <NavLink to="about-app">About App</NavLink>
                </li>
                <li>
                    <NavLink to="about-developer">About developer</NavLink>
                </li>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
            </ul>*/}
            <Outlet />
        </div>
    </>
};
export default About;