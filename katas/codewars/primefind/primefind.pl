is_prime(2).
is_prime(3).
is_prime(P) :-
    P > 3,
    P mod 2 =\= 0,
    \+ has_divisor(P, 3).

has_divisor(N, D) :-
    N mod D =:= 0.

has_divisor(N, D) :-
    D * D < N,
    D2 is D + 2,
    has_divisor(N, D2).

find_primes(N, Primes) :-
    findall(X, (between(2, N, X), is_prime(X)), Primes).

:- initialization(main).
main :-
    find_primes(200, Primes),
    write(Primes),
    nl,
    halt.
