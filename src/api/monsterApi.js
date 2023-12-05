export async function getMonsters(user) {
    console.log("Loading all monsters...")
    return await user.functions.getAllMonsters();
}

export async function addMonster(user, monster) {
    console.log(`Adding monster ${monster.name}...`)
    return await user.functions.addMonster(monster);
}