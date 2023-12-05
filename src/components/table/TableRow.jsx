import { useState, Fragment } from 'react'
//import {v4 as uuidv4 } from 'uuid';

const TableRow = ({ columns, data, callbacks = {}, columnOptions }) => {
    const [expand, setExpand] = useState(false)

    const handleExpandRow = () => {
        setExpand(!expand)
    }
    
    return (
        <Fragment>
            <tr key={data["id"]} className={`clickable-row${expand ? ' expanded' : ''}`} onClick={() => callbacks['expander_content'] && handleExpandRow()}>
                {columns.map(({ accessor }) => {
                    const columnStyle = {}
                    if (columnOptions[accessor]) {
                        if (columnOptions[accessor].minimize) {
                            columnStyle.width = "0.1%",
                            columnStyle.whiteSpace = 'nowrap'
                        }
                    }

                    return (<td key={accessor} style={columnStyle} >
                    {callbacks[accessor] ? callbacks[accessor](data) : (data[accessor] ? data[accessor].toString() : "--")}
                </td>)})}
            </tr>
            {expand && callbacks['expander_content'] &&
                <tr key={data["id"]+"_expanded"} style={{paddingTop: '12px!important'}}>
                    <td key={data["id"]+"_expander"} colSpan={columns.length} style={{margin: '10px'}}>
                        {callbacks['expander_content'](data)}
                        {/*data["description"].map((paragraph) => 
                            <p className="clickable-row-expansion" key={uuidv4()}>
                                {paragraph["title"] !== 'untitled' && 
                                    <strong><em>{paragraph["title"]+" "}</em></strong>
                                }
                                {paragraph["content"]}
                                <br />
                            </p>
                            )*/}
                    </td>
                </tr> 
            }
        </Fragment>
    )
}
export default TableRow;