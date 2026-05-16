export function escape(s: string) {
    return s.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]!));
}

export function getCursorOffset(div: HTMLDivElement): number {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount == 0) return 0;
    const range = sel.getRangeAt(0);
    const pre = range.cloneRange();
    pre.selectNodeContents(div);
    pre.setEnd(range.startContainer, range.startOffset);
    return pre.toString().length;
}

export function setCursorOffset(div: HTMLDivElement, offset: number) {
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    let remaining = offset;

    function walk(node: Node): boolean {
        if (node.nodeType == Node.TEXT_NODE) {
            const len = node.textContent!.length;
            if (remaining <= len) {
                range.setStart(node, remaining);
                range.collapse(true);
                return true;
            }
            remaining -= len;
        } else {
            for (const child of node.childNodes) {
                if (walk(child)) return true;
            }
        }
        return false;
    }

    if (!walk(div)) {
        range.setStart(div, 0);
        range.collapse(true);
    }

    sel.removeAllRanges();
    sel.addRange(range);
}

export function makeRegex(pattern: string, useRegex: boolean) {
    return useRegex
        ? new RegExp(pattern, "g")
        : new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
}

export function computeMatches(text: string, pattern: string, useRegex: boolean) {
    if (pattern == "") return [];
    try {
        const regex = makeRegex(pattern, useRegex);
        return [...text.matchAll(regex)];
    } catch {
        return [];
    }
}

export function getWordCount(text: string) {
    return text.trim() == "" ? 0 : text.trim().split(/\s+/).length;
}