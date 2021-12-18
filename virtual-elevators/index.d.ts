declare module 'vm' {
  // vm's createContext gets shown first on TypeScript recommendations
  // when typing 'createContext', this declaration prevents that,
  // showing React's createContext first
  export const createContext: never
}
