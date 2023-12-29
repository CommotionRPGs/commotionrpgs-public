import { useState, useMemo, useEffect } from "react";
import TableBody from "@/components/table/TableBody"
import TableHead from "@/components/table/TableHead"
import TableSearch from "@/components/table/TableSearch"
import styles from "@/styles/Table.module.css"

const TableLogic = ({ data, columns, options = {} }) => {
    const [tableData, setTableData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(() => {
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
    const [sort, setSort] = useState({
        sortField: 'level',
        sortOrder: 'asc'
    })

    const textFilter = (filter, item) => item.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

    const selectFilter = (filter, item) => Array.isArray(item) 
        ? (() =>  { for (let i = 0; i < item.length; i++) { if (filter.indexOf(item[i].toLowerCase()) !== -1) return true } return false })()
        : filter.indexOf(item.toLowerCase()) !== -1;

    const rangeFilter = (filter, item) => (!filter.upper || filter.upper === '' || item <= filter.upper) && (!filter.lower || item >= filter.lower);

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

    useEffect(() => {
        //console.log('Table data updated', data)
        setTableData(handleSorting(sort, data))
    }, [data, sort])

    const filteredTableData = useMemo(() => {
        //console.log(searchTerm)
        const activeFilters = {}

        for (var key in searchTerm) {
            if (searchTerm[key] != 0)
                activeFilters[key] = searchTerm[key]
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
    }, [tableData, searchTerm])

    //console.log(searchTerm)

    return (
        <>
            {options.filter && <div className={styles.table_search}>
                <TableSearch filters={options.filter ? options.filter : {}} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>}
            <table className={styles.table}>
                {/*<caption>
                    Developers currently enrolled in this course, column headers are sortable.
                </caption>*/}
                <TableHead columns={columns} handleSorting={(sortField, sortOrder) => setSort({sortField, sortOrder})} options={options.columns ? options.columns : {}}/>
                <TableBody columns={columns} tableData={filteredTableData} rowCallbacks={options.display} columnOptions={options.columns ? options.columns : ({})} />
            </table>
        </>
    );
};
export default TableLogic;