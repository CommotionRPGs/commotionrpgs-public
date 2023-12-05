import { create } from 'zustand';
import tableData1 from "@/data/spells.json"
import * as spellApi from "@/api/spellApi"

const spellStore = (set) => ({
    spells: [],
    loadSpells: async (user) => {
        // console.log("Loading all spells...")
        const loadedSpells = await spellApi.getSpells(user);
        set(() => ({
            spells: loadedSpells
        }))
    },
    getSpellById: () => {
        return;
    },
    editSpell: (id, spell) => {
        // console.log(`Editing spell ${spell.name}...`)
        set((state) => ({
            spells: state.spells.map(s => {
                return s.id === id ? spell : s
            })
        }))
    },
    addSpell: async (user, spell) => {
        // console.log(`Adding spell ${spell.name}...`)
        spellApi.addSpell(user, spell)
        .then((response) => {
            set((state) => ({
                spells: [...state.spells, {_id: response.insertedId ,...spell}]
            }))
        })
    },
})
export const useSpellStore = create(spellStore);