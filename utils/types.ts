// COMMONS
export type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;
export type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];
