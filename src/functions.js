const convertDate = (date, convertTo) => {
    const ISODate = new Date(date).toISOString().substring(0, 10)
    if (convertTo === "ISO") {
        return ISODate
    } else if (convertTo === "timestamp") {
        return new Date(date).getTime()
    } else if (convertTo === "local") {
        const year = ISODate.substring(0, 4)
        const month = ISODate.substring(5, 7)
        const day = ISODate.substring(8, 10)
        const date = new Date()
        date.setUTCFullYear(year)
        date.setUTCMonth(month - 1)
        date.setUTCDate(day)
        return date.toLocaleDateString("en-GB")
    }
}

const articulateDateDue = (dateDue) => {
    let today = convertDate(Date.now(), "ISO")
    today = convertDate(today, "timestamp")
    if (dateDue - today < 0) {
        return "Overdue"
    }
    if (dateDue - today === 0) {
        return "Today"
    } else if (dateDue - today === 86400000) {
        return "Tomorrow"
    } else {
        return convertDate(dateDue, "local")
    }
}

const arrayMove = (arr, fromIndex, toIndex) => {
    const element = arr[fromIndex]
    if (fromIndex === 0) {
        toIndex = arr.length
    }
    arr.splice(fromIndex, 1)
    arr.splice(toIndex, 0, element)
    return arr
}

export { convertDate, articulateDateDue, arrayMove }