
const randomName = () => {
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
    const doubleConsonants = ['bb', 'dd', 'ff', 'gg', 'll', 'mm', 'nn', 'pp', 'rr', 'ss', 'tt', 'vv', 'zz']
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const doubleVowels = ['au', 'ai', 'ee', 'eo', 'ia', 'io', 'oo', 'ou']
    const endings = ['y', 'a', 'e', 's', 'ie', 'ia', 'er', 'el', 'on', 'en', 'ur', 'es', 'as', 'sy', 'ely', 'ley', 'ina', 'ers', 'elyn', 'ica', 'arin', ]
    const randomLetter = (type) => type[Math.floor(Math.random() * type.length)]
    let newName =
        randomLetter(consonants) + 
        ((Math.random() > 0.7) ? randomLetter(doubleVowels) : randomLetter(vowels)) + 
        ((Math.random() > 0.7) ? randomLetter(doubleConsonants) : randomLetter(consonants)) + 
        randomLetter(endings)
    newName = newName.charAt(0).toUpperCase() + newName.slice(1)
    return newName
}

export { randomName }