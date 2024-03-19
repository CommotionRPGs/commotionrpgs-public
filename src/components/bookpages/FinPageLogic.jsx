import styles from "@/styles/components/PageTurnB.module.css"
import { useState } from "react"
import BookPage from "@/components/bookpages/BookPage"
import CyclePage from "@/components/bookpages/CyclePage"

const FinPageLogic = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const maxPages = 3

    return (
        <div className={styles.page}>
            {Array(maxPages).fill(0).map((_, i) => {
                return <BookPage index={maxPages+1-i} front={<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <button onClick={() => setCurrentPage(currentPage-1)} disabled={i === 0}>Previous Page</button>
                    <button onClick={() => setCurrentPage(currentPage+1)} disabled={i+1 === maxPages}>Next Page</button>
                </div>} back={`Page ${i+1} Back`} flip={i+1 < currentPage}/>
            })}
        </div>
    )
}
export default FinPageLogic;