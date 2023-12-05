import { useState, SyntheticEvent } from 'react'
import Select from 'react-select'
import styles from '@/styles/Table.module.css'
import { capitalize, capitalizeTitle } from '@/utils/utils'

const TableSearch = ({ filters, searchTerm, setSearchTerm }) => {
    const dropdownStyles = {
        container: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: '20rem'
        }),
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderRight: '0',
            borderLeft: '0',
            borderTop: '0',
            borderRadius: '0',
            borderBottom: state.isFocused ? '2px solid black' : '1px solid darkgrey',
            boxShadow: 'none',
            marginBottom: state.isFocused ? '-1px' : '0px',
            boxSizing: 'border-box',
            outline: 'none',
            ":hover": {
                borderColor: state.isFocused ? 'black' : 'darkgray'
            }
        }),
        placeholder: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: '130%',
            color: 'darkgray'
        }),
        input: (baseStyles) => ({
            ...baseStyles,
            fontSize: '130%'
        })
    }

    const [tableFilters, setTableFilters] = useState(() => {
        const initialStateObj = {}
        Object.keys(filters).forEach((filter) => {
            switch(filters[filter].type) {
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
                        lower: false,
                        upper: false,
                    }
                    break;
            }
        })
        //console.log('initial state obj', initialStateObj)
        return initialStateObj
    })

    const handleFilterChange = (e, context) => {
        const value = {}
        if (e.target) {
            value[e.target.name] = e.target.value
        }
        else {
            value[context.name] = e.map((option) => option.value)
        }
        setTableFilters((tableFilters) => ({
            ...tableFilters,
            ...value
        }))
    }

    const handleRangeChange = (e, bound) => {
        setTableFilters({
            ...tableFilters,
            [e.target.name]: {
                ...tableFilters[e.target.name],
                [bound]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm({
            ...searchTerm,
            ...tableFilters
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {Object.keys(filters).map((filter, i) => {
                        switch(filters[filter].type) {
                            case 'text':
                                return (
                                    <li key={`filter_${i}`}>
                                        <div
                                            className={styles.input_wrapper}
                                        >
                                            <label></label>  
                                            <input
                                                name={filter}
                                                type="text"
                                                placeholder={`Search by ${capitalize(filter)}`}
                                                placeholdertextcolor="#000"
                                                value={tableFilters[filter]}
                                                onChange={handleFilterChange}
                                            />
                                        </div>
                                    </li>
                                )
                            case 'select':
                                return (
                                    <li key={`filter_${i}`}>
                                        <Select
                                            /*unstyled*/
                                            //isMulti
                                            name={filter}
                                            options={filters[filter].options}
                                            styles={dropdownStyles}
                                            placeholder={`Filter by ${filter}`}
                                            className='basic-multi-select'
                                            classNamePrefix='select'
                                            value={filters[filter].options.filter((option) => option.value === tableFilters[filter])}
                                            onChange={handleFilterChange}
                                        />
                                    </li>
                                )
                            case 'multiSelect':
                                return (
                                    <li key={`filter_${i}`}>
                                        {/*sourceOptions.filter((option) => option.value === monsterData.source)*/}
                                        <Select
                                            /*unstyled*/
                                            isMulti
                                            name={filter}
                                            options={filters[filter].options}
                                            styles={dropdownStyles}
                                            placeholder={`Filter by ${filter}`}
                                            className='basic-multi-select'
                                            classNamePrefix='select'
                                            value={filters[filter].options.filter((option) => tableFilters[filter].indexOf(option.value) !== -1)}
                                            onChange={handleFilterChange}
                                        />
                                    </li>
                                )
                            case 'range':
                                return (
                                    <li key={`filter_${i}`}>
                                        <div
                                            className={styles.input_wrapper}
                                        >
                                            <input
                                                name={filter}
                                                type='number'
                                                value={tableFilters[filter].lower}
                                                onChange={(e) => handleRangeChange(e, 'lower')}
                                                max={tableFilters[filter].upper ? Math.min(filters[filter].max, tableFilters[filter].upper) : filters[filter].max}
                                                min={filters[filter].min}
                                            />
                                            <input
                                                name={filter}
                                                type='number'
                                                value={tableFilters[filter].upper}
                                                onChange={(e) => handleRangeChange(e, 'upper')}
                                                max={filters[filter].max}
                                                min={tableFilters[filter].lower ? Math.max(filters[filter].min, tableFilters[filter].lower) : filters[filter].min}
                                            />
                                        </div>
                                    </li>
                                )
                            default:
                        }
                    })}
                    <button></button>
                </ul>
            </form>
        </>
    )
}
export default TableSearch;