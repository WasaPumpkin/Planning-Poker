// src/utils/validators.ts
/**
 * Validates the name for a new game based on a set of rules.
 * @param name The game name to validate.
 * @returns A string with an error message if invalid, or null if valid.
 */
export const validateGameName = (name: string): string | null => {
  const cleanName = name.trim();

  // Rule 1: Length check (5 to 20 characters)
  if (cleanName.length < 5 || cleanName.length > 20) {
    return 'El nombre debe tener entre 5 y 20 caracteres.';
  }

  // Rule 2: No special characters
  if (/[_,.*#/-]/.test(cleanName)) {
    return 'No se permiten caracteres especiales.';
  }

  // Rule 3: Maximum 3 numbers
  if ((cleanName.match(/\d/g) || []).length > 3) {
    return 'No se permiten más de 3 números.';
  }

  // Rule 4: Cannot be only numbers
  if (/^\d+$/.test(cleanName)) {
    return 'El nombre no puede ser solo números.';
  }

  // If all rules pass, the name is valid
  return null;
};

// const maxOnlyNumbers = (name, maxNumber) => {
//     const numberMatches = name.match(/\d/g);
//   if (numberMatches && numberMatches.length > maxNumber) {
//     return { isValid: false, message: 'Cannot contain more than 3 numbers.' };
//   }
//  return { isValid: true, message: '' };
// }