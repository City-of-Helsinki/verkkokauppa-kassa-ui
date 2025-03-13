import { extract } from "../../utils/StringUtils";

/**
 * Converts eq. meta[1][key]=licensePlateNumber to [{key: "licensePlateNumber"}]
 *
 * @param params Contains list of parameters
 * @param paramName Used to filter url search parameters with startWith function
 * @param start String where to start extracting value
 * @param end String where to end extracting value
 * @param escape String to escape RegExp strings, example '[' match should be '\\[' inside RegExp declaration
 */
export const convertGetParamsToArrayOfObjects = (params: URLSearchParams, paramName = '', start: string = '[', end: string = ']', escape: string = '\\') => {
    let arrayOfObjects: Array<any> = [];
    params.forEach((value, key) => {
        // Allow filtering for get parameters with parameter name, example convert only meta get parameters.
        if (key.startsWith(paramName)) {
            const stringExtractor = extract([ start, end, escape ]);
            const extractedValues = stringExtractor(key);
            let index = parseInt(extractedValues[0] || NaN);
            let fieldName = extractedValues[1] || '';
            // Before adding data to return array, check that these values has some values.
            if (!isNaN(index) && fieldName !== '') {
                arrayOfObjects[index] = { ...arrayOfObjects[index], ...{ [fieldName]: value } };
            }
        }
    })
    return arrayOfObjects.filter(function (element) {
        return element !== undefined;
    });
}

export const useArrayGetParams = (paramName = '', location = window.location, start: string = '[', end: string = ']', escape: string = '\\') => {
    const params = new URLSearchParams(location.search);
    return convertGetParamsToArrayOfObjects(params, paramName, start, end, escape) || [];
};
