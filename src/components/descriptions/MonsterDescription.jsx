import { skill_to_ability } from '@/data/configs/dataConfigs'
import styles from '@/styles/components/Description.module.css'
import { createRef, useEffect } from 'react'
import Header from '@/components/basic/Header'
import { useAuthStore } from '@/context/authStore'

const MonsterDescription = ({ monsterData }) => {
    const container = createRef()
    const theme = useAuthStore(state => state.user.theme)
    /*{
        "id": 1,
        "name": "Bandit",
        "size": "medium",
        "creature_type": "humanoid",
        "alignment": "any non-lawful alignment",
        "armor_class": "12",
        "hit_points": "11 (2d8+2)",
        "speed": "30 ft.",
        "ability_scores": {
            "str": 11,
            "dex": 12,
            "con": 12,
            "int": 10,
            "wis": 10,
            "cha": 10
        },
        "saving_throws": {
        },
        "skills": {
        },
        "damage_irv": {
        },
        "condition_i": [
        ],
        "senses": {
        },
        "initiative_modifier": 0,
        "languages": [],
        "cr": "1/8",
        "pb": 2,
        "traits": [],
        "actions": [
            {
                "title": "Scimitar",
                "content": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 +1) slashing damage."
            },
            {
                "title": "Light Crossbow",
                "content": "Ranged Weapon Attack: +3 to hit, range 80 ft., one target. Hit: 5 (1d8 +1) piercing damage."
            }
        ],
        "bonus_actions": [],
        "reactions": [],
        "legendary_actions": [],
        "mythic_actions": []
    }*/
    const skillAbilities = skill_to_ability

    useEffect(() => {
        const numOfChildren = container.current.children.length
        let childrenHeight = 0
        const containerHeight = container.current.scrollHeight
        const dividerHeight = {
            default: 22,
            heliana: 3,
            ryoko: 12
        }[theme]
        for (let i = 0; i < numOfChildren; i++) {
            const height = container.current.children.item(i).scrollHeight
            childrenHeight += container.current.children.item(i).className === styles.divider ? dividerHeight : height
        }

        //console.log(`Total Children Height: ${childrenHeight}`)
        //console.log(`Container Height: ${containerHeight}`)
        //console.log(`Number of columns should be ${Math.ceil((childrenHeight+8)/containerHeight)}`)
        //console.log(container.current.style)
        container.current.style.width = `${400*Math.ceil((childrenHeight+8)/containerHeight)+16}px`
        //console.log(container.current.children.item(1).className)
    },[container])

    const getASModifier = (score, type='', pb=2, sign=true) => {
        //console.log(score, type, pb, sign)
        const modifier = Math.floor((score-10)/2);
        if (isNaN(pb)) {
            switch(type) {
                case 'expertise':
                    return `${sign ? addSign(modifier) : modifier} plus PB x2`
                case 'proficient':
                    return `${sign ? addSign(modifier) : modifier} plus PB`
                default: 
                    return sign ? addSign(modifier) : modifier
            }
        }
        else {
            const modifierP = (modifier + pb)
            const modifierE = (modifier + (2*pb))
            switch (type) {
                case 'expertise':
                    return sign ? addSign(modifierE) : modifierE
                case 'proficient':
                    return sign ? addSign(modifierP) : modifierP
                default: 
                    return sign ? addSign(modifier) : modifier
            }
        }
    }

    const addSign = (x) => x >= 0 ? `+${x}` : x

    const capitalize = (s) => {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    const buildDamageIRV = () => {
        const dImmunities = Object.keys(monsterData.damage_irv).filter(dtype => monsterData.damage_irv[dtype] === 'immune')
        const dResistances = Object.keys(monsterData.damage_irv).filter(dtype => monsterData.damage_irv[dtype] === 'resistant')
        const dVulnerabilities = Object.keys(monsterData.damage_irv).filter(dtype => monsterData.damage_irv[dtype] === 'vulnerable')
        return (
            <div>
                {dVulnerabilities.length !== 0 &&
                    <div>
                        <span>
                            <strong>Damage Vulnerabilities </strong>
                            {dVulnerabilities.join(', ')}
                        </span>
                    </div>
                }
                {dResistances.length !== 0 &&
                    <div>
                        <span>
                            <strong>Damage Resistances </strong>
                            {dResistances.join(', ')}
                        </span>
                    </div>
                }
                {dImmunities.length !== 0 &&
                    <div>
                        <span>
                            <strong>Damage Immunities </strong>
                            {dImmunities.join(', ')}
                        </span>
                    </div>
                }
            </div>
        )
    }

    const buildSection = (title, section) => {
        return (
            <div className={styles.sectionContainer} >
                {title && 
                    <div className={styles.sectionTitleWrapper} >
                        <h4>{title.toUpperCase()}</h4>
                    </div>
                }
                <div className={styles.sectionBodyWrapper} >
                    {section.map((item, i) => {
                        //console.log(item)
                        switch(item.title) {
                            case "untitled": 
                                return (
                                    <div key={`section_item_${i}`}>
                                        {item.content}
                                    </div>    
                                )
                            default:
                                return (
                                    <div key={`section_item_${i}`}>
                                        <span>
                                            <strong>{`${item.title}. `}</strong>
                                            {item.content}
                                        </span>
                                    </div>    
                                )
                        }
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.monsterDesc} >
            <div 
                className={styles.borderTop}
            />
            <div
                className={styles.monsterDescContainer}
                ref={container}
            >
                <div>
                    <Header variant={1}>
                        <h3>{monsterData.name}</h3>
                    </Header>
                    <span><i>{`${capitalize(monsterData.size)} ${monsterData.creature_type}${monsterData.alignment && `, ${monsterData.alignment}`}`}</i></span>
                </div>
                <div className={styles.divider} />
                <div>
                    <span><strong>Armor Class </strong>{monsterData.armor_class}</span>
                </div>
                <div>
                    <b>Hit Points </b>
                    {monsterData.hit_points}
                </div>
                <div>
                    <span><strong>Speed </strong>{monsterData.speed}</span>
                </div>
                <div className={styles.divider} />
                <div
                    className={styles.statsContainer}
                >
                    {Object.keys(monsterData.ability_scores).map(stat => {
                        return (
                            <div
                                key={`stat_${stat}`}
                            >
                                <h5>{stat.slice(0, 3).toUpperCase()}</h5>
                                {`${monsterData.ability_scores[stat]} (${getASModifier(monsterData.ability_scores[stat])})`}
                            </div>    
                        )
                    })}
                </div>
                <div className={styles.divider} />
                {Object.keys(monsterData.saving_throws).length > 1 &&
                    <div>
                        <span>
                            <strong>Saving Throws </strong>
                            {Object.keys(monsterData.saving_throws).map(st => {
                                return `${capitalize(st)} ${getASModifier(monsterData.ability_scores[st], monsterData.saving_throws[st], monsterData.pb)}`
                            }).join(', ')}
                        </span>
                    </div>
                }
                {Object.keys(monsterData.skills).length > 1 && 
                    <div>
                        <span>
                            <strong>Skills </strong>
                            {Object.keys(monsterData.skills).map(skill => {
                                return `${capitalize(skill)} ${getASModifier(monsterData.ability_scores[skillAbilities[skill]], monsterData.skills[skill], monsterData.pb)}`
                            }).join(', ')}
                        </span>
                    </div>
                }
                {buildDamageIRV()}
                {monsterData.condition_i.length > 0 &&
                    <div>
                        <span>
                            <strong>Condition Immunities </strong>
                            {monsterData.condition_i.join(', ')}
                        </span>
                    </div>
                }
                <div>
                    <span>
                        <strong>Senses </strong>
                        {Object.keys(monsterData.senses).map(sense => {
                            return (`${sense} ${monsterData.senses[sense]} ft., `)
                        })}
                        {'Passive Perception '}
                        {isNaN(monsterData.pb)
                            ? `10 + (${getASModifier(monsterData.ability_scores['wisdom'], monsterData.skills['perception'], monsterData.pb, false)})`
                            : 10 + getASModifier(monsterData.ability_scores['wisdom'], monsterData.skills['perception'], monsterData.pb, false)
                        }
                    </span>
                </div>
                <div>
                    <span>
                        <strong>Languages </strong>
                        {monsterData.languages.join(', ')}
                    </span>
                </div>
                <div className={styles.crpbContainer}>
                    <div>
                        <span>
                            <strong>Challenge </strong>
                            {monsterData.cr}
                        </span>
                    </div>
                    <div>
                        <span>
                            <strong>{'Proficiency Bonus (PB) '}</strong>
                            {isNaN(monsterData.pb) ? monsterData.pb : addSign(monsterData.pb)}
                        </span>
                    </div>
                </div>
                <div className={styles.divider} />
                {monsterData.traits.length > 0 && buildSection('', monsterData.traits)}
                {monsterData.actions.length > 0 && buildSection('Actions', monsterData.actions)}
                {monsterData.bonus_actions.length > 0 && buildSection('Bonus Actions', monsterData.bonus_actions)}
                {monsterData.reactions.length > 0 && buildSection('Reactions', monsterData.reactions)}
                {monsterData.legendary_actions.length > 0 && buildSection('Legendary Actions', monsterData.legendary_actions)}
                {monsterData.mythic_actions.length > 0 && buildSection('Mythic Actions', monsterData.mythic_actions)}
            </div>
            <div 
                className={styles.borderBot}
            />
        </div>
        
    )
}
export default MonsterDescription;