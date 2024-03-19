import styles from "@/styles/routes/Profile.module.css"
import { useAuthStore } from "@/context/authStore";
import { useParams } from "react-router-dom";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

const ProfilePanel = () => {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const changeTheme = useAuthStore((state) => state.changeTheme)
    const { tab } = useParams();

    const onChangeTheme = (newTheme) => {
        changeTheme(user.access_token, newTheme)
    }

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
                        {/*<span>{user.theme}</span>*/}
                        <div>
                            <div className={styles.option} onClick={() => onChangeTheme("default")} >
                                {user.theme === 'default' ? <FaRegCheckCircle /> : <FaRegCircle />}
                                Default
                            </div>
                            <div className={styles.option} onClick={() => onChangeTheme("ryoko")} >
                                {user.theme === 'ryoko' ? <FaRegCheckCircle /> : <FaRegCircle />}
                                Ryoko's Teahouse
                            </div>
                            <div className={styles.option} onClick={() => onChangeTheme("heliana")} >
                                {user.theme === 'heliana' ? <FaRegCheckCircle /> : <FaRegCircle />}
                                Heliana's Tavern
                            </div>
                        </div>
                        {/*<select id="themes" value={user.theme} onChange={onChangeTheme}>
                            <option value="default">Default</option>
                            <option value="ryoko">Ryoko's Teahouse</option>
                            <option value="heliana">Heliana's Tavern</option>
                        </select>*/}
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfilePanel;