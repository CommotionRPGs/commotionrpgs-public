import styles from "@/styles/routes/CharClasses.module.css"
import { useState } from "react"

import Header from "@/components/basic/Header"
import StaticTable from "@/components/basic/StaticTable"
import Excerpt from "@/components/basic/Excerpt"
import { level_to_pb } from "@/data/configs/dataConfigs"
import { numSuffix, capitalize } from "@/utils/utils"
import charClassesData from "@/data/charClasses.json"
import subclasses from "@/data/subclasses.json"
import { NavLink } from 'react-router-dom';

const CharClasses = () => {
    const classData = charClassesData[0]/*{
        name: "Tamer",
        hit_die: "1d8",
        proficiencies: {
            armour: [
                "light",
                "medium",
                "shields"
            ],
            weapons: {
                simple: true,
                exotic: ["net"]
            },
            tools: [],
            saving_throws: [
                "constitution",
                "charisma"
            ],
            skills: {
                amount: 2,
                options: ["animal handling", "insight", "medicine", "nature", "perception", "persuasion"]
            }
        },
        multiclassing: {
            asm: {
                evaluate: (stats, spellcasting_ability) => {
                    return (stats[spellcasting_ability] >= 13)
                }
            },
            proficiencies_gained: {
                armour: ['light', 'shields'],
                weapons: {
                    simple: true,
                    exotic: ['net']
                }
            },
            spell_slots: '...'
        },
        class_description: "Flourishing the gilded skull...",
        creation_prompt: "What prompted you to begin taming creatures? Loneliness? A need...",
        quick_build_prompt: "You can make a Tamer by...",
        features_by_level: [
            {
                features: [
                    'Pocket Familiar',
                    'Monster Trainer',
                    'Soul Bond',
                    'Tame Creature'
                ],
            },
            {
                features: [
                    'Bolster',
                    'Psychic Bond',
                    'Spellcasting'
                ],
            },
            {
                features: [
                    'Pocket Family',
                    'Subclass'
                ],
            },
            {
                features: [
                    'Ability Score Improvement'
                ],
            },
            {
                features: [
                    'Multiattack',
                    'Malleable Presence'
                ],
            },
            {
                features: [
                    'Alpha Strike',
                    'Wilful Blows'
                ],
            },
            {
                features: [
                    'Pocket Family',
                    'Subclass'
                ],
            },
        ],
        features: {
            'Pocket Familiar': {
                description: 'You become bonded to a companion that...',
                levels: [1]
            },
            'Monster Trainer': {
                description: 'As you gain levels in this class your companions become...',
                levels: [1]
            },
            'Soul Bond': {
                description: 'Companions make death saving throws, die, and can be revived...',
                levels: [1]
            },
            'Tame Creature': {
                description: 'One way to defeat deadly foes: have deadlier friends...',
                levels: [1]
            },
            'Bolster': {
                description: 'While your companion is within 100 feet of you and...',
                levels: [2]
            },
            'Psychic Bond': {
                description: 'While your companion is within 100 feet of you, you can...',
                levels: [2]
            },
            'Spellcasting': {
                description: 'By 2nd level, you have learned to harness...',
                levels: [2]
            },
            'Pocket Family': {
                description: 'As you gain levels in this call...',
                levels: [3, 7, 11, 15, 19]
            },
            'Subclass': {
                name: 'Traing Paradigm',
                description: 'You choose the type of Training Paradigm...',
                levels: [3, 7, 10, 14, 18]
            },
            'Multiattack': {
                description: '',
                levels: [5]
            },
            'Malleable Presence': {
                description: '',
                levels: [5]
            },
            'Alpha Strike': {
                description: '',
                levels: [6]
            },
            'Wilful Blows': {
                description: '',
                levels: [6]
            },
        },
        resources: {
            "Cantrips Known": {
                resourcePerLevel: [ undefined, 2, 2, 2, 2, 2, 2 ],
            },
            "Spells Known": {
                resourcePerLevel: [ undefined, 2, 3, 3, 4, 4, 5],
            },
            "1st-Level Spell Slot": {
                tableTitle: "-Spell Slots per Spell Level-",
                tableName: "1st",
                resourcePerLevel: [ undefined, 2, 3, 3, 4, 4, 4],
            },
            "2nd-Level Spell Slot": {
                tableTitle: "-Spell Slots per Spell Level-",
                tableName: "2nd",
                resourcePerLevel: [ undefined, undefined, undefined, undefined, 2, 2, 3]
            },
            "3rd-Level Spell Slot": {
                tableTitle: "-Spell Slots per Spell Level-",
                tableName: "3rd",
                resourcePerLevel: [...Array(7).map(() => undefined)]
            }
        }
    }*/

    const subclassData = subclasses.filter((subclass) => subclass.class === classData.name)
    const [selectedSubclass, setSelectedSubclass] = useState(subclassData[1])

    const createClassTableHeader = (resources) => {
        const table = {
            spans: [],
            header: [["Level", "Proficiency Bonus", "Features"], []]
        }
        resources.forEach((resource) => {
            const resourceData = classData.resources[resource]
            if (resourceData.tableTitle) {
                const titleIndex = table.header[0].indexOf(resourceData.tableTitle)
                if (titleIndex === -1) {
                    table.header[0].push(resourceData.tableTitle)
                    table.spans = table.header[0].map(heading => {
                        if (heading != resourceData.tableTitle)
                            return [1, 2]
                        else 
                            return [1, 1]
                    })
                }
                else {
                    table.spans[titleIndex][0] = table.spans[titleIndex][0]+1
                }
                table.header[1].push(resourceData.tableName ? resourceData.tableName : resource)
            }
            else {
                table.header[0].push(resourceData.tableName ? resourceData.tableName : resource)
            }
        })
        return table;
    }

    const createClassTable = () => {
        const classResources = [...Object.keys(classData.resources)]
        const table = {
            ...createClassTableHeader(classResources),
            /*spans: [],
            header: createClassTableHeader(classResources),*/
            body: []
        }
        classData.features_by_level.forEach((level, i) => {
            table.body.push([
                numSuffix(i+1),
                level_to_pb(i+1),
                level.features.map((featureName) => {
                    if (featureName === 'Ability Score Improvement') 
                        return 'Ability Score Increase'
                    const feature = classData.features[featureName]
                    if (featureName === 'Subclass') {
                        if (feature.levels.indexOf(i+1) !== 0)
                            return `${feature.name} Feature`
                        return feature.name
                    }
                    if (feature.levels.indexOf(i+1) !== 0) {
                        return `${featureName} (${feature.levels.indexOf(i+1)+1})`
                    }
                    else {
                        return featureName
                    }
                }).join(', '),
                ...classResources.map(resource => classData.resources[resource].resourcePerLevel[i])
            ])
        })
        //console.log(table)
        return table;
    }

    const buildContentSection = (section) => {
        if (typeof section === 'string' || section instanceof String)
            return <div> {section} </div>
        switch(section.type) {
            case 'table': 
                return <StaticTable
                    data={section.content}
                    title={
                        <Header>
                            <h6>
                                {section.title}    
                            </h6>
                        </Header>
                        
                    } 
                />
            case 'list':
                return <ul className={styles.descSection} >
                    {section.content.map(subsection => <li>{buildContentSection(subsection)}</li>)}
                </ul>
            case 'titledB':
                return <div>
                    <b><i>{`${section.title}. `}</i></b>
                    {section.content}
                </div>
            case 'titled3':
                return <div>
                    <Header>
                        <h4>
                            {section.title}
                        </h4>
                    </Header>
                    {section.content}
                </div>
            case 'titledExcerpt':
                return <Excerpt>
                    <Header>
                        <h5>
                            {section.title}
                        </h5>
                    </Header>
                    <div className={styles.descSection}>
                        {section.content.map(subsection => buildContentSection(subsection))}
                    </div>
                </Excerpt>
            case 'equation':
                return <i className={styles.equation}>
                    {section.content}
                </i>
            default: 
                return <div>
                    {section.content}
                </div>
        }
    }

    const buildFeatureEntry = (title, level, description) => {
        return (
            <>
                <Header>
                    <h3>
                        {title}
                    </h3>
                </Header>
                <i>
                    {`${level}-level ${classData.name} feature`}
                </i>
                <div className={styles.descSection} >
                    {description.map((section) => {
                        return buildContentSection(section)
                    })}
                </div>
            </>
        )
    }

    const buildFeaturesPerLevel = (featuresThisLevel, features, level) => {
        return featuresThisLevel.map((featureName) => {
            if (featureName === 'Ability Score Improvement')
                return <></>
            const feature = features[featureName]
            return <>
                {feature.levels[0] === level &&
                    buildFeatureEntry(
                        feature.name ? feature.name : featureName,
                        numSuffix(level),
                        features[featureName].description
                        //features[featureName]? features[featureName].description : ''
                    )
                }
                {feature.levels[0] === level && featureName === 'Subclass' &&
                    subclassData.map((subclass) => 
                        <div className={`${styles.subclassSelector} ${selectedSubclass.name === subclass.name ? styles.selected : ''}`} onClick={() => setSelectedSubclass(subclass)} >
                            <div className={styles.name}>
                                <NavLink to={subclass.name.replace(/\W+/g, '-').toLowerCase()}>
                                    <Header variant={1}>
                                        <h3>
                                            {subclass.name}
                                        </h3>
                                    </Header>    
                                </NavLink>
                            </div>
                        </div>
                    )
                }
            </>
        })
    }

    return (
        <div style={{ padding: '0 0 3rem'}}>
            <div className={`${styles.charClasses} paper`} style={{ display: 'flex', 'flexDirection': 'column'}}>
                <Header>
                    <h2>{classData.name}</h2>
                </Header>
                <div className={styles.descSection} >
                    {classData.class_description.map(section => buildContentSection(section))}
                </div>
                <Header>
                    <h3>
                        {`Creating a ${classData.name}`}
                    </h3>
                </Header>
                <div className={styles.descSection} >
                    {classData.creation_prompt.map(section => buildContentSection(section))}
                </div>
                <StaticTable
                    data={createClassTable()}
                />
                <Header>
                    <h3>
                        {"Class Features"}
                    </h3>
                </Header>
                <div className={styles.descSection} >
                    <Header>
                        <h4>
                            {"Hit Points"}
                        </h4>
                    </Header>
                    <div>
                        <b>Hit Dice:</b>
                        {` ${classData.hit_die} per ${classData.name} level`}
                    </div>
                    <div>
                        <b>Hit Points at 1st Level:</b>
                        {` ${classData.hit_die[2]} + your Constitution modifier`}
                    </div>
                    <div>
                        <b>Hit Points at Higher Levels</b>
                        {` ${classData.hit_die} (${classData.hit_die[2]/2 + 1}) + your Constitution modifier per ${classData.name} level after 1st`}
                    </div>
                    <Header>
                        <h4>Proficiencies</h4>
                    </Header>
                    <div>
                        <b>Armour:</b>
                        {` ${classData.proficiencies.armour.map(proficiency => proficiency === 'shields' ? proficiency : proficiency + ' armour').join(', ')}`}
                    </div>
                    <div>
                        <b>Weapons:</b>
                        {` ${Object.keys(classData.proficiencies.weapons).map(proficiency => 
                            typeof classData.proficiencies.weapons[proficiency] === 'boolean'? proficiency + ' weapons' : classData.proficiencies.weapons[proficiency].join(', ')
                        ).join(', ')}`}
                    </div>
                    <div>
                        <b>Tools:</b>
                        {` ${classData.proficiencies.tools}-`}
                    </div>
                    <div>
                        <b>Saving Throws:</b>
                        {` ${classData.proficiencies.saving_throws.map(proficiency => capitalize(proficiency)).join(', ')}`}
                    </div>
                    <div>
                        <b>Skills:</b>
                        {` Choose ${classData.proficiencies.skills.amount} from ${classData.proficiencies.skills.options.map(skill => capitalize(skill)).join(', ')}`}
                    </div>
                    <Header>
                        <h4>Equipment</h4>
                    </Header>
                    <div className={styles.descSection} >
                        {classData.equipment.map(section => buildContentSection(section))}
                    </div>
                    <Header>
                        <h4>Optional Rule: Multiclassing</h4>
                    </Header>
                    <div className={styles.descSection} >
                        {classData.multiclassing.description.map(section => buildContentSection(section))}
                    </div>
                </div>
                {
                    classData.features_by_level.map((level, i) => {
                        let features = [...level.features]
                        if (selectedSubclass.features_by_level[i+1])
                            features = features.concat(selectedSubclass.features_by_level[i+1].features)
                        //console.log({...classData.features, ...selectedSubclass.features})
                        return buildFeaturesPerLevel(features, {...classData.features, ...selectedSubclass.features}, i+1)
                    })
                }
            </div>
        </div>
    )
}

export default CharClasses;