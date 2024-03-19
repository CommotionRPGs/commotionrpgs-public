import TableLogic from "@/components/table/TableLogic";
import Header from "@/components/basic/Header";
import MonsterDescription from "@/components/descriptions/MonsterDescription";
import { useEffect } from "react";
import { useMonsterStore } from "@/context/monsterStore";
import { useDBAuthStore } from "@/context/authStore";

const Bestiary = () => {
    const monsters = useMonsterStore((state) => state.monsters)
    const loadMonsters = useMonsterStore((state) => state.loadMonsters)
    const dbUser = useDBAuthStore((state) => state.dbUser)

    useEffect(() => {
        if (monsters.length < 1 && dbUser) {
            loadMonsters(dbUser)
        }
    }, [dbUser])

    return (
        <div>
            <TableLogic
                data={monsters}
                columns={[
                    { label: "CR", accessor: "cr", sortable: true },
                    { label: "Name", accessor: "name", sortable: true },
                ]}
                pagination={{ pageSize: 20 }}
                options={{
                    title: (<Header>
                                <h1>The Bestiary</h1>
                                {/*<NavLink to="/spells/acid-splash">Acid Splash</NavLink>*/}
                            </Header>
                        ),
                    display: {
                        expander_content: ((data) => {
                            return (
                                <MonsterDescription monsterData={data} />
                            )
                        })
                    }
                }}
            />
        </div>
    )
}
export default Bestiary;