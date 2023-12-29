import styles from "@/styles/Sidebar.module.css"
import { useParams, NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom'
//import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa"

const Sidebar = ({tabs}) => {
    //const { tab } = useParams();
    //let location = useLocation();

    const createTabItem = (tabItem) => {
        return (
            <NavLink className={styles.tabItemContainer} onClick={() => {}} end to={tabItem.value}>
                <div className={styles.tabItemName} >
                    {tabItem.label}
                    {tabItem.symbol}
                </div>
                <div className={styles.tabItemSelect} >
                    {/*tabItem.value === selectedTab && <FaEye style={{width: '1.5rem', height: '1.5rem'}} />*/}
                    <FaEye className={styles.activeSymbol} style={{width: '1.5rem', height: '1.5rem'}} />
                </div>
            </NavLink>
        )
    }

    return (
        <div className={styles.body} >
            <div className={styles.tabBar} >
                {tabs.reduce((filtered, tab) => {
                    if (!tab.hide) {
                        filtered.push(createTabItem(tab))
                    }
                    return filtered;
                }, [])}
            </div>
            <div className={styles.tabContentContainer}>
                <Outlet />
            </div>
        </div>
    )
}
export default Sidebar;