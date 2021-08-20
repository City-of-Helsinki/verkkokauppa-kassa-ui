import { renderHook } from '@testing-library/react-hooks'
import { useArrayGetParams } from "../../hooks/useArrayGetParams";


describe('useArrayGetParams mocked tests', () => {
    it('Should return the meta get params as array -> One result', () => {
        const location = new URL('https://www.example.com');
        location.search = "?meta[1][key]=licensePlateNumber&meta[1][value]=TEST-123&meta[1][label]=Rekisterinumero";
        // @ts-ignore
        const result = renderHook(() => useArrayGetParams("meta", location));

        expect(result.result.all[0]).toStrictEqual([
            {
                "key": "licensePlateNumber",
                "label": "Rekisterinumero",
                "value": "TEST-123"
            }
        ]);
    });

    it('Should return the meta get params as array of objects -> Two result', () => {
        const location = new URL('https://www.example.com');
        location.search = "?meta[1][key]=licensePlateNumber&meta[1][value]=TEST-123&meta[1][label]=Rekisterinumero";
        location.search += "&meta[2][key]=metaKey2&meta[2][value]=MetaValue2&meta[2][label]=metaLabel2";
        // @ts-ignore
        const result = renderHook(() => useArrayGetParams("meta", location));

        expect(result.result.all[0]).toStrictEqual([
            {
                "key": "licensePlateNumber",
                "label": "Rekisterinumero",
                "value": "TEST-123"
            },
            {
                "key": "metaKey2",
                "label": "metaLabel2",
                "value": "MetaValue2"
            }
        ]);
    });

    it('Should return empty array if paramName does not match given', () => {
        const location = new URL('https://www.example.com');
        location.search = "?meta[1][key]=licensePlateNumber&meta[1][value]=TEST-123&meta[1][label]=Rekisterinumero";
        location.search += "&meta[2][key]=metaKey2&meta[2][value]=MetaValue2&meta[2][label]=metaLabel2";
        // @ts-ignore
        const result = renderHook(() => useArrayGetParams("notFound", location));

        expect(result.result.all[0]).toStrictEqual([]);
    });

    it('Should return empty array if "array" index is empty', () => {
        const location = new URL('https://www.example.com');
        location.search = "?meta[][key]=licensePlateNumber&meta[][value]=TEST-23&meta[][label]=Rekisterinumero";
        location.search += "&meta[][key]=metaKey&meta[][value]=MetaValue&meta[][label]=metaLabel2";
        // @ts-ignore
        const result = renderHook(() => useArrayGetParams("meta", location));

        expect(result.result.all[0]).toStrictEqual([]);
    });
});
