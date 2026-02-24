import { describe, expect, it } from "vitest"
import { getWorkInterval } from "../WorkIntervalService"

function dateAtHour(hour: number): Date {
    const date = new Date()
    date.setHours(hour, 0, 0, 0)
    return date
}

describe('Work interval service', () => {
    it('return interval when airport is busy', () => {
        const result = getWorkInterval(dateAtHour(7))

        expect(result).toBe('Busy times')
    })
    it('return interval when airport has regular traffic', () => {
        const result = getWorkInterval(dateAtHour(13))

        expect(result).toBe('Easy jets')
    })
    it('return interval when airport has returning passengers', () => {
        const result = getWorkInterval(dateAtHour(19))

        expect(result).toBe('Returning pips')
    })
    it('return interval when airport is in sleepy hours', () => {
        const result = getWorkInterval(dateAtHour(2))

        expect(result).toBe('Sleepies')
    })
})
