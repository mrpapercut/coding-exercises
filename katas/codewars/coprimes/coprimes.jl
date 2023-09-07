function mygcd(a, b)
    while b != 0
        remainder = a % b
        a = b
        b = remainder
    end

    return a
end

function coprimes(n)
    allcoprimes = []

    for i in 1:n
        if mygcd(n, i) == 1
            append!(allcoprimes, i)
        end
    end

    return allcoprimes
end

print(coprimes(25))
