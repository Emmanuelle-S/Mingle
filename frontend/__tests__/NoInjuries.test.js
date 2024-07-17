import { noInjuries } from '../src/services/noInjuries';

describe('noInjuries', () => {
    test('should replace insult with stars', () => {
        const insult = 'connard';
        const result = noInjuries(insult);
        expect(result).toBe('*******');
    });

    test('should replace mixed case insult with stars', () => {
        const insult = 'CoNnaRd';
        const result = noInjuries(insult);
        expect(result).toBe('*******');
    });

    test('should not replace non-insult', () => {
        const nonInsult = 'bonjour';
        const result = noInjuries(nonInsult);
        expect(result).toBe('bonjour');
    });

    test('should replace multiple word insult with stars', () => {
        const insult = 'fils de pute';
        const result = noInjuries(insult);
        expect(result).toBe('************');
    });

    test('should not replace a part of a word that is an insult', () => {
        const nonInsult = 'connaissance';
        const result = noInjuries(nonInsult);
        expect(result).toBe('connaissance');
    });
});
