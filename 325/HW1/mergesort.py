"""Reads integers from a file and performs a merge sort on them, writing the result to merge.out"""


class IntsToSort:
    """The count of ints to sort and the array of ints to sort"""

    def __init__(self, int_count, int_array):
        self.int_count = int_count
        self.int_array = int_array


def get_ints_to_sort(filename):
    """Reads sorting instructions from the given file name"""
    file = open(filename, "r")
    int_params = file.readline().split()
    file.close()

    int_count = int_params[0]
    del int_params[0]
    #int_array = list(map(int, int_params))
    int_array = int_params

    return IntsToSort(int_count, int_array)

# TODO: fix this
def merge(left, right):
    """Merges two arrays together from smallest to largest"""
    result = []
    i = 0
    j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    # Add unsorted from left side
    while i < len(left):
        result.append(left[i])
        i += 1
    # Add unsorted from right side
    while j < len(right):
        result.append(right[j])
        j += 1

    return result

# TODO: fix this
def merge_sort(arr):
    """Performs recursive merge sort of given IntsToSort"""
    if len(arr) < 2:
        return arr

    if len(arr) > 1:
        middle = int(len(arr) / 2)
        left = merge_sort(arr[:middle])
        right = merge_sort(arr[middle:])

        return merge(left, right)


def main():
    # TODO: Handle reading and sorting multiple lines from data.txt
    """Main entry for this program"""
    # TODO: read in file location as user input
    filename = "C:/Users/josh/Source/Repos/OsuCs290/325/HW1/data.txt"
    ints_to_sort = get_ints_to_sort(filename)

    count = ints_to_sort.int_count
    arr = ints_to_sort.int_array

    print("Count of ints to sort: " + count)
    i = 0
    print("Array of ints to sort: ")
    while i < len(arr):
        print(arr[i])
        i += 1

    print(merge_sort(arr))


main()
