Rot13Variant := method(input,
    output := list()

    input foreach(idx, char,
        if (char >= 97,
            if(char <= 122,
                output append(122 - ((char - 84) % 26)),
                output append(char)
            ),
            output append(char)
        )
    )

    outstring := ""
    output foreach(idx, char,
        outstring := outstring .. (char asCharacter)
    )

    outstring
)

expected := "qibkyai ty ysv yvgmzenmteyz"
result := Rot13Variant("welcome to our organization")

if(result == expected,
    "output matches!",
    "output does not match :("
) println
