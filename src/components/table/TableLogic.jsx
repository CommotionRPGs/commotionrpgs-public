import { useState, useMemo, useEffect } from "react";
import TableBody from "@/components/table/TableBody"
import TableHead from "@/components/table/TableHead"
import TableSearch from "@/components/table/TableSearch"
import styles from "@/styles/components/Table.module.css"
import { TbArrowLeft, TbArrowRight } from "react-icons/tb"
import InfPageLogic from "@/components/bookpages/InfPageLogic";

const TableLogic = ({ data, columns, options = {}, pagination = false/*{ pageSize: 20 }*/ }) => {
    const [tableData, setTableData] = useState([]);
    const [pageA, setPageA] = useState(1);
    const [pageB, setPageB] = useState(1);
    const [currentPage, setCurrentPage] = useState('A')
    const [flip, setFlip] = useState(false)

    const [searchTerm, setSearchTerm] = options.persist
    ? [options.persist.filter, options.persist.setFilter]
    : useState(() => {
        const initialStateObj = {}
        if (options.filter)
            Object.keys(options.filter).forEach((filter) => {
                switch(options.filter[filter].type) {
                    case 'text':
                        initialStateObj[filter] = ''
                        break;
                    case 'select':
                        initialStateObj[filter] = ''
                        break;
                    case 'multiSelect':
                        initialStateObj[filter] = []
                        break;
                    case 'range':
                        initialStateObj[filter] = {
                            lower: "",
                            upper: "",
                        }
                        break;
                }
            })
        //console.log('initial state obj', initialStateObj)
        return initialStateObj
    });

    const [activeSearchTerm, setActiveSearchTerm] = useState(searchTerm)

    const [sort, setSort] = options.persist 
    ? [options.persist.sort, options.persist.setSort]
    : useState({
        sortField: columns[0].accessor, //'level',
        sortOrder: 'asc'
    })

    const textFilter = (filter, item) => item.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

    const selectFilter = (filter, item) => Array.isArray(item) 
        ? (() =>  { for (let i = 0; i < item.length; i++) { if (filter.indexOf(item[i].toLowerCase()) !== -1) return true } return false })()
        : filter.indexOf(item.toLowerCase()) !== -1;

    const rangeFilter = (filter, item) => {
        if ((filter.upper !== 0 && !filter.upper) && (filter.lower !== 0 && !filter.lower))
            return true
        //console.log(filter)
        return (!filter.upper || filter.upper === '' || item <= filter.upper) && (!filter.lower || item >= filter.lower);
    }

    const handleSorting = ({sortField, sortOrder}, data) => {
        //console.log(sortField, sortOrder)
        if (sortField) {
            const sorted = [...data].sort((a, b) => {
                if (a[sortField] === null && b[sortField] === null) return 0;
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                const primarySort = a[sortField].toString().trim().localeCompare(b[sortField].toString().trim(), "en", {
                    numeric: true,
                }) * (sortOrder === "asc" ? 1 : -1)
                if (primarySort === 0 && a['name']) {
                    return a['name'].toString().trim().localeCompare(b['name'].toString().trim(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                }
                return primarySort;
            });
            return sorted //setTableData(sorted);
        }
        return data
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setActiveSearchTerm(searchTerm)
        nextPage(1)
    }

    useEffect(() => {
        setSearchTerm({...(
            () => {
                const initialStateObj = {}
                if (options.filter)
                    Object.keys(options.filter).forEach((filter) => {
                        switch(options.filter[filter].type) {
                            case 'text':
                                initialStateObj[filter] = ''
                                break;
                            case 'select':
                                initialStateObj[filter] = ''
                                break;
                            case 'multiSelect':
                                initialStateObj[filter] = []
                                break;
                            case 'range':
                                initialStateObj[filter] = {
                                    lower: "",
                                    upper: "",
                                }
                                break;
                        }
                    })
                console.log('initial state obj', initialStateObj)
                return initialStateObj
            }
        ), ...searchTerm})
        if (options.persist) {
            options.persist.setSort({
                sortField: columns[0].accessor, //'level',
                sortOrder: 'asc'
            })    
        }
    }, [])

    useEffect(() => {
        if (sort) {
            setTableData(handleSorting(sort, data))
        }
        else {
            setTableData(handleSorting({undefined, undefined}, data))
        }
    }, [data, sort])

    const filteredTableData = useMemo(() => {
        //console.log(searchTerm)
        const activeFilters = {}

        for (var key in activeSearchTerm) {
            if (activeSearchTerm[key] != 0)
                activeFilters[key] = activeSearchTerm[key]
        }

        const filteredData = tableData.filter((item) => {
            for (var key in activeFilters) {
                //console.log('filter: ', activeFilters[key] )
                //console.log('value: ', item[key])
                //console.log('range upper filter result: ', (!item.upper || item <= filter.upper))
                switch (options.filter[key].type) {
                    case 'text':
                        if (!textFilter(activeFilters[key], item[key]))
                            return false
                        break;
                    case 'select':
                        if (!selectFilter(activeFilters[key], item[key]))
                            return false
                        break;
                    case 'multiSelect':
                        if (!selectFilter(activeFilters[key], item[key]))
                            return false
                        break;
                    case 'range':
                        //console.log("acitve filter", activeFilters[key], "and item", item[key])
                        if (!rangeFilter(activeFilters[key], item[key]))
                            return false
                        break;
                }
            }

            return true
        })
        
        return filteredData;
    }, [tableData, activeSearchTerm])

    const nextPage = (page) => {
        const setNextPage = currentPage === 'A' ? setPageB : setPageA
        setNextPage(page)
        setFlip('next')
    }
    
    const prevPage = (page) => {
        const setPrevPage = currentPage === 'A' ? setPageB : setPageA
        setPrevPage(page)
        setFlip('previous')
    }

    return (
        <>
            {pagination
            ? <InfPageLogic
                flip={flip}
                setFlip={setFlip}
                setCurrentPage={setCurrentPage}
            >
                <>
                    {options.title}
                    {options.filter && <div className={styles.table_search}>
                        <TableSearch filterOptions={options.filter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} currentFilters={options.persist ? options.persist.filter : {}} handleSubmit={handleSearchSubmit}/>
                    </div>}
                    <table className={styles.table}>
                        <TableHead columns={columns} handleSorting={(sortField, sortOrder) => setSort({sortField, sortOrder})} options={options.columns ? options.columns : {}}/>
                        <TableBody columns={columns} tableData={filteredTableData.slice(pagination.pageSize*(pageA-1), pagination.pageSize*pageA)} rowCallbacks={options.display} columnOptions={options.columns ? options.columns : ({})} />
                    </table>
                    <div className={styles.footer}>
                        <button disabled={pageA===1} onClick={() => prevPage(pageA-1)} >
                            <TbArrowLeft style={{ height: '1.5rem', width: '1.5rem'}} />
                        </button>
                        <div>{`${pageA}/${Math.ceil(filteredTableData.length/pagination.pageSize)}`}</div>
                        <button disabled={pageA >= Math.ceil(filteredTableData.length/pagination.pageSize)} onClick={() => nextPage(pageA+1)} >
                            <TbArrowRight style={{ height: '1.5rem', width: '1.5rem'}}/>    
                        </button>
                    </div>
                </>
                <>
                    {options.title}
                    {options.filter && <div className={styles.table_search}>
                        <TableSearch filterOptions={options.filter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} currentFilters={options.persist ? options.persist.filter : {}} handleSubmit={handleSearchSubmit}/>
                    </div>}
                    <table className={styles.table}>
                        <TableHead columns={columns} handleSorting={(sortField, sortOrder) => setSort({sortField, sortOrder})} options={options.columns ? options.columns : {}}/>
                        <TableBody columns={columns} tableData={filteredTableData.slice(pagination.pageSize*(pageB-1), pagination.pageSize*pageB)} rowCallbacks={options.display} columnOptions={options.columns ? options.columns : ({})} />
                    </table>
                    <div className={styles.footer}>
                        <button disabled={pageB===1} onClick={() => prevPage(pageB-1)} >
                            <TbArrowLeft style={{ height: '1.5rem', width: '1.5rem'}} />
                        </button>
                        <div>{`${pageB}/${Math.ceil(filteredTableData.length/pagination.pageSize)}`}</div>
                        <button disabled={pageB >= Math.ceil(filteredTableData.length/pagination.pageSize)} onClick={() => nextPage(pageB+1)} >
                            <TbArrowRight style={{ height: '1.5rem', width: '1.5rem'}}/>    
                        </button>
                    </div>
                </>
            </InfPageLogic>
            : <>
                {options.title}
                {options.filter && <div className={styles.table_search}>
                    <TableSearch filterOptions={options.filter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} currentFilters={options.persist ? options.persist.filter : {}} handleSubmit={handleSearchSubmit}/>
                </div>}
                <table className={styles.table}>
                    <TableHead columns={columns} handleSorting={(sortField, sortOrder) => setSort({sortField, sortOrder})} options={options.columns ? options.columns : {}}/>
                    <TableBody columns={columns} tableData={filteredTableData} rowCallbacks={options.display} columnOptions={options.columns ? options.columns : ({})} />
                </table>
            </>
            }
            {/*options.filter && <div className={styles.table_search}>
                <TableSearch filterOptions={options.filter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} currentFilters={options.persist ? options.persist.filter : {}} />
            </div>*/}
            {/*<table className={styles.table}>
                <TableHead columns={columns} handleSorting={(sortField, sortOrder) => setSort({sortField, sortOrder})} options={options.columns ? options.columns : {}}/>
                <TableBody columns={columns} tableData={filteredTableData.slice(pagination.pageSize*(currentPage-1), pagination.pageSize*currentPage)} rowCallbacks={options.display} columnOptions={options.columns ? options.columns : ({})} />
            </table>
            <div className={styles.footer}>
                <button disabled={currentPage===1} onClick={() => setCurrentPage(currentPage-1)} >
                    <TbArrowLeft style={{ height: '1.5rem', width: '1.5rem'}} />
                </button>
                <div>{currentPage}</div>
                <button disabled={currentPage >= Math.ceil(filteredTableData.length/pagination.pageSize)} onClick={() => setCurrentPage(currentPage+1)} >
                    <TbArrowRight style={{ height: '1.5rem', width: '1.5rem'}}/>    
                </button>
            </div>*/}
        </>
    );
};
export default TableLogic;