

// Helper: turn nested objects into "a.b.c" keys
type RecursiveKeyOf<T> =
  T extends object
    ? {
        [K in keyof T & (string | number)]:
          | `${K}`
          | `${K}.${RecursiveKeyOf<T[K]>}`;
      }[keyof T & (string | number)]
    : never;

// All translation keys from your `resources.en`
export type ITranslationKey = RecursiveKeyOf<(typeof resources)['en']>;