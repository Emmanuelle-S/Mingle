// src/__test__/stringUtils.test.js

// src/components/ChatSendInput/__test__/ChatSendInput.test.js
import { filterProfanity } from '../ChatSendInput.jsx'; // Assurez-vous que le chemin est correct

describe('filterProfanity', () => {
  it('should replace profanity with stars', () => {
    const message = 'This is an putain message';
    const result = filterProfanity(message);
    expect(result).toBe('This is an ****** message');
  });

  it('should not alter message without profanity', () => {
    const message = 'This is a clean message';
    const result = filterProfanity(message);
    expect(result).toBe('This is a clean message');
  });

  it('should handle multiple profanities', () => {
    const message = 'pute and bite are bad';
    const result = filterProfanity(message);
    expect(result).toBe('**** and **** are bad');
  });
});
