import { describe, expect, it, vi } from "vitest";
import { getRandomRiddle, Riddle } from "../RiddleService";

describe('Riddle service', () => {
    describe('retrieve random riddle', () => {
        it('retrieve random riddle when collection is available', () => {
            const riddles = [{
                id: '1',
                contents: 'What has hands but cannot clap?',
                answers: [{ id: 'ans_1', text: 'A clock' }]
            }] satisfies Riddle[]

            const result = getRandomRiddle(riddles)

            expect(result).toEqual({
                id: '1',
                contents: 'What has hands but cannot clap?',
                answers: [
                    {
                        id: 'ans_1',
                        text: 'A clock'
                    }
                ]
            })

            vi.restoreAllMocks()
        })
    })
})
