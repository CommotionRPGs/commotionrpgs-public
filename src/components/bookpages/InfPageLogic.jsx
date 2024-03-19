import styles from "@/styles/components/PageTurnB.module.css"
import { useState, useEffect } from "react"
import CyclePage from "@/components/bookpages/CyclePage"

const InfPageLogic = ({children=['Page A', 'Page B'], flip=false, setFlip, setCurrentPage}) => {
    const [pageA, setPageA] = useState('bot')
    const [pageB, setPageB] = useState('top')
    

    const handleNextPage = () => {
        if (pageA === 'top' && pageB === 'bot') {
            setCurrentPage('A')
            setPageA('bot')
            setPageB('bt')
            setTimeout(() => {
                setPageB('top')
            }, 600)
        }
        else if (pageA === 'bot' && pageB === 'top') {
            setCurrentPage('B')
            setPageB('bot')
            setPageA('bt')
            setTimeout(() => {
                setPageA('top')
            }, 600)
        }
    }

    const handlePreviousPage = () => {
        if (pageA === 'top' && pageB === 'bot') {
            setCurrentPage('A')
            setPageA('tb')
            setTimeout(() => {
                setPageA('bot')
                setPageB('top')
            }, 600)
        }
        else if (pageA === 'bot' && pageB === 'top') {
            setCurrentPage('B')
            setPageB('tb')
            setTimeout(() => {
                setPageB('bot')
                setPageA('top')
            }, 600)
        }
    }

    useEffect(() => {
        if (flip) {
            if (pageA !== 'tb' && pageA !== 'bt' && pageB !== 'tb' && pageB !== 'bt') {
                if (flip === 'next') {
                    handleNextPage()
                }
                else if (flip === 'previous') {
                    handlePreviousPage()
                }
            }
            setFlip(false)
        }
    }, [flip])

    return (
        <div className={styles.page} /*style={{position: 'relative', left: 0}}*/>
            things and stuff
            <CyclePage pageState={pageA}>
                {/*contentA*/children[0]}
            </CyclePage>
            <CyclePage pageState={pageB}>
                {/*contentB*/children[1]}
            </CyclePage>
        </div>
    )
}

export default InfPageLogic;