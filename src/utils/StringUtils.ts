/**
 * Creates regex function from given parameters and returns it
 *
 * @param start String where to start extracting value
 * @param end String where to end extracting value
 * @param escapeString Escape RegExp strings, example '[' match should be '\\[' inside RegExp declaration
 */
export const extract = ([ start = '', end = '', escapeString = '' ]): Function => {
    const matcher = new RegExp(`${escapeString}${start}(.*?)${escapeString}${end}`, 'gm');
    const normalise = (str: string | any[]) => str.slice(start.length, end.length * -1);
    return function (str: { match: (arg0: RegExp) => (string | any[])[]; }) {
        return str.match(matcher).map(normalise);
    }
}