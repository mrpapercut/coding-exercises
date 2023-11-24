import Utils from '../Utils'

interface IEncoder {
    encode: (input: string) => string
    decode: (input: string) => string
}

abstract class Encoder extends Utils implements IEncoder {
    abstract encode(input: string): string
    abstract decode(input: string): string
}

export default Encoder
