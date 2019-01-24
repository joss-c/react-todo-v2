const randomMessage = () => {
    const messages = [
        "Great job! 👍",
        "Nice! 👌",
        "You're doing so great!",
        "You're on a roll!",
        "We're doing it! 😁",
        "Weow! 😺",
        "A++ for effort!✨",
        "Cool 😎",
        "Amazing! 😄",
        "Impressive 😎",
        "Incredible! 👏",
        "Nice moves! 🕺",
        "Making progress! 😊",
        "You're unstoppable! 😲",
        "You're on fiyah!!!",
        "Don't stop now!",
        "You're pretty neat.",
        "YES!!! 😊",
        "Pretty dope tbh",
        "You're like a rocket! 🚀",
        "Whoa slow down! I can't keep up!",
        "Jaw to the floor 😲",
        "Proud of you 😉"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
}

export { randomMessage }