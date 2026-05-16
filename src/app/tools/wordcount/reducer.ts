import { computeMatches, makeRegex } from "./util";

export interface State {
    text: string;
    pattern: string;
    useRegex: boolean;
    matches: RegExpMatchArray[];
    currMatchIdx: number;
}

export type Action =
    | { type: "SET_TEXT"; text: string }
    | { type: "SET_PATTERN"; pattern: string }
    | { type: "TOGGLE_REGEX" }
    | { type: "NEXT_MATCH" }
    | { type: "PREV_MATCH" }
    | { type: "REPLACE_ALL"; replace: string }
    | { type: "REPLACE_ONE"; replace: string };

export const initialState: State = {
    text: "",
    pattern: "",
    useRegex: true,
    matches: [],
    currMatchIdx: 0,
};

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_TEXT": {
            const text = action.text;
            const matches = computeMatches(text, state.pattern, state.useRegex);
            const currMatchIdx = Math.min(state.currMatchIdx, Math.max(0, matches.length - 1));
            return { ...state, text, matches, currMatchIdx };
        }

        case "SET_PATTERN": {
            const pattern = action.pattern;
            const matches = computeMatches(state.text, pattern, state.useRegex);
            return { ...state, pattern, matches, currMatchIdx: 0 };
        }

        case "TOGGLE_REGEX": {
            const useRegex = !state.useRegex;
            const matches = computeMatches(state.text, state.pattern, useRegex);
            return { ...state, useRegex, matches, currMatchIdx: 0 };
        }

        case "NEXT_MATCH": {
            if (state.matches.length == 0) return state;
            return { ...state, currMatchIdx: (state.currMatchIdx + 1) % state.matches.length };
        }

        case "PREV_MATCH": {
            if (state.matches.length == 0) return state;
            return { ...state, currMatchIdx: (state.currMatchIdx - 1 + state.matches.length) % state.matches.length };
        }

        case "REPLACE_ALL": {
            const { pattern, useRegex } = state;
            const regex = makeRegex(pattern, useRegex);
            const text = state.text.replace(regex, action.replace);
            const matches = computeMatches(text, pattern, useRegex);
            return { ...state, text, matches, currMatchIdx: 0 };
        }

        case "REPLACE_ONE": {
            const match = state.matches[state.currMatchIdx];
            if (match?.index == null) return state;

            const { text, pattern, useRegex } = state;
            const start = match.index;
            const end = start + match[0].length;

            const newText = `${text.slice(0, start)}${action.replace}${text.slice(end)}`;
            const newMatches = computeMatches(newText, pattern, useRegex);

            // find the next match not contained by current match
            const nextIdx = newMatches.findIndex(m => m.index! >= start + action.replace.length);

            return { ...state, text: newText, matches: newMatches, currMatchIdx: nextIdx == -1 ? 0 : nextIdx };
        }
    }
}
