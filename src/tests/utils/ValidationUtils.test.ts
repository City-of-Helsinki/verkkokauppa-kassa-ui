import { validatePartyId } from "../../utils/ValidationUtils";

describe('ValidationUtils unit tests', () => {
    it('Should return true if valid party id', () => {
        expect(validatePartyId('003715728600')).toStrictEqual(true)
    });

    it('Should return false if not valid party id', () => {
        expect(validatePartyId('003715728602')).toStrictEqual(false)
    });
});
