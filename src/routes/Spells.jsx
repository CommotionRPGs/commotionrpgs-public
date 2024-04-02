import { useState, useEffect } from 'react'
import Header from '@/components/basic/Header'
import TableLogic from '@/components/table/TableLogic';
import SpellDescription from '@/components/descriptions/SpellDescription';
import { useSpellStore } from '@/context/spellStore';
import { useMonsterStore } from '@/context/monsterStore';
import { NavLink } from 'react-router-dom';
import { TbCircleLetterR, TbCircleLetterC } from 'react-icons/tb'
import {
    spell_schools,
    sources,
    classes,
    grouped_sources
} from "@/data/configs/dataConfigs"
import { capitalize, capitalizeTitle } from '@/utils/utils';
import { useDBAuthStore } from '@/context/authStore';
import { useFilterStore } from '@/context/filterStore';
import styles from "@/styles/routes/Spells.module.css"

const Spells  = () => {
    const spells = useSpellStore((state) => state.spells)
    const monsters = useMonsterStore((state) => state.monsters)
    const loadSpells = useSpellStore((state) => state.loadSpells)
    const loadMonsters = useMonsterStore((state) => state.loadMonsters)
    const dbUser = useDBAuthStore((state) => state.dbUser)
    //const tableSettings = useFilterStore((state) => state.spells)
    const filter = useFilterStore((state) => state.spellsFilter)
    const setFilter = useFilterStore((state) => state.changeFilter)

    useEffect(() => {
        if (spells.length === 0 && dbUser) {
            loadSpells(dbUser)
        }
        if (monsters.length === 0 && dbUser) {
            loadMonsters(dbUser)
        }
    }, [dbUser])

    return (
        <div
            className={styles.spells}
        >
            {/*<Header>
                <h1>The Spellbook</h1>
                <p>Sortable table of spells using React</p>
            </Header>*/}
            <TableLogic 
                data={spells}
                columns={[
                    { label: "Level", accessor: "level", sortable: true },
                    { label: "Name", accessor: "name", sortable: true },
                    { label: "School", accessor: "school", sortable: true },
                    { label: "Casting Time", accessor: "casting_time", sortable: true },
                    { label: "Range", accessor: "range", sortable: true },
                    { label: "Duration", accessor: "duration", sortable: true },
                    { label: "Components", accessor: "components", sortable: false },
                    { label: "Source", accessor: "source", sortable: true },
                ]}
                pagination={{ pageSize: 20 }}
                options={{
                    title: (<Header>
                                <h1>The Spellbook</h1>
                            </Header>
                        ),
                    display: {
                        "level": ((data) => {return data['level'] !== 0 ? data['level'] : 'Cantrip'}),
                        "name": ((data) => {
                            const name = data["name"]
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
                            options: grouped_sources.map(group => 
                                ({
                                    label: group.label,
                                    options: group.options.map((source) => ({ value: source, label: capitalizeTitle(source)}))
                                })
                            )//sources.map((source) => ({ value: source, label: capitalizeTitle(source)}))
                        },
                        classes: {
                            type: 'multiSelect',
                            options: classes.map((spellList) => ({ value: spellList, label: capitalize(spellList)}))
                        }
                    },
                    persist: {
                        filter: filter.filter,
                        setFilter: ((val) => setFilter('spellsFilter', {
                            ...filter,
                            filter: val
                        })),
                        sort: filter.sort,
                        setSort: ((val) => setFilter('spellsFilter', {
                            ...filter,
                            sort: val
                        }))
                    }
                }}
            />
        </div>
    );
};
export default Spells;