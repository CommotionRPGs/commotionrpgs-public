import styles from "@/styles/components/Header.module.css"

function Header({children, variant=0}) {
    const variantClasses = {
        0: "",
        1: "variant1"
    }

    return (
        <header className={`${styles.header} ${styles[variantClasses[variant]]}`}>
            {children} 
            <div className={styles.stroke} />
        </header>
    );
};
export default Header;