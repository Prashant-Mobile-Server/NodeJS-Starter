import { validateInput, shortenPublicHoliday } from '../helpers';
import { SUPPORTED_COUNTRIES } from '../config';

describe('validateInput function', () => {
    test('should return true if country and year are valid', () => {
        expect(validateInput({ year: new Date().getFullYear(), country: SUPPORTED_COUNTRIES[0] })).toBe(true);
    });

    test('should throw error if unsupported country is provided', () => {
        expect(() => {
            validateInput({ country: 'XYZ' });
        }).toThrow('Country provided is not supported, received: XYZ');
    });

    test('should throw error if year provided is not current', () => {
        expect(() => {
            validateInput({ year: new Date().getFullYear() - 1 });
        }).toThrow(`Year provided not the current, received: ${new Date().getFullYear() - 1}`);
    });

});

describe('shortenPublicHoliday function', () => {
    test('should return a short version of public holiday object', () => {
        const holiday = {
            name: 'Festival',
            localName: 'localFest',
            date: '2024-12-25',
            countryCode: '91',
            fixed: true,
            global: true,
            counties: null,
            launchYear: null,
            types: ['no']
        };
        const expectedShortHoliday = {
            name: 'Festival',
            localName: 'localFest',
            date: '2024-12-25',
        };
        expect(shortenPublicHoliday(holiday)).toEqual(expectedShortHoliday);
    });
});
