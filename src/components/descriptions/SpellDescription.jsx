import MonsterDescription from "@/components/descriptions/MonsterDescription";
import { useMonsterStore } from "@/context/monsterStore";
import styles from "@/styles/components/Description.module.css";
import { capitalizeTitle, capitalize } from "@/utils/utils";
import Header from "@/components/basic/Header";

const SpellDescription = ({ spellData, descriptionOnly=false }) => {
    const monsters = useMonsterStore((state) => state.monsters)


    const formatSchoolLevel = () => {
        const school = spellData.school.map(school => capitalize(school)).join('/')
        switch(spellData.level) {
            case 0: 
                return (<span>{school} Cantrip</span>)
            case 1:
                return (<span>1st-level {school}</span>)
            case 2:
                return (<span>2nd-level {school}</span>)
            case 3:
                return (<span>3rd-level {school}</span>)
            default:
                return (<span>{spellData.level}th-level {school}</span>)
        }
    }

    const findMonster = (id) => {
        const result = monsters.find(m => m.id === id)
        if (result !== undefined) {
            return <MonsterDescription monsterData={result}/>
        }
        else {
            return <div>{"Couldn't find monster"}</div>
        }
    }

    return (
        <div className={styles.spellDescContainer} >
            {!descriptionOnly && <>
                <div className="name-or-title">
                    <Header variant={1}>
                        <h3>{spellData.name}</h3>
                    </Header>
                </div>
                <div className="source">
                    {`Source: ${capitalizeTitle(spellData.source)}`}
                </div>
                <div className="school-and-level">
                    <div>
                        <em>
                            {formatSchoolLevel()} {spellData.ritual && '(ritual)'}
                        </em>
                    </div>
                </div>
                <div>
                    <strong>Casting Time: </strong>
                    {spellData.casting_time.toLowerCase().indexOf('reaction') !== -1? `${spellData.casting_time}, ${spellData.reaction_condition}` : spellData.casting_time}
                    <br />
                    <strong>Range: </strong>
                    {spellData.range}
                    <br />
                    <strong>Components: </strong>
                    {spellData.components.join(", ")}
                    <br />
                    <strong>Duration: </strong>
                    {spellData.duration}
                    <br /> 
                </div>
            </>}
            <div className={styles.description}>
                {spellData.description.map((p, i) => {
                    switch(p.title) {
                        case 'list':
                            return (
                                <div>
                                    <ul>
                                        {p.content.map((item) => {
                                            return (
                                                <li>
                                                    {item.title !== 'untitled' && <strong>{`${item.title}. `}</strong>}
                                                    {item.content}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        case 'table':
                            return (
                                <div key={`description_section_${i}`}>
                                    <div className={styles.tableContainer} >
                                        <thead>
                                            <tr className={styles.tableRow} >
                                                {p.content[0].map((col, c) => {
                                                    return (
                                                        <th key={`description_section_${i}_table_0_${c}`}>
                                                            {col}
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {p.content.slice(1).map((row, r) => {
                                                return (
                                                    <tr className={styles.tableRow}>
                                                        {row.map((col, c) => {
                                                            return (
                                                                <td key={`description_section_${i}_table_${r}_${c}`}>
                                                                    {col}
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </div>
                                </div>
                            )
                        case 'untitled':
                            return (
                                <div key={`description_section_${i}`}>
                                    {p.content}
                                </div>
                            )
                        case 'monster':
                            //const monster = findMonster()
                            return (
                                <div key={`description_section_${i}`}>
                                    {findMonster(p.content)}
                                </div>
                            )
                        default:
                            //console.log(p.title)
                            return (
                                <div key={`description_section_${i}`}>
                                    <strong>{`${p.title}. `}</strong>
                                    {p.content}
                                </div>
                            )
                    }
                })}
            </div>    
            {!descriptionOnly && <div className="classes">
                <strong>Spell Lists: </strong>
                {spellData.classes.map(spellList => capitalize(spellList)).join(", ")}
                <br />
            </div>}
        </div>
    )
};
export default SpellDescription;