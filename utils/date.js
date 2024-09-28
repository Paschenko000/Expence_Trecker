export function getFormattedDate(date) {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`
}

export function getDateMinusDays(date, days) {
    const newDate = new Date(date);
    return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - days);
}
