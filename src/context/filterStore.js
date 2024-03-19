import { create } from 'zustand';

const filterStore = (set) => ({
    spellsFilter: {
        filter: {
            level: {
            },
            name: '',
            school: [],
            source: [],
            classes: []
        },
        sort: undefined
    },
    changeFilter: (key, filter) => {
        set((state) => ({
            [key]: filter
        }))
    }
})
export const useFilterStore = create(filterStore);