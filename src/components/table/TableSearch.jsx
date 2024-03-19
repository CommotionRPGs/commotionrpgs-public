import { useState, SyntheticEvent } from 'react'
import Select from 'react-select'
import styles from '@/styles/components/Table.module.css'
import { capitalize, capitalizeTitle } from '@/utils/utils'
import { FaArrowRight } from 'react-icons/fa'

const TableSearch = ({ filterOptions, searchTerm, setSearchTerm, handleSubmit }) => {
    const dropdownStyles = {
        container: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: '20rem',
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
            },
            backgroundColor: 'transparent'
        }),
        placeholder: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: '130%',
            color: 'darkgray'
        }),
        input: (baseStyles) => ({
            ...baseStyles,
            fontSize: '130%'
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            backgroundImage: 'url(/src/assets/tilable-paper-texture.jpeg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '256px',
            //backgroundColor: '#e5e9db'
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? 'rgba(176, 176, 176, 0.4)' : 'none',
            ":active": {
                backgroundColor: 'rgba(176, 176, 176, 0.6)'
            }
        }),
        multiValue: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: 'rgba(176, 176, 176, 0.4)'
        })
    }

    /*const [tableFilters, setTableFilters] = useState(() => {
        const initialStateObj = {}
        Object.keys(filterOptions).forEach((filter) => {
            switch(filterOptions[filter].type) {
                case 'text':
                    initialStateObj[filter] = currentFilters[filter] ? currentFilters[filter] : ''
                    break;
                case 'select':
                    initialStateObj[filter] = currentFilters[filter] ? currentFilters[filter] : ''
                    break;
                case 'multiSelect':
                    initialStateObj[filter] = currentFilters[filter] ? currentFilters[filter] : []
                    break;
                case 'range':
                    initialStateObj[filter] = currentFilters[filter] ? currentFilters[filter] : {
                        lower: false,
                        upper: false,
                    }
                    break;
            }
        })
        //console.log('initial state obj', initialStateObj)
        return initialStateObj
    })*/

    const handleFilterChange = (e, context) => {
        console.log('Current Search Term', searchTerm)
        console.log(e)
        const value = {}
        if (e.target) {
            value[e.target.name] = e.target.value
        }
        else {
            value[context.name] = e.map((option) => option.value)
        }
        setSearchTerm({
            ...searchTerm,
            ...value
        })
    }

    const handleRangeChange = (e, bound) => {
        setSearchTerm({
            ...searchTerm,
            [e.target.name]: {
                ...searchTerm[e.target.name],
                [bound]: e.target.value
            }
        })
    }

    /*const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm({
            ...searchTerm,
            ...tableFilters
        })
    }*/
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {Object.keys(filterOptions).map((filter, i) => {
                        switch(filterOptions[filter].type) {
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
                                                value={searchTerm[filter]}
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
                                            options={filterOptions[filter].options}
                                            styles={dropdownStyles}
                                            placeholder={`Filter by ${filter}`}
                                            className='basic-multi-select'
                                            classNamePrefix='select'
                                            value={filterOptions[filter].options.filter((option) => option.value === searchTerm[filter])}
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
                                            options={filterOptions[filter].options}
                                            styles={dropdownStyles}
                                            placeholder={`Filter by ${filter}`}
                                            className='basic-multi-select'
                                            classNamePrefix='select'
                                            value={searchTerm[filter].map(option => ({ value: option, label: capitalizeTitle(option)}))/*filterOptions[filter].options.filter((option) => searchTerm[filter].indexOf(option.value) !== -1)*/}
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
                                                value={searchTerm[filter].lower}
                                                onChange={(e) => handleRangeChange(e, 'lower')}
                                                max={searchTerm[filter].upper ? Math.min(filterOptions[filter].max, searchTerm[filter].upper) : filterOptions[filter].max}
                                                min={filterOptions[filter].min}
                                            />
                                            <input
                                                name={filter}
                                                type='number'
                                                value={searchTerm[filter].upper}
                                                onChange={(e) => handleRangeChange(e, 'upper')}
                                                max={filterOptions[filter].max}
                                                min={searchTerm[filter].lower ? Math.max(filterOptions[filter].min, searchTerm[filter].lower) : filterOptions[filter].min}
                                            />
                                        </div>
                                    </li>
                                )
                            default:
                        }
                    })}
                </ul>
                <button>
                    <div>Search Spells</div>
                    <FaArrowRight />
                </button>
            </form>
        </>
    )
}
export default TableSearch;