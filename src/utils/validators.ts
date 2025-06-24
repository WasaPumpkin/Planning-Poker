// src/utils/validators.ts

// Individual validators (reusable)
export const validateLength = (name: string): string | null => 
  name.length < 5 || name.length > 20 
    ? 'El nombre debe tener entre 5 y 20 caracteres.' 
    : null;

export const hasSpecialChars = (name: string): string | null => 
  /[_,.*#/-]/.test(name) 
    ? 'No se permiten caracteres especiales.' 
    : null;

    const validateNumbersCount = (cleanName: string) => {
      if ((cleanName.match(/\d/g)?.length ?? 0) > 3) {
        return 'No se permiten más de 3 números.';
      }
      return null;
    };

export const isNumbersOnly = (name: string): string | null => 
  /^\d+$/.test(name) 
    ? 'El nombre no puede ser solo números.' 
    : null;

// Main composed validator (early exit)
export const validateGameName = (name: string): string | null => {
  const cleanName = name.trim();
  
  return (
    validateLength(cleanName) ||
    hasSpecialChars(cleanName) ||
    validateNumbersCount(cleanName) ||
    isNumbersOnly(cleanName)
  );
};
  




  // export const validateGameName = (name: string): string | null => {
  //   const cleanName = name.trim();
  //   // Rule 1: Length check (5 to 20 characters)
  //   if (cleanName.length < 5 || cleanName.length > 20) {
  //     return 'El nombre debe tener entre 5 y 20 caracteres.';
  //   }

  //   // Rule 2: No special characters
  //   if (/[_,.*#/-]/.test(cleanName)) {
  //     return 'No se permiten caracteres especiales.';
  //   }

  //   // Rule 3: Maximum 3 numbers
  //   if ((cleanName.match(/\d/g) || []).length > 3) {
  //     return 'No se permiten más de 3 números.';
  //   }

  //   if (/^\d+$/.test(cleanName)) {
  //     return 'El nombre no puede ser solo números.';
  //   }
  //   return null;
  // };

// const maxOnlyNumbers = (name, maxNumber) => {
//     const numberMatches = name.match(/\d/g);
//   if (numberMatches && numberMatches.length > maxNumber) {
//     return { isValid: false, message: 'Cannot contain more than 3 numbers.' };
//   }
//  return { isValid: true, message: '' };
// }