Rot13Variant := Object clone do (
    process := method(input,
        outchars := list()
        input foreach(_, char,
            if (char >= 97 and char <= 122,
                outchars append(122 - ((char - 84) % 26)),
                outchars append(char)
            )
        )

        outstring := ""
        outchars foreach(_, char,
            outstring := outstring .. (char asCharacter)
        )

        return outstring
    )
)

expected := "qibkyai ty ysv yvgmzenmteyz"
rot13 := Rot13Variant clone
result := rot13 process("welcome to our organization")

if(result == expected,
    "output matches! " .. result ,
    "output does not match :( " .. result
) println
