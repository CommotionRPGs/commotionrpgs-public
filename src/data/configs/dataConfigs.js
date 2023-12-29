/*===========================
    General data
============================*/
export const sources = [
    "aquisitions inc.",
    "critical role twitter",
    "explorer's guide to wildemount",
    "fizban's treasury of dragons",
    "grim hollow",
    "guildmaster's guide to ravnica",
    "heliana's guide to monster hunting",
    "homebrew",
    "humblewood",
    "kibbles' casting compendium",
    "kibbles' compendium of craft and creation",
    "kibbles' compendium of legends and legacies",
    "lost laboratory of kwalish",
    "player's handbook",
    "rime of the frostmaiden",
    "spelljammer",
    "steinhardt's guide to the eldritch hunt",
    "stibbles' codex of companions",
    "strixhaven",
    "tal'dorei campaign setting",
    "tasha's cauldron of everything",
    "the book of many things",
    "the seas of vodari",
    "under the seas of vodari",
    "unearthed arcana",
    "wizards of the toast",
    "xanathar's guide to everything"
]
export const classes = [
    'artificer',
    'bard',
    'cleric',
    'druid',
    'inventor',
    'occultist',
    'paladin',
    'ranger',
    'sorcerer',
    'spellblade',
    'tamer',
    'warlock',
    'wizard'
]
export const damage_types = [
    'bludgeoning',
    'piercing',
    'slashing',
    'acid',
    'cold',
    'fire',
    'lightning',
    'poison',
    'thunder',
    'force',
    'necrotic',
    'psychic',
    'radiant'
]
/*===========================
    Creature-based data
============================*/
export const sizes = [
    'tiny',
    'small',
    'medium',
    'large',
    'huge',
    'gargantuan'
]
export const creature_types = [
    'aberration',
    'beast',
    'celestial',
    'construct',
    'dragon',
    'elemental',
    'fey',
    'fiend',
    'giant',
    'humanoid',
    'monstrosity',
    'ooze',
    'plant',
    'undead'
]
export const abilities = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma'
]
export const skills = [
    'athletics',
    'acrobatics',
    'sleight of hand',
    'stealth',
    'arcana',
    'history',
    'investigation',
    'nature',
    'religion',
    'animal handling',
    'insight',
    'medicine',
    'perception',
    'survival',
    'deception',
    'intimidation',
    'performance',
    'persuasion'
]
export const skill_to_ability = {
    'athletics': 'strength',
    'acrobatics': 'dexterity',
    'sleight of hand': 'dexterity',
    'stealth': 'dexterity',
    'arcana': 'intelligence',
    'history': 'intelligence',
    'investigation': 'intelligence',
    'nature': 'intelligence',
    'religion': 'intelligence',
    'animal handling': 'wisdom',
    'insight': 'wisdom',
    'medicine': 'wisdom',
    'perception': 'wisdom',
    'survival': 'wisdom',
    'deception': 'charisma',
    'intimidation': 'charisma',
    'performance': 'charisma',
    'persuasion': 'charisma'
}
export const ability_to_skills = {
    'strength': [
        'athletics'
    ],
    'dexterity': [
        'acrobatics',
        'sleight of hand',
        'stealth',
    ],
    'constitution': [],
    'intelligence': [
        'arcana',
        'history',
        'investigation',
        'nature',
        'religion'
    ],
    'wisdom': [
        'animal handling',
        'insight',
        'medicine',
        'perception',
        'survival'
    ],
    'charisma': [
        'deception',
        'intimidation',
        'performance',
        'persuasion'
    ]
}
export const conditions = [
    'blinded',
    'charmed',
    'deafened',
    'frightened',
    'grappled',
    'incapacitated',
    'invisible',
    'paralyzed',
    'petrified',
    'poisoned',
    'prone',
    'restrained',
    'stunned',
    'unconcious',
    'exhaustion'
]
export const senses = [
    'blindsight',
    'darkvision',
    'tremorsense',
    'truesight'
]
export const languages = [
    'abyssal',
    'celestial',
    'common',
    'deep speech',
    'draconic',
    'dwarvish',
    'elvish',
    'giant',
    'gnomish',
    'goblin',
    'halfling',
    'infernal',
    'orc',
    'sylvan',
    'undercommon'
]
export const level_to_pb = (level) => {
    return Math.floor(level/4) + 2;
}
export const cr_to_pb = (cr) => {
    if (cr.indexOf("/") !== -1) {
        return 2;
    }
    else {
        return level_to_pb(Number(cr))
    }
}

/*===========================
    Spell-based data
============================*/
export const spell_levels = [
    { value: 0, label: "Cantrip"},
    { value: 1, label: "1st-level"},
    { value: 2, label: "2nd-level" },
    { value: 3, label: "3rd-level" },
    { value: 4, label: "4th-level" },
    { value: 5, label: "5th-level" },
    { value: 6, label: "6th-level" },
    { value: 7, label: "7th-level" },
    { value: 8, label: "8th-level" },
    { value: 9, label: "9th-level" }
]

export const spell_schools = [
    "abjuration",
    "biomancy",
    "conjuration",
    "divination",
    "dunamancy",
    "enchantment",
    "evocation",
    "illusion",
    "necromancy",
    "sangromancy",
    "transmutation"
]