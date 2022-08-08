import { useLiveQuery } from "dexie-react-hooks";

export function useNextLiveQuery<T>(
    querier: () => T | Promise<T>,
    deps?: any[]
): T | undefined {
    const hasWindow = typeof window !== "undefined";
    const queryResult = useLiveQuery(
        hasWindow ? querier : () => undefined,
        deps
    );
    return queryResult;
}
