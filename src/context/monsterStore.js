import { create } from 'zustand';
//import tableData1 from "@/data/monsters.json"
import * as monsterApi from "@/api/monsterApi"

const monsterStore = (set) => ({
    monsters: [],//tableData1,
    loadMonsters: async (user) => {
        // console.log("Loading all spells...")
        const loadedMonsters = await monsterApi.getMonsters(user);
        set(() => ({
            monsters: loadedMonsters
        }))
    },
    getMonsterById: () => {
        return;
    },
    editMonster: (id, editedMonster) => {
        set((state) => ({
            monsters: state.monsters.map(monster => {
                return monster.id === id ? editedMonster : monster
            })
        }))
    },
    addMonster: async (user, monster) => {
        //const addedMonster = 
        await monsterApi.addMonster(user, monster)
        .then((response) => {
            console.log("Monsters: ", response)
            set((state) => ({
                monsters: [...state.monsters, {_id: response.insertedId ,...monster}]
            }))
        })
        /*set((state) => ({
            monsters: [...state.monsters, addedMonster]
        }))*/
    },
})
export const useMonsterStore = create(monsterStore);