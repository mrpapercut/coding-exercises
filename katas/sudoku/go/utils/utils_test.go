package utils

import "testing"

func TestFindNonOccuringNumbersInRange(t *testing.T) {
	values := []int{1, 2, 3, 4, 5, 0, 7, 8, 9}

	expected_number := 6
	actual_number := FindNonOccuringNumbersInSlice(values)

	if actual_number[0] != expected_number {
		t.Errorf("FindNonOccuringNumbersInRange() returned %d, expected %d", actual_number[0], expected_number)
	}
}

func TestFindNumbersThatOccurNTimes(t *testing.T) {
	arrayOfArrays := [][]int{
		{1, 3, 5, 7, 9},
		{2, 4, 6, 8},
		{2, 3, 5, 6, 8, 9},
	}

	expected := []int{1, 4, 7}
	result := FindNumbersThatOccurNTimes(1, arrayOfArrays)

	if len(result) != 3 || result[0] != expected[0] || result[1] != expected[1] || result[2] != expected[2] {
		t.Errorf("FindUniqueNumbers() returned %v, expected %v", result, expected)
	}
}

func TestFindUniqueNumbers(t *testing.T) {
	arrayOfArrays := [][]int{
		{1, 3, 5, 7, 9},
		{2, 4, 6, 8},
		{2, 3, 5, 6, 8, 9},
	}

	expected := [][2]int{}
	expected = append(expected, [2]int{1, 0})
	expected = append(expected, [2]int{4, 1})
	expected = append(expected, [2]int{7, 0})
	result := FindUniqueNumbers(arrayOfArrays)

	if len(result) != 3 || result[0] != expected[0] || result[1] != expected[1] || result[2] != expected[2] {
		t.Errorf("FindUniqueNumbers() returned %v, expected %v", result, expected)
	}
}
