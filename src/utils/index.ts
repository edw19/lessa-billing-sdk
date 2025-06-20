export function timeUntilExpiration(isoDate: string) {
    const now = new Date()
    const end = new Date(isoDate)

    let years = end.getFullYear() - now.getFullYear()
    let months = end.getMonth() - now.getMonth()
    let days = end.getDate() - now.getDate()

    if (days < 0) {
        months -= 1
        const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate()
        days += previousMonth
    }

    if (months < 0) {
        years -= 1
        months += 12
    }

    return `Expira en ${years} ${years === 1 ? 'año' : 'años'} ${months} ${months === 1 ? 'mes' : 'meses'} and ${days} ${days === 1 ? 'día' : 'días'}`
}

