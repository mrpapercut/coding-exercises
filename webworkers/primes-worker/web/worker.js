const checkedPrimes = {}

const handleMessageFromSubWorker = message => {
    let data = message.data;
    console.log('handleMessageFromSubworker', message)

    switch (data.command) {
        case 'checkedPrime':
            checkedPrimes[data.input] = data.isPrime;
            console.log(`Checked if ${data.input} is prime: ${data.isPrime} (took ${data.time}ms)`);
            break;
    }
}

self.addEventListener('message', message => {
    let data = message.data;

    switch (data.command) {
        case 'checkPrimeRange':
            const range = data.endRange - data.startRange;
            for (let i = 0; i < range; i++) {
                const subworker = new Worker('subworker.js');

                subworker.addEventListener('message', handleMessageFromSubWorker);

                const msg = {
                    command: 'checkPrime',
                    numberToTest: data.startRange + i
                }

                subworker.postMessage(msg);
            }

            self.close();
            self.postMessage({
                command: 'finished',
                checkedPrimes
            });

            break;
    }
});
