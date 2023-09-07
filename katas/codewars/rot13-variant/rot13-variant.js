// a = 97
// z = 122

const rot13var = input => {
    const output = []

    for (let i in input) {
        const charcode = input[i].charCodeAt(0)

        if (charcode >= 97 && charcode <= 122) {
            output.push(122 - ((charcode - 84) % 26))
        } else {
            output.push(charcode)
        }
    }

    return String.fromCharCode(...output)
}

const input = 'welcome to our organization'
const expectedOutput = 'qibkyai ty ysv yvgmzenmteyz'

const actualOutput = rot13var(input)
console.log(actualOutput)
console.log(actualOutput === expectedOutput)