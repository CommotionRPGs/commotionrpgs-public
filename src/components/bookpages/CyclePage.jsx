import styles from "@/styles/components/PageTurnB.module.css"
import { useState, useEffect } from "react"

const CyclePage = ({children, pageState='bot'}) => {

    const [zIndex, setZIndex] = useState(pageState === 'bot' ?  1 : 0)
    const strToClass = {
        'bot': styles.bot,
        'top': styles.top,
        'tb': styles.tb,
        'bt': styles.bt
    } 

    useEffect(() => {
        switch(pageState) {
            case 'bot':
                setZIndex(1)
                break;
            case 'top':
                setZIndex(0)
                break;
            case 'tb':
                setZIndex(2)
                break;
            case 'bt':
                setZIndex(2)
                break;
        }
    }, [pageState])

    return (
        <div className={`${styles.flipContainer} ${strToClass[pageState]}`} style={{
            zIndex: zIndex
        }}>
            <div className={`${styles.flipper}`}>
                <div className={styles.scale}>
                    <div className={styles.front} /*onClick={flipCard}*/>
                        <div className={`${styles.article} ${styles.bottom} paper`}>
                            {children}
                        </div>
                    </div>
                    {/*<div className={styles.back} onClick={flipCard}>
                        <div className={`${styles.article} ${styles.top}`}>
                            {back}
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>    
    )
}

export default CyclePage;