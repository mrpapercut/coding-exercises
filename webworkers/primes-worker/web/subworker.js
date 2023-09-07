const checkPrime = input => {
    let isPrime = true;

    if (input <= 1 || input % 2 === 0 || input % 3 === 0) {
        isPrime = false;
    } else {
        for (let i = 5; i * i <= input; i += 6) {
            if (input % i === 0 || input % (i + 2) === 0) {
                isPrime = false;
            }
        }
    }

    self.postMessage({
        command: 'checkedPrime',
        input,
        isPrime
    })
}

self.addEventListener('message', message => {
    let data = message.data;

    switch (data.command) {
        case 'checkPrime':
            checkPrime(data.numberToTest);

            self.close();

            break;
    }
});
