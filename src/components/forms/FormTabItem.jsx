import styles from '@/styles/components/Form.module.css'
import { useState, useEffect } from 'react'

const FormTabItem = ({ tabs, contents }) => {
    const [selectedTab, setSelectedTab] = useState(tabs.findIndex((tab) => tab.default))

    const selectTabHandler = (i) => {
        if (i !== selectedTab) {
            setSelectedTab(i)
        }
    }

    useEffect(() => {
        if (tabs[selectedTab].disabled) {
            selectTabHandler(tabs.findIndex((tab) => !tab.disabled))
        }
    }, [tabs])

    useEffect(() => {
        selectTabHandler(tabs.findIndex((tab) => tab.default))
    }, [contents])

    return (
        <div
            className={styles.monsterItemContainer}
        >
            <div className={styles.tabHeader}>
                {tabs.map((tab, i) => 
                    <div className={styles.tabWrapper} key={`tab_${i}`}>
                        <button
                            className={`${styles.tab} ${selectedTab === i && styles.selected}`}
                            disabled={tab.disabled}
                            type='button'
                            onClick={() => selectTabHandler(i)}
                        >
                            {tab.name}
                        </button>
                    </div>
                )}
                {/*<div className={styles.tabWrapper}>
                    <button
                        className={`${styles.tab} ${monsterSectionToggle[index] === 'monster' && styles.selected}`}
                        disabled={thisMonsterData === undefined}
                        type='button'
                        onClick={() => handleMonsterTabSelection(index, 'monster')}
                    >
                        Monster
                    </button>
                </div>
                <div className={styles.tabWrapper}>
                    <button 
                        className={`${styles.tab} ${monsterSectionToggle[index] === 'search' && styles.selected}`}
                        type='button'
                        onClick={() => handleMonsterTabSelection(index, 'search')}
                    >
                        Search
                    </button>    
                </div>*/}
            </div>
            {contents[selectedTab]}
            {/*monsterSectionToggle[index] === 'search' &&
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
                </div>
            */}
            {/*monsterSectionToggle[index] === 'monster' && thisMonsterData &&
                <div
                    className={styles.monsterDescriptionWrapper}
                >
                    <MonsterDescription monsterData={thisMonsterData}/>    
                </div>
            */}
        </div>
    )
}
export default FormTabItem;