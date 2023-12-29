import styles from "@/styles/Profile.module.css"
import { useAuthStore } from "@/context/authStore";
import { useParams } from "react-router-dom";

const ProfilePanel = () => {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const { tab } = useParams();

    console.log("tab", tab)

    return (
        <div className={styles.tabContentContainer} >
            {tab === 'overview' &&
                <div className={styles.section} >
                    <div className={styles.title} >
                        Personal Information
                    </div>
                    <div className={styles.item} >
                        <span>Username</span>
                        <span>{user.name}</span>
                    </div>
                    <div className={styles.item} >
                        <span>Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div className={styles.item} >
                        <span>Password</span>
                        <div className={styles.btn} >Change Password</div>
                    </div>
                    <div className={styles.item} >
                        <span></span>
                        <div className={styles.btn} onClick={logout} >Logout</div>
                    </div>
                </div>
            }
            {tab === 'preferences' &&
                <div className={styles.section} >
                    <div className={styles.title} >
                        Appearance
                    </div>
                    <div className={styles.item} >
                        <span>Theme</span>
                        <span>{user.theme}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfilePanel;