const randomName = () => {
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
    const doubleConsonants = ['bb', 'dd', 'ff', 'gg', 'll', 'mm', 'nn', 'pp', 'rr', 'ss', 'tt', 'vv', 'zz']
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const endings = ['y', 'a', 's', 'ie', 'er', 'el', 'on', 'en', 'es', 'sy', 'ely', 'ley', 'ina', 'ia', 'ers', 'elyn', 'ica', 'arin', ]
    const randomConsonant = () => consonants[Math.floor(Math.random() * consonants.length)]
    const randomDoubleConsonant = () => doubleConsonants[Math.floor(Math.random() * doubleConsonants.length)]
    const randomVowel = () => vowels[Math.floor(Math.random() * vowels.length)]
    const randomEnding = () => endings[Math.floor(Math.random() * endings.length)]
    let newName =
        randomConsonant() + 
        randomVowel() + 
        ((Math.floor(Math.random() * 10) + 1 > 7) ? randomDoubleConsonant() : randomConsonant()) + 
        randomEnding()
    newName = newName.charAt(0).toUpperCase() + newName.slice(1)
    return newName
}

export { randomName }