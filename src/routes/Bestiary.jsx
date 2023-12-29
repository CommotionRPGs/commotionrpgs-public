import TableLogic from "@/components/table/TableLogic";
import Header from "@/components/Header";
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
            <Header>
                <h1>The Bestiary</h1>
                <p>Sortable table of spells using React</p>
                {/*<NavLink to="/spells/acid-splash">Acid Splash</NavLink>*/}
            </Header>
            <TableLogic
                data={monsters}
                columns={[
                    { label: "CR", accessor: "cr", sortable: true },
                    { label: "Name", accessor: "name", sortable: true },
                ]}
            />
        </div>
    )
}
export default Bestiary;