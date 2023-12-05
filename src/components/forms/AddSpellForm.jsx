import { useState, useEffect } from 'react'
//import SpellDescription from './SpellDescription'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import TextAreaAutoSize from 'react-textarea-autosize'
import FormContentSection from '@/components/forms/formContentSection'
import styles from '@/styles/Form.module.css'
import AddMonsterForm from '@/components/forms/AddMonsterForm'
import { useMonsterStore } from '@/context/monsterStore'
import {v4 as uuidv4 } from 'uuid';
import {
    sources,
    spell_levels,
    spell_schools,
    classes
} from '@/data/configs/dataConfigs';
import { capitalize, capitalizeTitle } from '@/utils/utils'
import { useDBAuthStore } from '@/context/authStore'

const AddSpellForm = ({ formPrefill, handleFormSubmit, handleFormCancel}) => {
    const editMonster = useMonsterStore((state) => state.editMonster)
    const addMonster = useMonsterStore((state) => state.addMonster)
    const dbUser = useDBAuthStore((state) => state.dbUser)

    const [spellData, setSpellData] = useState(formPrefill ? formPrefill : {
        id: uuidv4(),
        level: 0,
        name: "",
        school: ["Conjuration"],
        ritual: false,
        casting_time: "1 Action",
        range: "60 feet",
        concentration: false,
        duration: "Instantaneous",
        components: [],
        classes: [],
        source: "Player's Handbook",
        description: [
            {
                "title": "untitled",
                "content": ""
            }
        ]
    })
    const [editingMonster, setEditingMonster] = useState(false)
    const [editMonsterCallback, setEditMonsterCallback] = useState({ callback: () => console.log('No callback')})

    const textAreaStyle = {
        overflow: 'hidden',
        padding: '5px',
        minWidth: 0,
        width: 'fit-content',
    }
    /*
    const sourceOptions = sources.map((source) => ({ value: source, label: capitalizeTitle(source) }))
    const sizeOptions = sizes.map((size) => ({ value: size, label: capitalize(size) }))
    const creature_typeOptions = creature_types.map((type) => ({ value: type, label: capitalize(type) }))
    const abilityOptions = abilities.map((ability) => ({ value: ability, label: capitalize(ability) }))
    const damage_typeOptions = damage_types.map((damage_type) => ({ value: damage_type, label: capitalize(damage_type) }))
    const skillOptions = skills.map((skill) => ({ value: skill, label: capitalize(skill) }))
    const conditionOptions = conditions.map((condition) => ({ value: condition, label: capitalize(condition) }))
    const senseOptions = senses.map((sense) => ({ value: sense, label: capitalize(sense) }))
    const languageOptions = languages.map((language) => ({ value: language, label: capitalize(language) }))
    const skillAbilities = skill_to_ability
    */

    const sourceOptions = sources.map((source) => ({ value: source, label: capitalizeTitle(source) }))

    const levelOptions = spell_levels
    /*[
        { value: 0, label: "Cantrip" },
        { value: 1, label: "1st-level" },
        { value: 2, label: "2nd-level" },
        { value: 3, label: "3rd-level" },
        { value: 4, label: "4th-level" },
        { value: 5, label: "5th-level" },
        { value: 6, label: "6th-level" },
        { value: 7, label: "7th-level" },
        { value: 8, label: "8th-level" },
        { value: 9, label: "9th-level" }
    ]*/

    const schoolOptions = spell_schools.map((school) => ({ value: school, label: capitalize(school) }))
    /*[
        { value: 'abjuration', label: 'Abjuration' },
        { value: 'conjuration', label: 'Conjuration' },
        { value: 'divination', label: 'Divination' },
        { value: 'enchantment', label: 'Enchantment' },
        { value: 'evocation', label: 'Evocation' },
        { value: 'illusion', label: 'Illusion' },
        { value: 'necromancy', label: 'Necromancy' },
        { value: 'transmutation', label: 'Transmutation' }
    ]*/

    const castingTimeOptions = [
        { value: '1 Action', label: '1 Action' },
        { value: '1 Bonus Action', label: '1 Bonus Action' },
        { value: '1 Reaction', label: '1 Reaction' },
        { value: '1 Minute', label: '1 Minute' },
        { value: '10 Minutes', label: '10 Minutes' },
        { value: '1 Hour', label: '1 Hour' },
        { value: '8 Hours', label: '8 Hours' },
        { value: '24 Hours', label: '24 Hours' },
    ]

    const componentOptions = [
        { value: 'V', label: 'V' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' }
    ]

    const durationOptions = [
        { value: 'Instantaneous', label: 'Instantaneous' },
        { value: spellData.concentration? 'Concentration, up to 1 round' : '1 Round', label: spellData.concentration? 'Concentration, up to 1 round' : '1 Round' },
        { value: spellData.concentration? 'Concentration, up to 1 minute' : '1 Minute', label: spellData.concentration? 'Concentration, up to 1 minute' : '1 Minute' },
        { value: spellData.concentration? 'Concentration, up to 10 minutes' : '10 Minutes', label: spellData.concentration? 'Concentration, up to 10 minutes' : '10 Minutes' },
        { value: spellData.concentration? 'Concentration, up to 1 hour' : '1 Hour', label: spellData.concentration? 'Concentration, up to 1 hour' : '1 Hour' },
        { value: spellData.concentration? 'Concentration, up to 8 hours' : '8 Hours', label: spellData.concentration? 'Concentration, up to 8 hours' : '8 Hours' },
        { value: spellData.concentration? 'Concentration, up to 24 hours' : '24 Hours', label: spellData.concentration? 'Concentration, up to 24 hours' : '24 Hours' },
        { value: 'Until dispelled', label: 'Until dispelled' }
    ]

    const spellListOptions = classes.map((spellList) => ({ value: spellList, label: capitalize(spellList) }))
    /*[
        { value: 'Artificer', label: 'Artificer' },
        { value: 'Bard', label: 'Bard' },
        { value: 'Cleric', label: 'Cleric' },
        { value: 'Druid', label: 'Druid' },
        { value: 'Inventor', label: 'Inventor' },
        { value: 'Occultist', label: 'Occultist' },
        { value: 'Paladin', label: 'Paladin' },
        { value: 'Psion', label: 'Psion' },
        { value: 'Ranger', label: 'Ranger' },
        { value: 'Sorcerer', label: 'Sorcerer' },
        { value: 'Tamer', label: 'Tamer' },
        { value: 'Warlock', label: 'Warlock' },
        { value: 'Wizard', label: 'Wizard' }
    ]*/

    const handleChange = (e, context) => {
        const value = e.target ? e.target.value : (e.value ? e.value : e.map((option) => option.value))
        const key = e.target? e.target.name : context.name

        if (e.target && e.target.name.indexOf('description') !== -1) {
            const [_, descriptionValue, descriptionIndex] = key.split('_')
            setSpellData({
                ...spellData,
                description: spellData.description.map((description, index) => {
                    if (index === Number(descriptionIndex)) {
                        return {
                            ...description,
                            [descriptionValue]: value
                        }
                    }
                    return description
                })
            })
        }
        else if (e.target && e.target.type === 'checkbox') {
            setSpellData({
                ...spellData,
                [key]: e.target.checked
            })
        }
        else {
            if (key === 'duration' && (value === 'Instantaneous' || value === 'Until Dispelled')) {
                setSpellData({
                    ...spellData,
                    [key]: value,
                    concentration: false
                })
                return;
            }
            // console.log("key and value are ", key, value)
            setSpellData({
                ...spellData,
                [key]: value
            })
        }
    }

    const handleChangeSection = (value, keys) => {
        const newState = changedSectionState(spellData, value, keys)
        setSpellData(newState)
    }

    const changedSectionState = (fullData, value, keys) => {
        const newVal = keys.length > 1 ? changedSectionState(fullData[keys[0]], value, keys.slice(1)) : value

        if (isNaN(keys[0])) {
            return {
                ...fullData,
                [keys[0]]: newVal
            }
        }
        else {
            return fullData.map((val, i) => {
                return i === keys[0] ? newVal : val
            })
        }
    }

    const handleAddSection = (type = '', keys, prefillContent) => {
        let newSection = { title: type }
        switch(type) {
            case 'row':
                newSection = prefillContent ? prefillContent : []
                break;
            case 'monster':
                newSection.content = prefillContent ? prefillContent : -1
                break;
            case 'table':
                newSection.content = prefillContent ? prefillContent : [[]]
                break;
            case 'list':
                newSection.content = prefillContent ? prefillContent : []
                break;
            default:
                newSection.content = prefillContent ? prefillContent : '';
        }
        const newState = addSectionState(spellData, newSection, keys)
        setSpellData(newState)
    }

    const addSectionState = (fullData, newSection, keys) => {
        if (keys.length === 0) {
            return [...fullData, newSection]
        }
        else if (isNaN(keys[0])) {
            return {
                ...fullData,
                [keys[0]]: addSectionState(fullData[keys[0]], newSection, keys.slice(1))
            }
        }
        else {
            return fullData.map((val, i) => {
                return i === keys[0] ? addSectionState(fullData[keys[0]], newSection, keys.slice(1)) : val
            })
        }
    }

    const handleRemoveSection = (keys) => {
        const newState = removeSectionState(spellData, keys)
        setSpellData(newState)
    }

    const removeSectionState = (fullData, keys) => {
        if (keys.length <= 1) {
            const newSection = [...fullData]
            newSection.splice(keys[0], 1)
            return newSection
        }
        else if (isNaN(keys[0])) {
            return {
                ...fullData,
                [keys[0]]: removeSectionState(fullData[keys[0]], keys.slice(1))
            }
        }
        else {
            return fullData.map((val, i) => {
                return i === keys[0] ? removeSectionState(fullData[keys[0]], keys.slice(1)) : val
            })
        }
    }

    const handleMoveSection = (direction, keys) => {
        const newState = moveSectionState(spellData, direction, keys)
        setSpellData(newState)
    }

    const moveSectionState = (fullData, direction, keys) => {
        if (keys.length <= 1) {
            const newIndex = keys[0] + direction;
            const v1 = fullData[keys[0]]
            const v2 = fullData[newIndex]
            return fullData.map((item, i) => {
                if (i === newIndex) {
                    return v1
                }
                else if (i === keys[0]) {
                    return v2
                }
                else {
                    return item
                }
            })
        }
        else if (isNaN(keys[0])) {
            return {
                ...fullData,
                [keys[0]]: moveSectionState(fullData[keys[0]], direction, keys.slice(1))
            }
        }
        else {
            return fullData.map((val, i) => {
                return i === keys[0] ? moveSectionState(fullData[keys[0]], direction, keys.slice(1)) : val
            })
        }
    }

    const handleMonsterFormSubmit = (newMonster) => {
        //console.log("current callback", editMonsterCallback)
        //console.log("The new monster is: ", newMonster)
        if (typeof editingMonster === 'object') {
            editMonster(newMonster.id, newMonster)
            editMonsterCallback.callback(newMonster.id)
            setEditingMonster(false)
        }
        else {
            addMonster(dbUser, newMonster)
            .then(() => {
                editMonsterCallback.callback(newMonster.id)
                setEditingMonster(false)
            })
        }
    }

    const handleMonsterFormCancel = () => {
        setEditingMonster(false)
    }

    const showMonsterForm = (monster, callback) => {
        monster ? setEditingMonster(monster) : setEditingMonster(true)
        setEditMonsterCallback({ callback: callback})
    }

    const getMultiCreatableSelectValue = (values, options) => {
        return values.map((value) => {
            const index = options.map(option => option.value).indexOf(value);
            if (index === -1) {
                return ({ value: value, label: value })
            }
            else {
                return options[index]
            }
        })
    }

    useEffect(() => {
        if (spellData.description.length === 0) {
            setSpellData({
                ...spellData,
                description: [{
                    title: "untitled",
                    content: "",
                }]
            })
        }
    }, [])

    return (
        <>
        <form
            style={editingMonster ? { display: 'none' } : {}}
            className={styles.spellForm}
            onSubmit={(e) => e.preventDefault()}
        >
            <div className={styles.formContent}>
                <label><h4>Name:</h4></label>
                <div
                    className={styles.inputWrapper}
                >
                    <input
                        name='name'
                        type="text"
                        value={spellData.name}
                        onChange={handleChange}
                    />
                </div>
                <label><h4>Source:</h4></label>
                <Select
                    /*unstyled*/
                    name="source"
                    options={sourceOptions}
                    //styles={dropdownStyles}
                    placeholder={"Choose a source"}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    value={sourceOptions.filter((option) => option.value === spellData.source)}
                    onChange={handleChange}
                />
                <label><h4>School & Level:</h4></label>
                <div
                    className={styles.multiInputContainer}
                >
                    <Select
                        /*unstyled*/
                        name="level"
                        options={levelOptions}
                        styles={{
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: '15rem'
                            }),
                        }}
                        placeholder={"Choose a level"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={levelOptions.filter((option) => option.value === spellData.level)}
                        onChange={handleChange}
                    />
                    <Select
                        /*unstyled*/
                        isMulti
                        name="school"
                        options={schoolOptions}
                        styles={{
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: '15rem'
                            }),
                        }}
                        placeholder={"Choose a school"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={
                            //getMultiCreatableSelectValue(schoolOptions)
                            schoolOptions.filter((option) => spellData.school.indexOf(option.value) !== -1)
                        }
                        onChange={handleChange}
                    />
                    {/*<Select
                    isMulti
                    name="classes"
                    options={spellListOptions}
                    styles={{
                        container: (baseStyles, state) => ({
                            ...baseStyles,
                            minWidth: '15rem'
                        }),
                    }}
                    placeholder={"Choose classes"}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    value={spellListOptions.filter((option) => spellData.classes.indexOf(option.value) !== -1)}
                    onChange={handleChange}
                />*/}
                </div>
                <label /*for="name"*/><h4>Casting Time:</h4></label>
                <div
                    //className={styles.inputWrapper}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <CreatableSelect
                        /*unstyled*/
                        name="casting_time"
                        options={castingTimeOptions}
                        styles={{
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: '15rem'
                            }),
                        }}
                        placeholder={"Choose a casting time"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={{
                            value: spellData.casting_time,
                            label: spellData.casting_time
                        }}
                        onChange={handleChange}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '0px 10px'
                        }}
                    >
                        <label>Ritual?</label>
                        <input
                            name='ritual'
                            type='checkbox'
                            checked={spellData.ritual}
                            onChange={handleChange}
                        >
                        </input>    
                    </div>
                </div>
                <label><h4>Range:</h4></label>
                <div
                    className={styles.inputWrapper}
                >
                    <input
                        name='range'
                        type="text"
                        value={spellData.range}
                        onChange={handleChange}
                    />
                </div>
                <label /*for="name"*/><h4>Components:</h4></label>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Select
                        /*unstyled*/
                        isMulti
                        name="components"
                        options={componentOptions}
                        styles={{
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: '15rem'
                            }),
                        }}
                        placeholder={"Choose the spell's components"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={componentOptions.filter((option) => spellData.components.indexOf(option.value) !== -1)}
                        onChange={handleChange}
                    />
                    {spellData.components.indexOf('M') !== -1 &&
                        <div
                            className={styles.inputWrapper}
                        >
                            <input
                                name='materials'
                                //placeholder="Add the spell's material components"
                                type="text"
                                value={spellData.materials? spellData.material : ''}
                                onChange={handleChange}
                            />
                        </div>
                    }
                </div>
                <label><h4>Duration</h4></label>
                <div
                    //className={styles.inputWrapper}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <Select
                        /*unstyled*/
                        name="duration"
                        options={durationOptions}
                        styles={{
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                minWidth: '15rem'
                            }),
                        }}
                        placeholder={"Choose a level"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={durationOptions.filter((option) => option.value === spellData.duration)}
                        onChange={handleChange}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '0px 10px'
                        }}
                    >
                        <label>Concentration?</label>
                        <input
                            name='concentration'
                            type='checkbox'
                            checked={spellData.concentration}
                            onChange={handleChange}
                        >
                        </input>    
                    </div>
                </div>
                <label><h4>Spell Lists</h4></label>
                <Select
                    /*unstyled*/
                    isMulti
                    name="classes"
                    options={spellListOptions}
                    styles={{
                        container: (baseStyles, state) => ({
                            ...baseStyles,
                            minWidth: '15rem'
                        }),
                    }}
                    placeholder={"Choose classes"}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    value={spellListOptions.filter((option) => spellData.classes.indexOf(option.value) !== -1)}
                    onChange={handleChange}
                />
                <FormContentSection sectionName='Description'
                    section={spellData.description}
                    changeSection={(value, index) => handleChangeSection(value, ['description'].concat(index))}
                    addSection={(type, index, p) => handleAddSection(type, ['description'].concat(index), p)}
                    removeSection={(index) => handleRemoveSection(['description'].concat(index))}
                    moveSection={(direction, index) => handleMoveSection(direction, ['description'].concat(index))}
                    editMonster={showMonsterForm}
                />
            </div>
            <div
                className={styles.footer}
            >
                <button
                    type='button'
                    onClick={(e) => handleFormSubmit(e, spellData)}
                >
                    Submit
                </button>
                <button
                    type='button'
                    onClick={handleFormCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
        {editingMonster && <AddMonsterForm
            formPrefill={typeof editingMonster === 'object' ? editingMonster : false}
            handleFormSubmit={handleMonsterFormSubmit}
            handleFormCancel={handleMonsterFormCancel}
        />}
        </>
    )
}
export default AddSpellForm;