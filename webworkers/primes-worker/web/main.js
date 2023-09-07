function handleMessageFromWorker(message) {
    let data = message.data;

    switch (data.command) {
        case 'checkedPrime':
            console.log(`Checked if ${data.input} is prime: ${data.isPrime} (took ${data.time}ms)`);
            break;
        case 'finished':
            console.log(data.checkedPrimes);
            break;
    }
}

const primesToTest = [
    9007199254740881,
    9007199254740847,
    9007199254740761,
    9007199254740727,
    9007199254740677,
    9007199254740653,
    9007199254740649,
    9007199254740623,
    9007199254740613,
    9007199254740571,
]

// primesToTest.forEach(p => {
const worker = new Worker('worker.js', {
    type: 'module'
});

worker.addEventListener('message', handleMessageFromWorker);

worker.postMessage({
    command: 'checkPrimeRange',
    startRange: 10,
    endRange: 100
})
// })
