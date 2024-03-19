import Navbar from "@/components/Navbar";
import { Outlet } from 'react-router-dom'
import { useAuthStore } from "@/context/authStore";

const Layout = () => {
    const user = useAuthStore((state) => state.user)

    return (
        <div className={`wrapper ${user.theme}`}>
            <Navbar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                height: 'fit-content'
            }}>
                <div
                    style={{
                        width: '100%',
                        minHeight: 'calc(100vh - 11rem)',
                        height: '1px',
                        maxWidth: '1500px',
                        //backgroundColor: '#e5e9db'
                    }}
                >
                    <Outlet />    
                </div>
            </div>
        </div>
    )
}
export default Layout;