import { useState } from 'react'
import styles from "@/styles/components/Collapsible.module.css"

const Collapsible = ({ header, content }) => {
    const [collapsed, setCollapsed] = useState(true)

    const handleExpand = () => {
        setCollapsed(false)
    }

    const handleCollapse = () => {
        setCollapsed(true)
    }

    return (
        <div onMouseEnter={handleExpand} onMouseLeave={handleCollapse} >
            <div className={styles.header}>
                {header}
            </div>
            <div className={`${styles.content} ${collapsed ? '' : styles.expanded}`} >
                {content}
            </div>
        </div>
    )
}
export default Collapsible;