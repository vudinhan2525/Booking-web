import { customAlphabet } from 'nanoid';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 6); // Generates IDs like "1AXH6Y"

export function generateUniqueId(): string {
  return nanoid();
}
