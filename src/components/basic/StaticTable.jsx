import styles from "@/styles/components/StaticTable.module.css"

const StaticTable = ({data, title=""}) => {
    const buildRows = (rows, header=false) => {
        return (rows.map((row, j) => {
            return (
                <tr key={`tablebody_${j}`} className={header ? "" : styles.row}>
                    {row.map((cell, i) => {
                        let cellContent = "--"
                        let colSpan = 1
                        let rowSpan = 1
                        if (j === 0 && header && data.spans && data.spans[i]) {
                            colSpan = data.spans[i][0]
                            rowSpan = data.spans[i][1]
                        }
                        if (cell != undefined) {
                            if (cell.content) {
                                cellContent = cell.content
                                colSpan = cell.span.col
                                rowSpan = cell.span.row
                            }
                            else {
                                cellContent = cell
                            }
                        }
                        return (
                            header
                            ? <th key={`tablebody_${j}_${i}`} colSpan={colSpan} rowSpan={rowSpan} >
                                {cellContent}
                            </th>
                            : <td key={`tablebody_${j}_${i}`} colSpan={colSpan} rowSpan={rowSpan} >
                                {cellContent}
                            </td>
                        )
                    })}
                </tr>
            )
        }))
    }

    return (
        <div className={styles.tableWrapper} >
            {title}
            <table className={styles.table} >
                <thead>
                    {buildRows(data.header, true)}
                </thead>
                <tbody>
                    {buildRows(data.body)}
                </tbody>
            </table>
            {data.footer}
        </div>
    )
}

export default StaticTable;