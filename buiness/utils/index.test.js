import { JsonFormData } from '.';

// eslint-disable-next-line no-extend-native
Object.prototype._a = 'a';
const a = { a: 1, b: 2 };
JsonFormData(a);
