interface IUtils {
    stringToByteArray(input: string): Uint8Array
    byteArrayToString(input: Uint8Array): string

    remap3to4chars(input: number[]): string[]
}

class Utils implements IUtils {
    public stringToByteArray(input: string): Uint8Array {
        const output = new Uint8Array(input.length)

        for (let i = 0; i < input.length; i++) {
            output[i] = input.charCodeAt(i)
        }

        return output;
    }

    public byteArrayToString(input: Uint8Array): string {
        const output = [];

        for (const i in input) {
            output[i] = String.fromCharCode(input[i])
        }

        return output.join('')
    }

    public remap3to4chars(input: number[]): string[] {
        let resArr = new Array(4)

        resArr[0] = (input[0] & 0xfc) >> 2
        resArr[1] = ((input[0] & 0x03) << 4) + ((input[1] & 0xf0) >> 4)
        resArr[2] = ((input[1] & 0x0f) << 2) + ((input[2] & 0xc0) >> 6)
        resArr[3] = input[2] & 0x3f

        return resArr
    }
}

export default Utils
