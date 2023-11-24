import Base64 from './Encoders/Base64'

const base64 = new Base64()

const shortString = 'Hello, world!'
const expectedEncodedShort = `SGVsbG8sIHdvcmxkIQ==`
const actualEncodedShort = base64.encode(shortString)
const actualDecodedShort = base64.decode(expectedEncodedShort)

if (expectedEncodedShort !== actualEncodedShort) {
    console.error(`Base64.encode() returned '${actualEncodedShort}',\nexpected '${expectedEncodedShort}'`)
} else {
    console.log(`Base64.encode() returned '${actualEncodedShort}' as expected`)
}

if (shortString !== actualDecodedShort) {
    console.error(`Base64.decode() returned '${actualDecodedShort}',\nexpected '${shortString}'`)
} else {
    console.log(`Base64.encode() returned '${actualDecodedShort}' as expected`)
}

const longString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aliquam vel suscipit urna, ac auctor purus. Ut a nisl aliquam, pulvinar
tortor quis, vehicula elit. Vestibulum ante ipsum primis in faucibus
orci luctus et ultrices posuere cubilia Curae; Orci varius natoque
penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Phasellus sollicitudin tempor vestibulum. Pellentesque rutrum accumsan
euismod. Suspendisse eros nunc, venenatis eu mi ut, convallis malesuada metus.`
const expectedEncodedLong = `TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4KQWxpcXVhbSB2ZWwgc3VzY2lwaXQgdXJuYSwgYWMgYXVjdG9yIHB1cnVzLiBVdCBhIG5pc2wgYWxpcXVhbSwgcHVsdmluYXIKdG9ydG9yIHF1aXMsIHZlaGljdWxhIGVsaXQuIFZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMKb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBPcmNpIHZhcml1cyBuYXRvcXVlCnBlbmF0aWJ1cyBldCBtYWduaXMgZGlzIHBhcnR1cmllbnQgbW9udGVzLCBuYXNjZXR1ciByaWRpY3VsdXMgbXVzLgpQaGFzZWxsdXMgc29sbGljaXR1ZGluIHRlbXBvciB2ZXN0aWJ1bHVtLiBQZWxsZW50ZXNxdWUgcnV0cnVtIGFjY3Vtc2FuCmV1aXNtb2QuIFN1c3BlbmRpc3NlIGVyb3MgbnVuYywgdmVuZW5hdGlzIGV1IG1pIHV0LCBjb252YWxsaXMgbWFsZXN1YWRhIG1ldHVzLg==`
const actualEncodedLong = base64.encode(longString)
const actualDecodedLong = base64.decode(expectedEncodedLong)

if (expectedEncodedLong !== actualEncodedLong) {
    console.error(`Base64.encode() returned '${actualEncodedLong}',\nexpected '${expectedEncodedLong}'`)
} else {
    console.log(`Base64.encode() returned '${actualEncodedLong}' as expected`)
}

if (longString !== actualDecodedLong) {
    console.error(`Base64.decode() returned '${actualDecodedLong}',\nexpected '${longString}'`)
} else {
    console.log(`Base64.decode() returned '${actualDecodedLong}' as expected`)
}
