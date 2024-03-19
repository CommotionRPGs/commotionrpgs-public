import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from '@/styles/routes/Admin.module.css'
import profileStyles from '@/styles/routes/Profile.module.css'
import { FaEye } from 'react-icons/fa'
import { FaGear } from "react-icons/fa6";
import { GiMonsterGrasp, GiBoltSpellCast } from 'react-icons/gi'
import Sidebar from '@/components/Sidebar'

const Admin = () => {
    const [selectedTab, setSelectedTab] = useState("")
    const navigate = useNavigate()

    const tabs = [
        { value: "general", label: "General", symbol: <FaGear style={{width: '2rem', height: '2rem'}} />, show: true},
        { value: "spells", label: "Spells", symbol: <GiBoltSpellCast style={{width: '2rem', height: '2rem'}} />, show: true},
        { value: "monsters", label: "Monsters", symbol: <GiMonsterGrasp style={{width: '2rem', height: '2rem'}} />, show: true}
    ]

    const createTabItem = (tabItem) => {
        return (
            <div className={profileStyles.tabItemContainer} onClick={() => {
                setSelectedTab(tabItem.value)
                navigate(tabItem.value)
            }} >
                <div className={profileStyles.tabItemName} >
                    {tabItem.label}
                    {tabItem.symbol}
                </div>
                <div className={profileStyles.tabItemSelect} >
                    {tabItem.value === selectedTab && <FaEye style={{width: '1.5rem', height: '1.5rem'}} />}
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.admin} paper page`} >
            <div className={profileStyles.header} >
                {'Admin - '}     
            </div>
            <div style={{ height: 'calc(100% - 150px)'}}>
                <Sidebar 
                    tabs={tabs}
                />
            </div>
            {/*<div className={profileStyles.body} >
                <div className={profileStyles.tabBar} >
                    <div className={profileStyles.tabBar} >
                        {tabs.reduce((filtered, tab) => {
                            if (!tab.hide) {
                                filtered.push(createTabItem(tab))
                            }
                            return filtered;
                        }, [])}
                    </div>
                </div>
                <div className={profileStyles.tabContentContainer} >
                    <Outlet />
                </div>
            </div>*/}
            {/*<NavLink 
                to={'spells'}
            >
                {"Spells"}
            </NavLink>*/}
            {/*<div className={styles.borderImageTest}>
                
            </div>*/}
            
        </div>
    )
}
export default Admin;