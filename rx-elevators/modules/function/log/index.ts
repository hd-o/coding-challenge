export const useLog = (): typeof console.log => console.log.bind(console)
