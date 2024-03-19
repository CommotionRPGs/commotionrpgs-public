import styles from "@/styles/components/PageTurnB.module.css"
import { useState, useEffect } from "react"

const BookPage = ({index, front="Front Page", back="Back Page", flip=false}) => {
    //const [flip, setFlip] = useState(false)
    //const flippedIndex = 0;
    /*const flipCard = () => {
        setFlip(!flip)
    }*/
    const [zIndex, setZIndex] = useState(flip? 0 : index)

    useEffect(() => {
        if (!flip) {
            setZIndex(flip? 0 : index)
        }
        else {
            setTimeout(() => {
                setZIndex(flip? 0 : index)
            }, 600)
        }
    }, [flip])
    

    return (
        <div className={`${styles.flipContainer} ${flip ? styles.flip : ''}`} style={{
            zIndex: zIndex
        }}>
            <div className={styles.flipper}>
                <div className={styles.front} /*onClick={flipCard}*/>
                    <div className={`${styles.article} ${styles.bottom}`}>
                        {front}
                    </div>
                </div>
                <div className={styles.back} /*onClick={flipCard}*/>
                    <div className={`${styles.article} ${styles.top}`}>
                        {back}
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default BookPage;