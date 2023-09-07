import Encoder from './Encoder'

class Base64 extends Encoder {
    private base64_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    constructor() {
        super()
    }

    public encode(input: string): string {
        const inputArray = this.stringToByteArray(input)
        let inputLength = inputArray.length

        const charArray = new Array(3)
        const base64Array = []

        let charArrayIdx = 0
        let inputIdx = 0
        let outputIdx = 0

        while (inputLength--) {
            charArray[charArrayIdx++] = inputArray[inputIdx++]

            if (charArrayIdx === 3) {
                const remappedChars = this.remap3to4chars(charArray)

                for (let i = 0; i < 4; i++) {
                    base64Array[outputIdx++] = this.base64_chars[remappedChars[i]]
                }

                charArrayIdx = 0
            }
        }

        if (charArrayIdx > 0) {
            for (let i = charArrayIdx; i < 3; i++) {
                charArray[i] = '\0'
            }

            const remappedChars = this.remap3to4chars(charArray)

            for (let i = 0; i <= charArrayIdx; i++) {
                base64Array[outputIdx++] = this.base64_chars[remappedChars[i]]
            }

            while (charArrayIdx++ < 3) {
                base64Array[outputIdx++] = '='
            }

            return base64Array.join('')
        }

        return input
    }

    public decode(input: string): string {
        let inputLength = input.length

        const charArray = new Array(4)

        let charArrayIdx = 0
        let inputIdx = 0

        const result = [];

        while (inputLength--) {
            charArray[charArrayIdx++] = input[inputIdx++]

            if (charArrayIdx === 4) {
                const rawCharBitstrings = charArray.map(char => {
                    const index = this.base64_chars.indexOf(char)

                    if (index !== -1) {
                        return index.toString(2).padStart(6, '0')
                    }
                }).filter(char => char)

                const remappedChars = rawCharBitstrings.join('').match(/(.{8})/g).map(bitstring => {
                    return String.fromCharCode(parseInt(bitstring, 2))
                })

                result.push(remappedChars.join(''))

                charArrayIdx = 0
            }
        }

        return result.join('')
    }
}

export default Base64
