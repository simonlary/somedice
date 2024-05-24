import { useCallback, useState } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
	const [state, setState] = useState<T>(() => {
		const value = localStorage.getItem(key);
		if (value) {
			return JSON.parse(value) as T;
		}
		return defaultValue;
	});

	const updateState = useCallback(
		(value: T) => {
			localStorage.setItem(key, JSON.stringify(value));
			setState(value);
		},
		[key],
	);

	return [state, updateState] as const;
}
