import { useState, useEffect } from 'react'
import { GiMonsterGrasp, GiBoltSpellCast } from 'react-icons/gi'
import Header from '@/components/Header'
import BetterModal from '@/components/BetterModal';
import TableLogic from '@/components/table/TableLogic';
import AddSpellForm from '@/components/forms/AddSpellForm';
import AddMonsterForm from '@/components/forms/AddMonsterForm';
import SpellDescription from '@/components/descriptions/SpellDescription';
import { useMonsterStore } from '@/context/monsterStore';
import { useSpellStore } from '@/context/spellStore';
import { NavLink } from 'react-router-dom';
import { TbCircleLetterR, TbCircleLetterC } from 'react-icons/tb'
import {
    spell_schools,
    sources,
    classes
} from "@/data/configs/dataConfigs"
import { capitalize, capitalizeTitle } from '@/utils/utils';
import { useDBAuthStore } from '@/context/authStore';
import styles from "@/styles/Spells.module.css"

const Spells  = () => {
    const monsters = useMonsterStore((state) => state.monsters)
    const spells = useSpellStore((state) => state.spells)
    const addSpell = useSpellStore((state) => state.addSpell)
    const editSpell = useSpellStore((state) => state.editSpell)
    const loadSpells = useSpellStore((state) => state.loadSpells)
    const dbUser = useDBAuthStore((state) => state.dbUser)
    const [openModal, setOpenModal] = useState({
        spell: false,
        monster: false,
    })

    useEffect(() => {
        //console.log("dbUser effect has been triggered")
        if (spells.length === 0 && dbUser) {
            loadSpells(dbUser)
        }
    }, [dbUser])

    const handleOpenModal = (modalType) => {
        setOpenModal({
            ...openModal,
            [modalType]: true
        })
    }

    const handleFormSubmit = (formName, e, content) => {
        e.preventDefault()
        // console.log(content)
        setOpenModal({
            ...openModal,
            [formName]: false
        })
        if (formName === 'spell') {
            addSpell(dbUser, content)
            .then(() => {
                // console.log(spells)
            })
        }
    }

    const handleFormCancel = (formName) => {
        setOpenModal({
            ...openModal,
            [formName]: false
        })
    }

    const getSpells = async () => {
        loadSpells(dbUser)
    }

    return (
        <div
            className={styles.spells}
        >
            <Header>
                <h1>The Spellbook</h1>
                <p>Sortable table of spells using React</p>
                {/*<NavLink to="/spells/acid-splash">Acid Splash</NavLink>*/}
            </Header>
            <button
                onClick={() => handleOpenModal('spell')}
            >
                <GiBoltSpellCast />
            </button>
            <button
                onClick={() => handleOpenModal('monster')}
            >
                <GiMonsterGrasp />
            </button>
            <button
                onClick={getSpells}
            >
                Get Spells
            </button>
            <BetterModal
                openModal={openModal.spell}
                setOpenModal={() => setOpenModal({
                    ...openModal,
                    spell: false
                })}
            >
                <AddSpellForm
                    formPrefill={false}
                    handleFormSubmit={(e, content) => handleFormSubmit('spell', e, content)}
                    handleFormCancel={() => handleFormCancel('spell')}
                />
            </BetterModal>
            <BetterModal
                openModal={openModal.monster}
                setOpenModal={() => setOpenModal({
                    ...openModal,
                    monster: false
                })}
            >
                <AddMonsterForm 
                    formPrefill={monsters[1]}
                    handleFormSubmit={(e, content) => handleFormSubmit('monster', e, content)}
                    handleFormCancel={() => handleFormCancel('monster')}
                />
            </BetterModal>
            <TableLogic 
                data={spells}
                columns={[
                    { label: "Level", accessor: "level", sortable: true },
                    { label: "Name", accessor: "name", sortable: true },
                    { label: "School", accessor: "school", sortable: true },
                    //{ label: "Ritual", accessor: "ritual", sortable: true },
                    { label: "Casting Time", accessor: "casting_time", sortable: true },
                    { label: "Range", accessor: "range", sortable: true },
                    { label: "Duration", accessor: "duration", sortable: true },
                    { label: "Components", accessor: "components", sortable: false },
                    { label: "Source", accessor: "source", sortable: true },
                ]}
                options={{
                    display: {
                        "level": ((data) => {return data['level'] !== 0 ? data['level'] : 'Cantrip'}),
                        "name": ((data) => {
                            const name = data["name"]
                            //console.log(`The data for ${name} looks like this when something goes wrong: `, data)
                            return (<>
                                {name ? 
                                    <NavLink 
                                        to={"/spells/"+name.toLowerCase().replace(/\s/g, '-')}
                                        state={{spellData: data}}
                                    >
                                        {name}
                                    </NavLink> 
                                    : "--"
                                }
                                {data['ritual'] && (
                                    <span style={{marginLeft: "2px"}}>
                                        <TbCircleLetterR />
                                    </span>
                                )}
                                {data['duration'].indexOf('Concentration') !== -1 && (
                                    <span style={{marginLeft: "2px"}}>
                                        <TbCircleLetterC />
                                    </span>
                                )}
                            </>)
                        }),
                        "school": ((data) => data.school.map(s => capitalize(s))),
                        "source": ((data) => capitalizeTitle(data.source)),
                        "components": ((data) => data['components'] ? data['components'].join(', ') : '--'),
                        "expander_content": ((data) => {
                            return (
                                <SpellDescription spellData={data} descriptionOnly/>
                                /*data['description'].map((p, i) => {
                                    switch(p.title) {
                                        case 'list':
                                            //console.log("list section", p)
                                            return (
                                                <ul className="clickable-row-expansion" key={`description_section_${i}`}>
                                                    {p.content.map((item) => {
                                                        return (
                                                            <li>
                                                                {item.title !== 'untitled' && <strong>{item.title}</strong>}
                                                                {item.content}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            )
                                        case 'untitled':
                                            //console.log("untitled section", p)
                                            return (
                                                <p className="clickable-row-expansion" key={`description_section_${i}`}>
                                                    {p.content}
                                                </p>
                                            )
                                        default:
                                            //console.log("titled section", p)
                                            return (
                                                <p className="clickable-row-expansion" key={`description_section_${i}`}>
                                                    <strong>{`${p.title}. `}</strong>
                                                    {p.content}
                                                </p>
                                            )
                                    }
                                })*/
                                /*data["description"].map((paragraph) => 
                                    <p className="clickable-row-expansion" key={uuidv4()}>
                                        {paragraph["title"] !== 'untitled' && 
                                            <strong><em>{paragraph["title"]+" "}</em></strong>
                                        }
                                        {paragraph["content"]}
                                        <br />
                                    </p>
                                )*/
                            )
                        })
                    },
                    filter: {
                        level: {
                            type: 'range',
                            max: 9,
                            min: 0
                        },
                        name: {
                            type: 'text',
                        },
                        school: {
                            type: 'multiSelect',
                            options: spell_schools.map((school) => ({ value: school, label: capitalize(school)}))
                        },
                        source: {
                            type: 'multiSelect',
                            options: sources.map((source) => ({ value: source, label: capitalizeTitle(source)}))
                        },
                        classes: {
                            type: 'multiSelect',
                            options: classes.map((spellList) => ({ value: spellList, label: capitalize(spellList)}))
                        }
                    }
                }}
            />
        </div>
    );
};
export default Spells;