:- use_module(library(clpfd)).

sudoku(Puzzle) :-
    Puzzle = [S11, S12, S13, S14, S15, S16, S17, S18, S19,
              S21, S22, S23, S24, S25, S26, S27, S28, S29,
              S31, S32, S33, S34, S35, S36, S37, S38, S39,
              S41, S42, S43, S44, S45, S46, S47, S48, S49,
              S51, S52, S53, S54, S55, S56, S57, S58, S59,
              S61, S62, S63, S64, S65, S66, S67, S68, S69,
              S71, S72, S73, S74, S75, S76, S77, S78, S79,
              S81, S82, S83, S84, S85, S86, S87, S88, S89,
              S91, S92, S93, S94, S95, S96, S97, S98, S99],

    Puzzle ins 1..9,

    rows(Puzzle),
    columns(Puzzle),
    subgrid(Puzzle),

    label(Puzzle).

rows([]).
rows([Row1, Row2, Row3, Row4, Row5, Row6, Row7, Row8, Row9 | Rest]) :-
    all_distinct([Row1, Row2, Row3, Row4, Row5, Row6, Row7, Row8, Row9]),
    rows(Rest).

columns(Puzzle) :-
    transpose(Puzzle, Columns),
    rows(Columns).

subgrids([]).
subgrids([S11, S12, S13, S14, S15, S16, S17, S18, S19,
          S21, S22, S23, S24, S25, S26, S27, S28, S29,
          S31, S32, S33, S34, S35, S36, S37, S38, S39 | Rest]) :-
    all_distinct([S11, S12, S13, S21, S22, S23, S31, S32, S33]),
    subgrids([S14, S15, S16, S24, S25, S26, S34, S35, S36,
              S17, S18, S19, S27, S28, S29, S37, S38, S39 | Rest]).

print_solution([]).
print_solution([Row1, Row2, Row3, Row4, Row5, Row6, Row7, Row8, Row9 | Rest]) :-
    format("~w ~w ~w | ~w ~w ~w | ~w ~w ~w\n", [Row1, Row2, Row3, Row4, Row5, Row6, Row7, Row8, Row9]),
    print_solution(Rest).


sudoku([
    0,0,2,0,7,9,0,0,0,
    4,1,3,6,5,0,9,0,7,
    0,0,0,3,0,4,5,1,2,
    8,7,0,0,0,0,0,0,0,
    0,3,0,0,0,0,0,9,0,
    0,0,0,0,0,0,0,4,5,
    2,6,9,5,0,3,0,0,0,
    3,0,7,0,9,8,6,5,1,
    0,0,0,4,6,0,2,0,0
]).