import { validerServices } from '../src/services/servicesAutorises';

describe('validerServices', () => {
  it('should return true for valid services', () => {
    // Arrange
    const validServices = 'Aide au devoir, Aide au bricolage, Aide au covoiturage';

    // Act
    const result = validerServices(validServices);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false for invalid services', () => {
    // Arrange
    const invalidServices = 'Aide au devoir, Aide au jardinage';

    // Act
    const result = validerServices(invalidServices);

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when at least one service is invalid', () => {
    // Arrange
    const mixedServices = 'Aide au devoir, Aide au bricolage, Aide au jardinage';

    // Act
    const result = validerServices(mixedServices);

    // Assert
    expect(result).toBe(false);
  });

  it('should return true for a single valid service', () => {
    // Arrange
    const singleValidService = 'Aide au devoir';

    // Act
    const result = validerServices(singleValidService);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false for a single invalid service', () => {
    // Arrange
    const singleInvalidService = 'Aide au jardinage';

    // Act
    const result = validerServices(singleInvalidService);

    // Assert
    expect(result).toBe(false);
  });

  it('should handle empty string', () => {
    // Arrange
    const emptyString = '';

    // Act
    const result = validerServices(emptyString);

    // Assert
    expect(result).toBe(false);
  });

  it('should ignore leading and trailing whitespace', () => {
    // Arrange
    const servicesWithWhitespace = ' Aide au devoir , Aide au bricolage ';

    // Act
    const result = validerServices(servicesWithWhitespace);

    // Assert
    expect(result).toBe(true);
  });
});
