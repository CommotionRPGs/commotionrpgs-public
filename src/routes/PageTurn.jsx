import InfPageLogic from "@/components/bookpages/InfPageLogic"
import {useState} from 'react'
import {mod} from '@/utils/utils'

const PageTurn = () => {
    const [flip, setFlip] = useState(false)
    const [currentPage, setCurrentPage] = useState('A')
    const [contentA, setContentA] = useState(0)
    const [contentB, setContentB] = useState(1)

    const handleNextPage = (page) => {
        //console.log(`Next to page ${page}`)
        const setNextPage = currentPage === 'A' ? setContentB : setContentA
        setNextPage(page)
        setFlip('next')
    }

    const handlePrevPage = (page) => {
        //console.log(`Prev to page ${page}`)
        const setPrevPage = currentPage === 'A' ? setContentB : setContentA
        setPrevPage(page)
        setFlip('previous')
    }

    const pageTable = [...Array(5).keys()].map((index) => {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <button onClick={() => handlePrevPage(mod((index-1),5))}>Previous Page</button>
                    {`Content ${index+1}`}
                <button onClick={() => handleNextPage(mod((index+1),5))}>Next Page</button>
            </div>
        )
    })

    /*const [currentPage, setCurrentPage] = useState({
        page: 'A',
        direction: 'next'
    })*/

    return (
        <>
            <InfPageLogic
                flip={flip}
                setFlip={setFlip}
                setCurrentPage={setCurrentPage}
            >
                {pageTable[contentA]}
                {pageTable[contentB]}
            </InfPageLogic>
        </>
    )
}

export default PageTurn;