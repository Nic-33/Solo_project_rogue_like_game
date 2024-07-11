export const leftData = {
    1: { name: "Short Sword", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    2: { name: "copper Sword", patk: 6, matk: 0, pdef: 0, mdef: 0, abi: [1, 2] },
    3: { name: "Iron Sword", patk: 10, matk: 0, pdef: 0, mdef: 0, abi: [1, 2, 3] },
    4: { name: "stick", patk: 2, matk: 2, pdef: 0, mdef: 0, abi: [4] },
    5: { name: "crude wand", patk: 2, matk: 6, pdef: 0, mdef: 0, abi: [4, 5] },
    6: { name: "standard wand", patk: 2, matk: 7, pdef: 0, mdef: 0, abi: [4, 5, 6] },
    7: { name: "healers basic wand", patk: 0, matk: 3, pdef: 0, mdef: 0, abi: [7, 9] },
    8: { name: "Broadsword", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    9: { name: "Wood Sword", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    10: { name: "Dagger", patk: 2, matk: 0, pdef: 0, mdef: 0, abi: [10, 11] },
    11: { name: "Mace", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    12: { name: "Warhammer", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    13: { name: "Enchanted Short Sword", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
}

export const rightData = {
    1: { name: "wood shield", patk: 0, matk: 0, pdef: 5, mdef: 0, abi: [1] },
    2: { name: "copper shield", patk: 0, matk: 0, pdef: 5, mdef: 0, abi: [1, 2] },
    3: { name: "Iron shield", patk: 0, matk: 0, pdef: 5, mdef: 2, abi: [1, 2, 3] },
    4: { name: "Magic shield", patk: 0, matk: 0, pdef: 2, mdef: 5, abi: [1, 2, 3, 4] },
    5: { name: "Rusty Spiked Shield", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    6: { name: "Tower Shield", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    7: { name: "Spiked Heater Shield", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    8: { name: "Spectral Shield", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    9: { name: "Royal Banner Shield", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
    10: { name: "Living Vine Shield", patk: 5, matk: 0, pdef: 0, mdef: 0, abi: [1] },
}

export const chestData = {
    1: { name: "cloth", patk: 0, matk: 0, pdef: 1, mdef: 1, abi: [] },
    2: { name: "iron armor", patk: 0, matk: 0, pdef: 5, mdef: 2, abi: [] },
    3: { name: "fine Iron armor", patk: 0, matk: 0, pdef: 7, mdef: 2, abi: [] },
    4: { name: "magic weave robe", patk: 0, matk: 0, pdef: 1, mdef: 7, abi: [] },
    5: { name: "basic robe", patk: 0, matk: 0, pdef: 1, mdef: 5, abi: [] },
    6: { name: "Leather Armor", patk: 0, matk: 0, pdef: 0, mdef: 0, abi: [] },
    7: { name: "Studded Leather Armor", patk: 0, matk: 0, pdef: 0, mdef: 0, abi: [] },
    8: { name: "Plate Mail", patk: 0, matk: 0, pdef: 0, mdef: 0, abi: [] },
    9: { name: "Chainmail", patk: 0, matk: 0, pdef: 0, mdef: 0, abi: [] },
    10: { name: "Worn Chainmail", patk: 0, matk: 0, pdef: 0, mdef: 0, abi: [] },
}

export const enemyData = {
    1: { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
    2: { name: "Slime", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 3, maxDam: 5 },
    3: { name: "Boblin King", curhp: 20, hp: 20, patk: 5, matk: 4, pdef: 7, mdef: 2, abi: [] },
    4: { name: "Skeleton Warrior", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 3, maxDam: 4 },
    5: { name: "Giant Rat", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 2, maxDam: 4 },
    6: { name: "Shadow Lurker", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 5, maxDam: 7 },
}


export const floor_Data = [
    // 1
    {
        0: {
            roomType: 'enemy', enemy: [
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
            ]
        },
        1: {
            roomType: 'enemy', enemy: [
                { name: "Slime", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 3, maxDam: 5 },
            ]
        }
    },
    // 2
    {
        0: {
            roomType: 'enemy', enemy: [
                { name: "Skeleton Warrior", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 3, maxDam: 4 },
                { name: "Skeleton Warrior", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 3, maxDam: 4 },
                { name: "Skeleton Warrior", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 3, maxDam: 4 },
            ]
        },
        1: {
            roomType: 'enemy', enemy: [
                { name: "Giant Rat", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 2, maxDam: 4 },
            ]
        }
    },
    // 3
    {
        0: {
            roomType: 'enemy', enemy: [
                { name: "Skeleton Warrior", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 3, maxDam: 4 },
                { name: "Skeleton Warrior", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 3, maxDam: 4 },
            ]
        },
        1: {
            roomType: 'enemy', enemy: [
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
            ]
        }
    },
    // 4
    {
        0: {
            roomType: 'enemy', enemy: [
                { name: "Skeleton Warrior", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 3, maxDam: 4 },
            ]
        },
        1: {
            roomType: 'enemy', enemy: [
                { name: "Skeleton Warrior", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 3, maxDam: 4 },
            ]
        }
    },
    // 5
    {
        0: {
            roomType: 'enemy', enemy: [
                { name: "Shadow Lurker", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 5, maxDam: 7 },
                { name: "Shadow Lurker", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 5, maxDam: 7 },
            ]
        },
        1: {
            roomType: 'enemy', enemy: [
                { name: "Slime", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 3, maxDam: 5 },
                { name: "Giant Rat", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 2, maxDam: 4 },
                { name: "Giant Rat", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 2, maxDam: 4 },
            ]
        }
    },
    // 6
    {
        0: {
            roomType: 'enemy', enemy: [
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
            ]
        },
        1: {
            roomType: 'enemy', enemy: [
                { name: "Slime", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 3, maxDam: 5 },
            ]
        }
    },
    // 7
    {
        0: {
            roomType: 'enemy', enemy: [
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
                { name: "Goblin", curhp: 10, hp: 10, patk: 13, matk: 10, pdef: 9, mdef: 9, abi: { 'Strike': 0 }, minDam: 1, maxDam: 3 },
            ]
        },
        1: {
            roomType: 'enemy', enemy: [
                { name: "Slime", curhp: 14, hp: 14, patk: 0, matk: 2, pdef: 5, mdef: 100, abi: {}, minDam: 3, maxDam: 5 },
            ]
        }
    },
]
