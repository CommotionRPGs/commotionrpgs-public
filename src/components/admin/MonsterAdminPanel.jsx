import BetterModal from "@/components/BetterModal";
import AddMonsterForm from "@/components/forms/AddMonsterForm";
import TableLogic from "@/components/table/TableLogic";
import { useDBAuthStore } from "@/context/authStore";
import { useMonsterStore } from "@/context/monsterStore";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import styles from "@/styles/routes/Admin.module.css"
import { capitalizeTitle } from "@/utils/utils";
import { sources } from "@/data/configs/dataConfigs";

const MonsterAdminPanel = () => {
    const monsters = useMonsterStore((state) => state.monsters)
    const addMonster = useMonsterStore((state) => state.addMonster)
    const editMonster = useMonsterStore((state) => state.editMonster)
    const dbUser =  useDBAuthStore((state) => state.dbUser)
    const [editingMonster, setEditingMonster] = useState(false)

    const monsterFields = {
        'id': 'String',
        'name': 'String',
        'size': 'String',
        'creature_type': 'String',
        'alignment': 'String',
        'armor_class': 'String',
        'hit_points': 'String',
        'speed': 'String',
        'ability_scores': 'List',
        'saving_throws': 'Object',
        'skills': 'Object',
        'damage_irv': 'Object',
        'condition_i': 'List',
        'senses': 'Object',
        'initiative_modifier': 'Number',
        'languages': 'List',
        'cr': 'Number',
        'pb': 'String',
        'traits': 'Object'
    }

    return (
        <>
            <BetterModal>
                <AddMonsterForm />
            </BetterModal>
            <TableLogic 
                data={monsters}
                columns={[
                    { label: "CR", accessor: "cr", sortable: true },
                    { label: "Name", accessor: "name", sortable: true },
                    { label: "Source", accessor: "source", sortable: true },
                    { label: "", accessor: 'buttons', sortable: false}
                ]}
                pagination={{ pageSize: 15 }}
                options={{
                    columns: {
                        buttons: {
                            minimize: true
                        }
                    },
                    display: {
                        buttons: ((data) => <FaEdit className={styles.iconBtn} />),
                        source: ((data) => capitalizeTitle(data.source)),
                    },
                    filter: {
                        name: {
                            type: 'text',
                        },
                        source: {
                            type: 'multiSelect',
                            options: sources.map((source) => ({ value: source, label: capitalizeTitle(source)}))
                        },
                    }
                }}
            />
        </>
    )
}
export default MonsterAdminPanel;