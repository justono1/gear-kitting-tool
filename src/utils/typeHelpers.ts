//Make interface property not required
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

//Remove property that is not required
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

//Remove required or not required property
export type RemoveProp<T, K extends keyof T> = Omit<PartialBy<T, K>, K>

// Remove option from union
export type ExcludeFromUnion<T, U extends string> = T extends U ? never : T
