export function convertDbDateToString(dbDate: string) {
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    return new Intl.DateTimeFormat('fr', dateOptions).format(new Date(dbDate));
}