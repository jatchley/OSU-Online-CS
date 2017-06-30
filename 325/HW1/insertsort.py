"""Reads integers from a file and performs an insertion sort on them, writing the result to insert.out"""
import sys


class IntsToSort:
    """The count of ints to sort and the array of ints to sort"""

    def __init__(self, int_count, int_array):
        self.int_count = int_count
        self.int_array = int_array


def get_ints_to_sort(filename):
    """Reads sorting instructions from the given file name"""
    all_ints_to_sort = []
    # Read all the lines of the file as int arrays to be sorted
    with open(filename, "r") as file:
        for line in file:
            int_params = line.split()
            # First element is how many integers there are to be counted
            int_count = int_params[0]
            # Remove the first element, it's not being sorted
            del int_params[0]
            # Ints to be sorted are the remaining
            int_array = int_params
            # Add to storage array of all ints to be sorted
            all_ints_to_sort.append(IntsToSort(int_count, int_array))

    return all_ints_to_sort


def write_output_to_file(filename, message):
    """Writes given message string to the given file name"""
    file = open(filename, "a")
    file.write(message + "\n")
    file.close()


def insertion_sort(arr):
    """Performs insertion sort of given IntsToSort"""
    if len(arr) < 2:
        return arr

    if len(arr) > 1:
        i = 1
        while i < len(arr):
            curr_val = arr[i]
            j = i - 1
            # Start with curr val and compare to all previous values
            while j >= 0:
                if arr[j] > curr_val:
                    # Move larger value to the right
                    arr[j + 1] = arr[j]
                    j = j - 1
                else:
                    break
            # Once curr_val is larger than arr[j], place it to the right of arr[j]
            arr[j + 1] = curr_val
            i += 1

        return arr


def main():
    """Main entry for this program"""
    input_filename = sys.path[0] + "\\data.txt"
    output_filename = sys.path[0] + "\\insert.out"
    all_ints_to_sort = get_ints_to_sort(input_filename)

    print("Starting insertion sorting of " + str(len(all_ints_to_sort)) +
          " lines from data.txt")
    i = 0

    while i < len(all_ints_to_sort):
        count = all_ints_to_sort[i].int_count
        # Convert string array to int array
        arr = [int(item) for item in all_ints_to_sort[i].int_array]

        print("Sorting line " + str(i + 1))
        print("Count of ints to sort: " + count)
        print("Array of ints to sort: ")
        print(arr)
        print("Sorted array of ints: ")
        arr = insertion_sort(arr)
        arr_to_print = ""
        for elem in arr:
            arr_to_print += str(elem) + " "

        print(arr_to_print)
        print("Writing sorted array to insert.out")
        write_output_to_file(output_filename, arr_to_print)
        i += 1


main()
