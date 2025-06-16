const examination = [
    [1, 2],
    [2, 3],
    [3, 1],
    [4, 2],
];

export async function getAnswerFor(riddleId) {
    await Promise.all([
        fetch('https://xeno-canto.org/api/2/recordings?query=cnt:austria'),
        fetch('https://xeno-canto.org/api/2/recordings?query=troglodytes+troglod'),
        fetch('https://xeno-canto.org/api/2/recordings?query=bearded+bellbird+q:A'),
    ]);
    const response = await fetch(`http://localhost:3000/riddles/${riddleId}`);
    const json = await response.json();
    const target = examination.find(([id]) => riddleId === `${id}`);
    const answer = json.answers.find(({ id }) => id === `${target?.[1] ?? ''}`);

    if (!answer) {
        throw new Error('Answer is unavailable');
    }

    return answer;
}
