import { describe, expect, it } from "vitest";
import { getTimestamp } from "../TimestampService";

describe('Timestamp service', () => {
    it('return formatted timestamp with date and HHMM', () => {
        const date = new Date(2026, 1, 24, 16, 41, 0, 0)
        const result = getTimestamp(date)

        expect(result).toBe('2026-02-24 1641')
    })

    it('return formatted timestamp pads single-digit month, day, hour and minute', () => {
        const date = new Date(2026, 0, 5, 8, 3, 0, 0)
        const result = getTimestamp(date)

        expect(result).toBe('2026-01-05 0803')
    })
})
