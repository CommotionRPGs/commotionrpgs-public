import styles from "@/styles/components/Excerpt.module.css"

const Excerpt = ({ children }) => {
    return (
        <div className={styles.excerpt}>
            <div className={styles.header} >
                <div />
                <div />
            </div>
            <div className={styles.content} >
                {children}
            </div>
            <div className={styles.footer} >
                <div />
                <div />
            </div>
        </div>
    )
}

export default Excerpt;