import { useState, useEffect } from 'react'
import TextAreaAutoSize from 'react-textarea-autosize'
import styles from '@/styles/Form.module.css'
import { TbCaretUp, TbCaretDown } from 'react-icons/tb'
import { MdRemoveCircleOutline, MdAddCircleOutline } from 'react-icons/md'
import { GiQuillInk } from 'react-icons/gi'
import Dropdown from '@/components/Dropdown'
//import monsters from '@/data/monsters'
import MonsterDescription from '@/components/descriptions/MonsterDescription'
import FormTabItem from '@/components/forms/FormTabItem'
import { useMonsterStore } from '@/context/monsterStore'

const FormContentSection = ({ sectionName, section, changeSection, addSection, removeSection, moveSection, editMonster, allowedSections = ["titled", "untitled", "list", "table", "monster"] }) => {
    const monsters = useMonsterStore((state) => state.monsters)
    const [editing, setEditing] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    const iconButtonStyles = {
        width: '1.5rem',
        height: '1.5rem',
    }

    const addToTable = (type = 'row') => {
        if (type === 'row') {
            addSection('row', [], section[0].map(_ => []))
        }
        else if (type === 'col') {
            changeSection(section.map(row => row.concat([[]])), [])
        }
    }

    const handleMonsterSearch = (name, index) => {
        // console.log(`Search for monster with the name: ${name}`)
        // console.log(monsters)
        const result = monsters.find(m => m.name.toLowerCase().indexOf(name) !== -1)
        // console.log(`Got the result : ${result}`)
        if (result !== undefined) {
            changeSection(result.id, [index, "content"])
        }
    }

    const buildSectionItem = (index, item) => {
        return (
            <div
                key={sectionName + '_' + index}
                className={styles.sectionItemContainer}
            >
                { editing && 
                    <div
                        className={styles.sectionItemEditContainer}
                    >
                        <button
                            className={styles.iconButton}
                            type='button'
                            disabled={index === 0 ? true : false}
                            onClick={() => moveSection(-1, [index])}
                        >
                            <TbCaretUp style={iconButtonStyles} />
                        </button>
                        <button
                            className={styles.iconButton}
                            type='button'
                            onClick={() => {
                                if (section.length === 1) {
                                    setEditing(false)
                                }
                                removeSection([index])
                            }}
                        >
                            <MdRemoveCircleOutline style={{...iconButtonStyles, color: 'red' }} />
                        </button>
                        <button
                            className={styles.iconButton}
                            type='button'
                            disabled={section.length-1 === index ? true : false}
                            onClick={() => moveSection(1, [index])}
                        >
                            <TbCaretDown style={iconButtonStyles} />
                        </button>
                    </div>
                }
                {(() => {
                    switch(true) {
                        case item.title === 'monster': 
                            return (
                                buildSectionMonsterContent(index, item)
                            )
                        case sectionName === 'Table':
                            return (
                                buildSectionItemRowContent(index, item)
                                //item.map((value) => buildSectionItemUntitledContent(index, {content: value}))
                                //buildSectionItemUntitledContent(index, { content: item })
                            )
                        case item.title === 'table':
                            return (
                                buildSectionItemTableContent(index, item)
                            )
                        case item.title === 'list':
                            return (
                                buildSectionItemListContent(index, item)
                            )
                        case item.title === 'untitled':
                            return (
                                buildSectionItemUntitledContent(index, item)
                            )
                        default:
                            return (
                                buildSectionItemNormalContent(index, item)
                            )
                    }
                })()}
            </div>
        )
    }

    const buildSectionItemNormalContent = (index, item) => {
        return (
            <div
                className={`${styles.multiInputContainer} ${styles.vertical}`}
            >
                {section[index].title !== 'untitled' && <div
                    className={styles.inputWrapper}
                >
                    <input
                        name={sectionName}
                        type="text"
                        value={item.title}
                        onChange={(e) => changeSection(e.target.value, [index, 'title'])}
                        style={{
                            fontWeight: 'bold'
                        }}
                    />
                </div>}
                <div
                    className={styles.inputWrapper}
                >
                    <TextAreaAutoSize
                        name={sectionName}
                        type="text"
                        value={item.content}
                        onChange={(e) => changeSection(e.target.value, [index, 'content'])}
                        style={{
                            overflow: 'hidden',
                            padding: '5px',
                            width: '100%'
                        }}
                    />
                </div>
            </div>
        )
    }

    const buildSectionItemUntitledContent = (index, item) => {
        return (
            <div
                className={styles.inputWrapper}
            >
                <TextAreaAutoSize
                    name={sectionName}
                    type="text"
                    value={item.content}
                    onChange={(e) => changeSection(e.target.value, [index, 'content'])}
                    style={{
                        overflow: 'hidden',
                        padding: '5px',
                        width: '100%'
                    }}
                />
            </div>
        )
    }

    const buildSectionItemListContent = (index, item) => {
        return (
            <FormContentSection
                sectionName='List'
                section={item.content}
                changeSection={(value, i) => changeSection(value, [index, 'content'].concat(i))}
                addSection={(type, i, p) => addSection(type, [index, 'content'].concat(i), p)}
                removeSection={(i) => removeSection([index, 'content'].concat(i))}
            />
        )
    }

    const buildSectionItemTableContent = (index, item) => {
        return (
            <FormContentSection 
                sectionName='Table'
                section={item.content}
                changeSection={(value, i) => changeSection(value, [index, 'content'].concat(i))}
                addSection={(type, i, p) => addSection(type, [index, 'content'].concat(i), p)}
                removeSection={(i) => removeSection([index, 'content'].concat(i))}
            />
        )
    }

    const buildSectionItemRowContent = (index, item) => {
        return (
            <div
                className={`${styles.multiInputContainer} ${styles.vertical}`}
            >
                <strong>{`Row ${index}:`}</strong>
                {item.map((value, i) => {
                    return (
                        <div
                            key={`table_${index}_${i}`}
                            className={styles.inputWrapper}
                        >
                            <TextAreaAutoSize
                                name={sectionName}
                                type="text"
                                value={value}
                                onChange={(e) => changeSection(e.target.value, [index, i])}
                                style={{
                                    overflow: 'hidden',
                                    padding: '5px',
                                    width: '100%'
                                }}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    const buildSectionMonsterContent = (index, item) => {
        //console.log(index, ' ', monsterSectionToggle)
        const thisMonsterData = monsters.find(m => m.id === item.content)
        //console.log(thisMonsterData)
        return (
            <FormTabItem 
                tabs={[
                    {
                        name: 'Monster',
                        disabled: thisMonsterData === undefined,
                        default: thisMonsterData !== undefined
                    },
                    {
                        name: 'Search',
                        disabled: false,//thisMonsterData === undefined,
                        default: thisMonsterData === undefined
                    },
                    {
                        name: 'Edit/Create',
                        disabled: false,
                        default: false
                    }
                ]}
                contents={[
                    <div
                        className={styles.monsterDescriptionWrapper}
                    >
                        {thisMonsterData && <MonsterDescription monsterData={thisMonsterData}/>}
                    </div>,
                    <div
                        className={styles.inputWrapper}
                    >
                        <input
                            name={sectionName}
                            type="text"
                            //value={item.content}
                            //onChange={(e) => changeSection(e.target.value, [index, 'title'])}
                            placeholder='Search for monsters...'
                            onKeyDown={(e) => e.code === 'Enter' && handleMonsterSearch(e.target.value, index)}
                            style={{
                                fontWeight: 'bold'
                            }}
                        />
                    </div>,
                    <button type="button" onClick={() => editMonster(false, (id) => {
                        //console.log("callback function gave us id ", id)
                        changeSection(id, [index, "content"])
                    })}>Edit</button>
                ]}
            />
        )
    }

    const buildAddDropdown = () => {
        const normalButton = <button className={styles.dropdownButton} key='dropdownButtonNormal' type='button' onClick={() => addSection('', [])}> Titled </button>
        const untitledButton = <button className={styles.dropdownButton} key='dropdownButtonUntitled' type='button' onClick={() => addSection('untitled', [])}> Untitled </button>
        const listButton = <button className={styles.dropdownButton} key='dropdownButtonList' type='button' onClick={() => addSection('list', [])}> List </button>
        const tableButton = <button className={styles.dropdownButton} key='dropdownButtonTable' type='button' onClick={() => addSection('table', [])}> Table </button>
        const monsterButton = <button className={styles.dropdownButton} key='dropdownButtonMonster' type='button' onClick={() => addSection('monster', [])}> Monster </button>
        const rowButton = <button className={styles.dropdownButton} key='dropdownButtonRow' type='button' onClick={() => addToTable('row')}> Row </button>
        const colButton = <button className={styles.dropdownButton} key='dropdownButtonCol' type='button' onClick={() => addToTable('col')}> Column </button>
        let buttons = []
        switch(sectionName) {
            case 'Table':
                buttons.push(rowButton, colButton)
                break;
            case 'List':
                buttons.push(normalButton, untitledButton)
                break;
            default:
                allowedSections.forEach((section) => {
                    switch(section) {
                        case "titled":
                            buttons.push(normalButton)
                            break;
                        case "untitled":
                            buttons.push(untitledButton)
                            break;
                        case "list":
                            buttons.push(listButton)
                            break;
                        case "table":
                            buttons.push(tableButton)
                            break;
                        case "monster":
                            buttons.push(monsterButton)
                            break;
                    }
                })
                //buttons.push(normalButton, untitledButton, listButton, tableButton, monsterButton)
        }
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {buttons}
            </div>
        )
    }

    const buildSectionHeader = () => {
        return (
            <div
                className={styles.sectionHeaderContainer}
            >
                <h4>{sectionName}:</h4>
                <button
                    className={styles.iconButton}
                    type='button'
                    onClick={() => setEditing(section.length > 0 ? !editing : false)}
                    style={{
                        backgroundColor: editing ? 'black' : 'transparent',
                        color: editing ? 'white' : 'black'
                    }}
                >
                    <GiQuillInk 
                        style={{
                            width: '1.5rem',
                            height: '1.5rem'
                        }}
                    />
                </button>
                <div
                    style={{ position: 'relative' }}
                    //onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <button
                        className={styles.iconButton}
                        type='button'
                        onClick={() => /*sectionName === 'Table' ? addToTable('col') : addSection('', [])*/setShowDropdown(true)}
                    >
                        <MdAddCircleOutline 
                            style={{
                                width: '1.5rem',
                                height: '1.5rem',
                            }}
                        />
                    </button>
                    {showDropdown && <Dropdown
                        style={{
                            transform: 'translate(-50%, 0)',
                            left: 'calc(15px - 4.5rem)',
                            bottom: 0
                        }}
                    >
                        {buildAddDropdown()}
                    </Dropdown>}
                </div>
                
            </div>
        )
    }

    const buildSectionContent = () => {
        return (
            <div
                className={styles.sectionContentContainer}
            >
                {sectionName === 'List' || sectionName === 'Table'
                    ? <ul
                        style={{
                            listStyleType: 'none',
                        }}
                    >
                        {section.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    style={{
                                        paddingLeft: "50px",
                                        marginBottom: '10px',
                                    }}
                                >
                                    {buildSectionItem(index, item)}
                                </li>
                            )
                        })}
                    </ul>
                    : section.map((item, index) => buildSectionItem(index, item))
                }
            </div>
        )
    }

    return (
        <div
            style={{
                width: '100%',
            }}
        >
            {buildSectionHeader()}
            {buildSectionContent()}
        </div>
    )
}
export default FormContentSection;