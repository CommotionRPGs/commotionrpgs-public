import TableLogic from '@/components/table/TableLogic';
import spells from '@/data/allSpells.json'
import { useSpellStore } from '@/context/spellStore';
import { BiSolidError } from "react-icons/bi";
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import styles from "@/styles/Admin.module.css"
import BetterModal from '@/components/BetterModal';
import AddSpellForm from './forms/AddSpellForm';
import { useDBAuthStore } from '@/context/authStore';

const SpellAdminPanel = () => {
    const uploadedSpells = useSpellStore((state) => state.spells)
    const addSpell = useSpellStore((state) => state.addSpell)
    const dbUser =  useDBAuthStore((state) => state.dbUser)
    const [editingSpell, setEditingSpell] = useState(false)
    //const [selectedSpell, setSelectedSpell] = useState(false)

    const spellFields = {
        'id': 'String',
        'level': 'Number',
        'name': 'String',
        'school': 'Array',
        'ritual': 'Boolean',
        'casting_time': 'String',
        'range': 'String',
        'duration': 'String',
        'components': 'Array',
        'classes': 'Array',
        'source': 'String',
        'description': 'Array'
    }

    const checkSpellData = (spellData) => {
        const errors = []
        const fields = Object.keys(spellData)
        Object.keys(spellFields).forEach((key) => {
            // Checking for missing fields
            if (fields.indexOf(key) === -1) {
                errors.push(`Error: Spell is missing field: ${key}`)
            }
            // Checking for field type && empty fields
            else {
                const fieldType = spellFields[key]
                switch(fieldType) {
                    case 'String':
                        if (typeof spellData[key] !== 'string') {
                            errors.push(`Error: Field ${key} has the wrong data type: ${typeof spellData[key]} instead of string`)
                        }
                        else if (spellData[key] === '') {
                            errors.push(`Error: Field ${key} is empty.`)
                        }
                        break;
                    case 'Number':
                        if (typeof spellData[key] !== 'number') {
                            errors.push(`Error: Field ${key} has the wrong data type: ${typeof spellData[key]} instead of number`)
                        }
                        break;
                    case 'Boolean':
                        if (typeof spellData[key] !== 'boolean') {
                            errors.push(`Error: Field ${key} has the wrong data type: ${typeof spellData[key]} instead of boolean`)
                        }
                        break;
                    case 'Array':
                        if (!Array.isArray(spellData[key])) {
                            errors.push(`Error: Field ${key} has the wrong data type: ${typeof spellData[key]} instead of array`)
                        }
                        else if (spellData[key].length === 0) {
                            errors.push(`Error: Field ${key} is empty.`)
                        }
                        break;
                }
            }
        })
        // Check for optional field components
        if (spellData.components && spellData.components.indexOf('M') !== -1 && (fields.indexOf('materials') === -1 || spellData['materials'] === '')) {
            errors.push('Error: Spell is missing description of material components')
        }
        return errors;
    }

    const [data, setData] = useState([])

    useEffect(() => {
        setData(spells.reduce((filtered, spell) => {
            const errors = checkSpellData(spell)
            if (errors.length > 0 && uploadedSpells.find((uploadedSpell) => uploadedSpell.id === spell.id) === undefined) {
                filtered.push({level: spell.level, name: spell.name, errors: errors, data: spell})
            }
            //console.log(filtered[filtered.length-1])
            return filtered;
        }, []))
    }, [uploadedSpells])

    const editSpellHandler = (spell) => {
        console.log(spell.data)
        setEditingSpell({ spell: ({...spell.data, description: []})})
    }
    
    const formSubmitHandler = (e, content) => {
        e.preventDefault()
        const spell = content;
        setEditingSpell(false)
        addSpell(dbUser, spell)
    }

    /*
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
    */

    const formCancelHandler = () => {
        setEditingSpell(false)
    }

    return (
        <div>
            <BetterModal openModal={editingSpell} setOpenModal={setEditingSpell}>
                <AddSpellForm formPrefill={editingSpell.spell} handleFormCancel={formCancelHandler} handleFormSubmit={formSubmitHandler} />
            </BetterModal>
            <TableLogic 
                data={data}
                columns={[
                    { label: "Level", accessor: "level", sortable: true },
                    { label: "Name", accessor: "name", sortable: true },
                    { label: "Errors", accessor: "errors", sortable: true},
                    { label: "", accessor: 'buttons', sortable: false}
                    //{ label: "School", accessor: "school", sortable: true },
                    //{ label: "Ritual", accessor: "ritual", sortable: true },
                    //{ label: "Casting Time", accessor: "casting_time", sortable: true },
                    //{ label: "Range", accessor: "range", sortable: true },
                    //{ label: "Duration", accessor: "duration", sortable: true },
                    //{ label: "Components", accessor: "components", sortable: false },
                    //{ label: "Source", accessor: "source", sortable: true },
                ]}
                options={{
                    columns: {
                        buttons: {
                            minimize: true
                        }
                    },
                    display: {
                        level: ((data) => data['level'] ? data['level'] : 'Cantrip'),
                        buttons: ((data) => <FaEdit className={styles.iconBtn} onClick={() => editSpellHandler(data)} />),
                        errors: ((data) => 
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'red'
                                }}
                            >
                                <BiSolidError />
                                {`Contains ${data['errors'].length} error${data['errors'].length > 1 ? 's' : ''}`}
                            </div>
                        ),
                        expander_content: ((data) => data['errors'].map((error, i) => <p key={`error_${i}`}>{error}</p>))    
                    }
                }}
            />
            {/*<TableLogic 
                data={spells}
            />*/}
        </div>
    )
}
export default SpellAdminPanel;