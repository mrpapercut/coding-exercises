package utils

import (
	"sort"
)

func FindNonOccuringNumbersInSlice(values []int) []int {
	nonOccuringNumbers := []int{}

	for i := 1; i <= 9; i++ {
		found := false
		for _, value := range values {
			if value == i {
				found = true
			}
		}

		if !found {
			nonOccuringNumbers = append(nonOccuringNumbers, i)
		}
	}

	sort.Ints(nonOccuringNumbers)

	return nonOccuringNumbers
}

func FindNumbersThatOccurNTimes(n int, arrayOfArrays [][]int) []int {
	numberCount := make(map[int]int)

	for _, arr := range arrayOfArrays {
		for _, num := range arr {
			numberCount[num]++
		}
	}

	var uniqueNumbers []int
	for num, count := range numberCount {
		if count == n {
			uniqueNumbers = append(uniqueNumbers, num)
		}
	}

	sort.Ints(uniqueNumbers)

	return uniqueNumbers
}

type UniqueNumbers = []struct {
	number     int
	count      int
	arrayIndex int
}

func FindUniqueNumbers(arrayOfArrays [][]int) [][2]int {
	oldNumberCount := make(map[int]int)
	uniqueNumberArrayIndex := make(map[int]int)

	numberCount := make(UniqueNumbers, 10) // Uses digits 1 - 9, so not zero-indexed

	for arrayIndex, array := range arrayOfArrays {
		for _, number := range array {
			numberCount[number].number = number
			numberCount[number].count++
			numberCount[number].arrayIndex = arrayIndex

			oldNumberCount[number]++
			uniqueNumberArrayIndex[number] = arrayIndex
		}
	}

	uniqueNumberSorted := make([][2]int, 0)
	for i := range numberCount {
		if numberCount[i].count == 1 {
			uniqueNumberSorted = append(uniqueNumberSorted, [2]int{numberCount[i].number, numberCount[i].arrayIndex})
		}
	}

	uniqueNumbers := make(map[int]int)
	for number, count := range oldNumberCount {
		if count == 1 {
			uniqueNumbers[number] = uniqueNumberArrayIndex[number]
		}
	}

	return uniqueNumberSorted
}
