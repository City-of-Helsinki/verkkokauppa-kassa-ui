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

/**
 * Creates array of string from given string and lowercase string.
 *
 * @param string String where to start extracting value
 * @param separator String which is used as separator for values
 * @param fallback String which is as fallback value
 */
export const stringToArray = (string = '', separator = ',',fallback = ''): String[] => {
    let skipTermsAcceptNamespacesString = string || fallback;
    return skipTermsAcceptNamespacesString.toLowerCase().split(separator);
}
