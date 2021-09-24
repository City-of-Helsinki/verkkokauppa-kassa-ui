const dateParser = (date: any, ianatz: string) => {

    // Example date string 20210901-05184
    const year = date.substring(0, 4);
    // Minus one because js month starts at 0 not 01.
    const month = date.substring(4, 6) - 1;
    const day = date.substring(6, 8);
    const hours = date.substring(9, 11);
    const minutes = date.substring(11, 13);
    const seconds = date.substring(13, 15);

    const dateObj = new Date(Date.UTC(year, month, day, hours, minutes, seconds));

    return dateObj.toLocaleDateString('de-DE', {
        timeZone: ianatz,
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }) + ' ' + dateObj.toLocaleTimeString('de-DE', {
        timeZone: ianatz,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
};

export {dateParser};
