const randomName = () => {
    const beginnings = ['ab', 'th', 'fr', 'chr', 'ch', 'dr', 'cl', 'gr', 'pr', 'st', 'sn', 'sl', 'tr', 'eth', 'an', 'el', 'in', 'ol']
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
    const doubleConsonants = ['bb', 'dd', 'ff', 'gg', 'll', 'mm', 'nn', 'pp', 'rr', 'ss', 'tt', 'vv', 'zz']
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const doubleVowels = ['au', 'ai', 'ea', 'ee', 'eu', 'eo', 'ia', 'io', 'oo', 'ou', 'ui']
    const endings = ['y', 'a', 'e', 's', 'ie', 'ia', 'er', 'el', 'on', 'en', 'ur', 'es', 'as', 'sy', 'sta', 'ely', 'ley', 'ina', 'ers', 'elyn', 'ica', 'arin', ]
    const randomLetter = (type) => type[Math.floor(Math.random() * type.length)]
    let newName =
        ((Math.random() > 0.4) ? randomLetter(consonants) : randomLetter(beginnings)) +
        ((Math.random() > 0.4) ? randomLetter(doubleVowels) : randomLetter(vowels)) + 
        ((Math.random() > 0.8) ? randomLetter(doubleConsonants) : randomLetter(consonants)) + 
        randomLetter(endings)
    newName = newName.charAt(0).toUpperCase() + newName.slice(1)
    return newName
}

export { randomName }