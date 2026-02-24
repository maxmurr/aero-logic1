import { Riddle } from "./RiddleService"

export const fetchRiddles = async (): Promise<Riddle[]> => {
    const response = await fetch('http://localhost:3000/riddles')
    return response.json()
}

export const fetchRiddle = async (riddleId: string): Promise<Riddle> => {
    const response = await fetch(`http://localhost:3000/riddles/${riddleId}`)
    return response.json()
}
