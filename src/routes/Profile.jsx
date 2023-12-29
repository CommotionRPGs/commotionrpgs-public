import { useAuthStore } from "@/context/authStore";
import styles from '@/styles/Profile.module.css';
import { useState, useEffect } from "react";
import { capitalize } from "@/utils/utils";
import { FaUsers, FaUser, FaEye } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Sidebar from "@/components/Sidebar";

const Profile = () => {
    const user = useAuthStore((state) => state.user)

    const tabs = [
        { label: 'Overview', value: "overview", symbol: <FaUser style={{width: '2rem', height: '2rem'}} />, hide: false},
        { label: 'Preferences', value: "preferences", symbol: <FaGear style={{width: '2rem', height: '2rem'}} />, hide: false},
        { label: 'Players', value: "players", symbol: <FaUsers style={{width: '2rem', height: '2rem'}} />, hide: user.accountType === 'player'}
    ]

    return (
        <div className={styles.profile}>
            {/*<Header>
                <h1>Profile page</h1>
            </Header>*/}
            <div className={styles.header} >
                <div className={styles.left} >
                    {user.name}
                </div>
                <div className={styles.right} >
                    <div className={styles.userDetailContainer} >
                        <div className={styles.value} >
                            {user.email}
                        </div>
                        <div className={styles.label} >
                            EMAIL
                        </div>
                    </div>
                    <div className={styles.userDetailContainer} >
                        <div className={styles.value} >
                            {user.theme}
                        </div>
                        <div className={styles.label} >
                            THEME
                        </div>
                    </div>
                    <div className={styles.userDetailContainer} >
                        <div className={styles.value} >
                            {capitalize(user.account_type)}
                        </div>
                        <div className={styles.label} >
                            ACCOUNT TYPE
                        </div>
                    </div>
                    <div className={styles.userDetailContainer} >
                        <div className={styles.value} >
                            {user.players}
                        </div>
                        <div className={styles.label} >
                            NUMBER OF PLAYERS
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar tabs={tabs} />
        </div>
    )
};
export default Profile;