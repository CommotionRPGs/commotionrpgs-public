export async function getSpells(user) {
    console.log("Loading all spells...")
    // console.log('User is ', user)
    // console.log('User functions are ', user.functions)
    const spells = await user.functions.getAllSpells();
    // console.log('Spells', spells)
    return spells//await user.functions.getAllSpells();
}

export async function addSpell(user, spell) {
    console.log(`Adding spell ${spell.name}...`)
    return await user.functions.addSpell(spell);
}

export async function editSpell(user, spell) {
    console.log(`Editing spell ${spell.name}...`)
    return await user.functions.editSpell(spell.id, spell)
}