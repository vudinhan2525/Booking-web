export function isValidEmail(email: string): boolean {
  // Regular expression for validating an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email string against the regular expression
  return emailRegex.test(email);
}
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // Regular expression for validating a phone number
  const phoneRegex =
    /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

  // Test the phone number string against the regular expression
  return phoneRegex.test(phoneNumber);
}
