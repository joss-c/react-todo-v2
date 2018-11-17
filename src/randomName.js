const randomName = () => {
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'u', 'v', 'y']
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const endings = ['y', 'ie', 'er', 'el', 'on', 'en', 'es']
    const randomConsonant = () => consonants[Math.floor(Math.random() * consonants.length)]
    const randomVowel = () => vowels[Math.floor(Math.random() * vowels.length)]
    const randomEnding = () => endings[Math.floor(Math.random() * endings.length)]
    return randomConsonant() + randomVowel() + randomConsonant() + randomEnding()
}

export { randomName }