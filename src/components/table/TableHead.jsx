import { useState } from "react";
import {
    TbBaselineDensityMedium,
    TbSortAscending,
    TbSortDescending,
    TbAlignCenter
} from 'react-icons/tb'

const TableHead = ({ columns, handleSorting, options }) => {
    const [sortField, setSortField] = useState("")
    const [order, setOrder] = useState("asc");
    const iconStyle = {
        color: "#5e5e5e",
        fontSize: "16px"
    }

    const handleSortingChange = (accessor) => {
        //console.log(accessor);
        const sortOrder = 
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    }

    return (
        <thead>
            <tr>
                {columns.map(({ label, accessor, sortable }) => {
                    //console.log(accessor, options[accessor])
                    const columnStyle = {}
                    if (options[accessor]) {
                        if (options[accessor].minimize) {
                            columnStyle.width = "0.1%",
                            columnStyle.whiteSpace = 'nowrap'
                        }
                    }
                    return (
                        <th 
                            key={accessor}
                            onClick={sortable ? () => handleSortingChange(accessor) : null}
                            style={columnStyle}
                        >
                            {label}
                            {sortable && <span style={{marginLeft: "10px", float: "right"}}>
                                {sortField === accessor && order === "asc" ? (
                                    <TbSortAscending style={iconStyle}/>
                                ) : sortField === accessor && order === "desc" ? (
                                    <TbSortDescending style={iconStyle}/>
                                ) : (
                                    <TbAlignCenter style={iconStyle}/>
                                )}    
                            </span>}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};
export default TableHead;