const randomName = () => {
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const endings = ['y', 'ie', 'er', 'el', 'on', 'en', 'es', 'ely', 'ina', 'ia', 'ers', 'erick', 'elyn']
    const randomConsonant = () => consonants[Math.floor(Math.random() * consonants.length)]
    const randomVowel = () => vowels[Math.floor(Math.random() * vowels.length)]
    const randomEnding = () => endings[Math.floor(Math.random() * endings.length)]
    let newName = randomConsonant() + randomVowel() + randomConsonant() + randomEnding()
    newName = newName.charAt(0).toUpperCase() + newName.slice(1)
    return newName
}

export { randomName }