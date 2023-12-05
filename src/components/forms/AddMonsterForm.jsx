import { useState, useEffect } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import TextAreaAutoSize from 'react-textarea-autosize'
import FormContentSection from '@/components/forms/formContentSection'
import styles from '@/styles/Form.module.css'
import {v4 as uuidv4 } from 'uuid';
import {
    sources,
    sizes,
    creature_types,
    abilities,
    skills,
    skill_to_ability,
    conditions,
    damage_types,
    senses,
    languages,
    cr_to_pb
} from '@/data/configs/dataConfigs';

import { capitalize, capitalizeTitle } from '@/utils/utils'

const AddMonsterForm = ({ formPrefill, handleFormSubmit, handleFormCancel }) => {
    const [monsterData, setMonsterData] = useState( formPrefill ? formPrefill : {
        id: uuidv4(),
        name: '',
        size: 'medium',
        creature_type: 'humanoid',
        alignment: 'neutral',
        armor_class: '12',
        hit_points: '11 (2d8+2)',
        speed: '30 ft.',
        ability_scores: {
            strength: 8,
            dexterity: 8,
            constitution: 8,
            intelligence: 8,
            wisdom: 8,
            charisma: 8,
        },
        saving_throws: {
        },
        skills: {
        },
        damage_irv: {
        },
        condition_i: [
        ],
        senses: {
        },
        initiative_modifier: 0,
        languages: [],
        cr: '1/8',
        pb: 2,
        traits: [],
        actions: [],
        bonus_actions: [],
        reactions: [],
        legendary_actions: [],
        mythic_actions: []
    })

    useEffect(() => {
        if (monsterData.cr !== '-')
            handleInputChange('pb', cr_to_pb(monsterData.cr))
    }, [monsterData.cr])

    const selectStyles = {
        container: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: '12rem'
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            zIndex: '4',
        })
    }

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

    const handleInputChange = (key, value, subkey) => {
        if (subkey !== undefined && typeof subkey !== 'number') {
            //console.log(key, subkey, value)
            setMonsterData({
                ...monsterData,
                [key]: {
                    ...monsterData[key],
                    [subkey]: value
                }
            })
            return;
        }
        else if (subkey !== undefined) {
            setMonsterData({
                ...monsterData,
                [key]: monsterData[key].map((item, index) => index === subkey ? value : item)
            })
            return;
        }
        setMonsterData({
            ...monsterData,
            [key]: value
        })
    }

    const handleSelectChange = (key, value) => {
        setMonsterData({
            ...monsterData,
            [key]: value
        })
    }

    const handleMultiSelectChange = (key, value, operation) => {
        //console.log("Operation: ", operation)

        if (Array.isArray(monsterData[key])) {
            const newValues = []
            switch(operation.action) {
                case "create-option":
                case "select-option":
                    setMonsterData({
                        ...monsterData,
                        [key]: [
                            ...monsterData[key],
                            operation.option.value
                        ]
                    })
                    break;
                case "clear":
                    const removedValues = operation.removedValues.map(o => o.value)
                    newValues.push(...monsterData[key].filter((item) => removedValues.indexOf(item) === -1))
                    setMonsterData({
                        ...monsterData,
                        [key]: newValues
                    })
                    break;
                default:
                    //let {[operation.removedValue.value]: _, ...rest} = monsterData[key]
                    newValues.push(...monsterData[key].filter((item) => item !== operation.removedValue.value))
                    setMonsterData({
                        ...monsterData,
                        [key]: newValues,
                    })
                    break;
            }
            return;
        }
        switch(operation.action) {
            case "create-option":
                //console.log("Creating option...")
            case "select-option":
                setMonsterData({
                    ...monsterData,
                    [key]: {
                        ...monsterData[key],
                        [operation.option.value]: value
                    }
                })
                break;
            case "clear":
                const newValues = {...monsterData[key]}
                operation.removedValues.forEach((e) => delete newValues[e.value])
                setMonsterData({
                    ...monsterData,
                    [key]: newValues
                })
                break;
            default:
                let {[operation.removedValue.value]: _, ...rest} = monsterData[key]
                setMonsterData({
                    ...monsterData,
                    [key]: rest,
                })
                break;
        }
    }

    const handleChangeSection = (value, keys) => {
        const newState = changedSectionState(monsterData, value, keys)
        setMonsterData(newState)
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
            case 'table':
                newSection.content = prefillContent ? prefillContent : [[]]
                break;
            case 'list':
                newSection.content = prefillContent ? prefillContent : []
                break;
            default:
                newSection.content = prefillContent ? prefillContent : '';
        }
        const newState = addSectionState(monsterData, newSection, keys)
        setMonsterData(newState)
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
        const newState = removeSectionState(monsterData, keys)
        setMonsterData(newState)
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
        const newState = moveSectionState(monsterData, direction, keys)
        setMonsterData(newState)
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

    const getASModifier = (score, type='', pb=2) => {
        const modifier = Math.floor((score-10)/2);
        if (isNaN(pb)) {
            switch(type) {
                case 'expertise':
                    return `${modifier < 0 ? "" + modifier : "+" + modifier} plus PB x2`
                case 'proficient':
                    return `${modifier < 0 ? "" + modifier : "+" + modifier} plus PB`
                default: 
                    return modifier < 0 ? "" + modifier : "+" + modifier
            }
        }
        else {
            const modifierP = (modifier + pb)
            const modifierE = (modifier + (2*pb))
            switch (type) {
                case 'expertise':
                    return modifierE < 0 ? "" + modifierE : "+" + modifierE
                case 'proficient':
                    return modifierP < 0 ? "" + modifierP : "+" + modifierP
                default: 
                    return modifier < 0 ? "" + modifier : "+" + modifier
            }
        }
    }

    const buildSkillToggle = (condition, f) => {
        return (
            <div
                id={styles.button1}
                className={[styles.button, styles.r].join(' ')}
            >
                <input
                    readOnly
                    type="checkbox"
                    checked={condition}
                    className={styles.checkbox}
                    onClick={f}
                />
                <div
                    className={styles.knobs}
                ></div>
                <div
                    className={styles.layer}
                ></div>
            </div>
        )
    }

    const getMultiCreatableSelectValue = (values, options) => {
        const selectedValues = values.map((value) => {
            const index = options.map(option => option.value).indexOf(value);
            if (index === -1) {
                return ({ value: value, label: value })
            }
            else {
                return options[index]
            }
        })
        //console.log(selectedValues)
        return selectedValues
    }

    return (
        <form
            className={styles.monsterForm}
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
                        value={monsterData.name}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
                    value={sourceOptions.filter((option) => option.value === monsterData.source)}
                    onChange={(option) => handleSelectChange('source', option.value)}
                />
                <label><h4>Size, Type, & Alignment:</h4></label>
                <div
                    className={styles.multiInputContainer}
                >
                    <Select
                        name="size"
                        options={sizeOptions}
                        styles={selectStyles}
                        placeholder={"Choose a size"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={sizeOptions.filter((option) => option.value === monsterData.size)}
                        onChange={(option) => handleSelectChange('size', option.value)}
                    />
                    <Select
                        name="creature_type"
                        options={creature_typeOptions}
                        styles={selectStyles}
                        placeholder={"Choose a creature type"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={creature_typeOptions.filter((option) => option.value === monsterData.creature_type)}
                        onChange={(option) => handleSelectChange('creature_type', option.value)}
                    />
                    <div
                        className={styles.inputWrapper}
                    >
                        <input
                            name='alignment'
                            type="text"
                            value={monsterData.alignment}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                    </div>
                </div>
                <div
                    className={styles.multiInputContainer}
                >
                    <div className={styles.smallInputContainer}>
                        <label><h4>AC:</h4></label>
                        <div
                            className={styles.inputWrapper}
                        >
                            <input
                                name='armor_class'
                                type="text"
                                value={monsterData.armor_class}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.smallInputContainer}>
                        <label><h4>HP:</h4></label>
                        <div
                            className={styles.inputWrapper}
                        >
                            <input
                                name='hit_points'
                                type="text"
                                value={monsterData.hit_points}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.smallInputContainer}>
                        <label><h4>Speed:</h4></label>
                        <div
                            className={styles.inputWrapper}
                        >
                            <input
                                name='speed'
                                type="text"
                                value={monsterData.speed}
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={styles.multiInputContainer}
                >
                    {Object.keys(monsterData.ability_scores).map((score) => {
                        const scoreValue = monsterData.ability_scores[score]
                        return (
                            <div className={styles.smallInputContainer} key={`${score}_score`}>
                                <label><h4>{score.substring(0,3).toUpperCase()}:</h4></label>
                                <div
                                    className={styles.inputWrapper}
                                >
                                    <input
                                        name='ability_scores'
                                        type="text"
                                        value={scoreValue}
                                        onChange={(e) => handleInputChange(e.target.name, {
                                            ...monsterData.ability_scores,
                                            [score]: e.target.value,
                                        })}
                                    />
                                </div>
                                {getASModifier(scoreValue)}
                            </div>
                        )
                    })}
                </div>
                <label><h4>Saving Throws: {Object.keys(monsterData.saving_throws).map((st) => capitalize(st.substring(0, 3)) + ': ' + getASModifier(monsterData.ability_scores[st], monsterData.saving_throws[st], monsterData.pb)).join(', ')}</h4></label>
                <Select
                    isMulti
                    name="saving_throws"
                    options={abilityOptions}
                    styles={selectStyles}
                    placeholder={"Choose saving throw proficiencies"}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    value={abilityOptions.filter((option) => Object.keys(monsterData.saving_throws).indexOf(option.value) !== -1)}
                    onChange={(_, operation) => handleMultiSelectChange('saving_throws', 'proficient', operation)}
                />
                <label><h4>Skills: </h4></label>
                <Select
                    isMulti
                    name="skills"
                    options={skillOptions}
                    styles={selectStyles}
                    placeholder={"Choose skill proficiencies"}
                    className='basic-multi-select'
                    classNamePrefix='select'
                    value={skillOptions.filter((option) => Object.keys(monsterData.skills).indexOf(option.value) !== -1)}
                    onChange={(_, operation) => handleMultiSelectChange('skills', 'proficient', operation)}
                />
                <div
                    style={{
                        columns: 2,
                    }}
                >
                    {Object.keys(monsterData.skills).map((skill, index) => 
                        <span
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '0.5rem',
                            }}
                            key={skill}
                        >
                            {buildSkillToggle(monsterData.skills[skill] !== 'proficient', () => setMonsterData({
                                ...monsterData,
                                skills: {
                                    ...monsterData.skills,
                                    [skill]: monsterData.skills[skill] === 'proficient' ? 'expertise' : 'proficient',
                                },
                            }))}
                            {capitalize(skill)}
                            {" " + getASModifier(monsterData.ability_scores[skillAbilities[skill]], monsterData.skills[skill], monsterData.pb)}
                            {index < Object.keys(monsterData.skills).length - 1 &&  ', '}
                        </span>
                    )}
                </div>
                <div
                    className={styles.multiInputContainer}
                    style={{
                        flexWrap: 'wrap'
                    }}
                >
                    <div
                        className={styles.inputContainerV}
                    >
                        <label><h4>Damage Immunities: </h4></label>
                        <CreatableSelect
                            isMulti
                            name="damage_irv"
                            options={damage_typeOptions}
                            styles={selectStyles}
                            placeholder={"Choose damage immunities"}
                            className='basic-multi-select'
                            classNamePrefix='select'
                            value={
                                getMultiCreatableSelectValue(
                                    Object.keys(monsterData.damage_irv).filter((key) => monsterData.damage_irv[key] === 'immune'), 
                                    damage_typeOptions
                            )}
                            //damage_typeOptions.filter((option) => Object.keys(monsterData.damage_irv).indexOf(option.value) !== -1 && monsterData.damage_irv[option.value] === 'immune')
                            onChange={(options, operation) => handleMultiSelectChange('damage_irv', 'immune', operation)}
                        />
                        {/*Object.keys(monsterData.damage_irv).filter((key) => monsterData.damage_irv[key] === 'immune')*/}
                    </div>
                    <div
                        className={styles.inputContainerV}
                    >
                        <label><h4>Damage Resistances: </h4></label>
                        <CreatableSelect
                            isMulti
                            name="damage_irv"
                            options={damage_typeOptions}
                            styles={selectStyles}
                            placeholder={"Choose damage resistances"}
                            className='basic-multi-select'
                            classNamePrefix='select'
                            value={
                                getMultiCreatableSelectValue(
                                    Object.keys(monsterData.damage_irv).filter((key) => monsterData.damage_irv[key] === 'resistant'), 
                                    damage_typeOptions
                            )}
                            onChange={(options, operation) => handleMultiSelectChange('damage_irv', 'resistant', operation)}
                        />
                    </div>
                    <div
                        className={styles.inputContainerV}
                    >
                        <label><h4>Damage Vulnerabilities: </h4></label>
                        <CreatableSelect
                            isMulti
                            name="damage_irv"
                            options={damage_typeOptions}
                            styles={selectStyles}
                            placeholder={"Choose damage vulnerabilities"}
                            className='basic-multi-select'
                            classNamePrefix='select'
                            value={
                                getMultiCreatableSelectValue(
                                    Object.keys(monsterData.damage_irv).filter((key) => monsterData.damage_irv[key] === 'vulnerable'), 
                                    damage_typeOptions
                            )}
                            onChange={(options, operation) => handleMultiSelectChange('damage_irv', 'vulnerable', operation)}
                        />
                    </div>
                </div>
                <div
                    className={styles.inputContainerV}
                >
                    <label><h4>Conditions: </h4></label>
                    <Select
                        isMulti
                        name="condition_i"
                        options={conditionOptions}
                        styles={selectStyles}
                        placeholder={"Choose condition immunities"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={monsterData.condition_i.map((cond) => {
                            return { value: cond, label: capitalize(cond)}
                        })}
                        onChange={(_, operation) => handleMultiSelectChange('condition_i', 'immune', operation)}
                    />
                </div>
                <div
                    className={`${styles.multiInputContainer} ${styles.vertical}`}
                >
                    <div
                        className={styles.inputContainerV}
                    >
                        <label><h4>Senses: </h4></label>
                        <Select
                            isMulti
                            name="senses"
                            options={senseOptions}
                            styles={selectStyles}
                            placeholder={"Choose senses"}
                            className='basic-multi-select'
                            classNamePrefix='select'
                            value={senseOptions.filter((option) => Object.keys(monsterData.senses).indexOf(option.value) !== -1)}
                            onChange={(_, operation) => handleMultiSelectChange('senses', 30, operation)}
                        />
                    </div>
                    <div
                        className={styles.multiInputContainer}
                    >
                        {Object.keys(monsterData.senses).map((sense, i) => {
                            return (
                                <div
                                    key={`${sense}_${i}`}
                                    className={styles.inputContainerH}
                                >
                                    <h4>{capitalize(sense)}</h4>
                                    <div
                                        className={styles.inputWrapper}
                                        style={{
                                            width: '3rem',
                                        }}
                                    >
                                        <input
                                            name={sense}
                                            type="text"
                                            value={monsterData.senses[sense]}
                                            onChange={(e) => handleInputChange('senses', e.target.value, e.target.name)}
                                        />
                                    </div>
                                    ft.
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div
                    className={styles.inputContainerV}
                >
                    <label><h4>Languages: </h4></label>
                    <CreatableSelect
                        isMulti
                        name="languages"
                        options={languageOptions}
                        styles={selectStyles}
                        placeholder={"Choose languages"}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        value={
                            getMultiCreatableSelectValue(monsterData.languages, languageOptions)
                        /*    monsterData.languages.map((lang) => {
                            return { value: lang, label: capitalize(lang)}
                        })*/
                        }
                        onChange={(_, operation) => handleMultiSelectChange('languages', _, operation)}
                    />
                </div>
                <div
                    className={styles.inputContainerV}
                >
                    <label><h4>CR:</h4></label>
                    <div
                        className={styles.inputWrapper}
                    >
                        <input
                            name='cr'
                            type="text"
                            value={monsterData.cr}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                    </div>
                </div>
                {monsterData.cr === '-' && <div className={styles.inputContainerV} >
                    <label><h4>Proficiency Bonus:</h4></label>
                    <div
                        className={styles.inputWrapper}
                    >
                        <input
                            name='pb'
                            type="text"
                            value={monsterData.pb}
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        />
                    </div>
                </div>}
                <FormContentSection
                    sectionName='Traits'
                    section={monsterData.traits}
                    changeSection={(value, index) => handleChangeSection(value, ['traits'].concat(index))}
                    addSection={(type, index, p) => handleAddSection(type, ['traits'].concat(index), p)}
                    removeSection={(index) => handleRemoveSection(['traits'].concat(index))}
                    moveSection={(direction, index) => handleMoveSection(direction, ['traits'].concat(index))}
                    allowedSections={['titled', 'untitled', 'list']}
                />
                <FormContentSection
                    sectionName='Actions'
                    section={monsterData.actions}
                    changeSection={(value, index) => handleChangeSection(value, ['actions'].concat(index))}
                    addSection={(type, index, p) => handleAddSection(type, ['actions'].concat(index), p)}
                    removeSection={(index) => handleRemoveSection(['actions'].concat(index))}
                    moveSection={(direction, index) => handleMoveSection(direction, ['actions'].concat(index))}
                    allowedSections={['titled', 'untitled', 'list']}
                />
                <FormContentSection
                    sectionName='Bonus Actions'
                    section={monsterData.bonus_actions}
                    changeSection={(value, index) => handleChangeSection(value, ['bonus_actions'].concat(index))}
                    addSection={(type, index, p) => handleAddSection(type, ['bonus_actions'].concat(index), p)}
                    removeSection={(index) => handleRemoveSection(['bonus_actions'].concat(index))}
                    moveSection={(direction, index) => handleMoveSection(direction, ['bonus_actions'].concat(index))}
                    allowedSections={['titled', 'untitled', 'list']}
                />
                <FormContentSection 
                    sectionName='Reactions'
                    section={monsterData.reactions}
                    changeSection={(value, index) => handleChangeSection(value, ['reactions'].concat(index))}
                    addSection={(type, index, p) => handleAddSection(type, ['reactions'].concat(index), p)}
                    removeSection={(index) => handleRemoveSection(['reactions'].concat(index))}
                    moveSection={(direction, index) => handleMoveSection(direction, ['reactions'].concat(index))}
                    allowedSections={['titled', 'untitled', 'list']}
                />
                <FormContentSection 
                    sectionName='Legendary Actions'
                    section={monsterData.legendary_actions}
                    changeSection={(value, index) => handleChangeSection(value, ['legendary_actions'].concat(index))}
                    addSection={(type, index, p) => handleAddSection(type, ['legendary_actions'].concat(index), p)}
                    removeSection={(index) => handleRemoveSection(['legendary_actions'].concat(index))}
                    moveSection={(direction, index) => handleMoveSection(direction, ['legendary_actions'].concat(index))}
                    allowedSections={['titled', 'untitled', 'list']}
                />
                <FormContentSection 
                    sectionName='Mythic Actions'
                    section={monsterData.mythic_actions}
                    changeSection={(value, index) => handleChangeSection(value, ['mythic_actions'].concat(index))}
                    addSection={(type, index, p) => handleAddSection(type, ['mythic_actions'].concat(index), p)}
                    removeSection={(index) => handleRemoveSection(['mythic_actions'].concat(index))}
                    moveSection={(direction, index) => handleMoveSection(direction, ['mythic_actions'].concat(index))}
                    allowedSections={['titled', 'untitled', 'list']}
                />
            </div>
            <div
                className={styles.footer}
            >
                <button
                    type='button'
                    onClick={(e) => handleFormSubmit(monsterData)}
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
    )
}
export default AddMonsterForm;