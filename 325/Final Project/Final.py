#**********************************************************************
# CS 325 - Project Group 9
#     Joshua Atchley
#     Aalon Cole
#     Patrick Kilgore
#
# Project - Solving the Travelling Salesman Problem with Approximation
#
# Algorithm - Simulated Annealing as described in:
# Hansen, Per Brinch, "Simulated Annealing" (1992). Electrical
# Engineering and Computer Science Technical Reports. Paper 170.
# http://surface.syr.edu/eecs_techreports/170
#**********************************************************************

import math
import sys
import time
import random
from timeit import default_timer as timer

class City:
    def __init__(self, number, xc, yc):
        self.cNum = number
        self.x = xc
        self.y = yc

    def distanceTo(self, endpoint):
        xdiff = endpoint.x - self.x
        ydiff = endpoint.y - self.y
        dist = math.sqrt(xdiff*xdiff + ydiff*ydiff)
        return int(round(dist))

def tourLength(tourArray):
    n = len(tourArray)
    dSum = tourArray[n-1].distanceTo(tourArray[0])
    for i in range(n-1):
        dSum += tourArray[i].distanceTo(tourArray[i+1])
    return dSum

def initTour(inFile):
    cities = []
    for line in inFile:
        if line != "":
            cParams = [int(n) for n in line.split()]
            cities.append(City(cParams[0], cParams[1], cParams[2]))
    return cities

def anneal(tour, Tmax, alpha, steps, attempts, changes, startTime):
    temp = Tmax
    for k in range(steps):
    # changed to loop up to
    #while temp > 1e-6:
        print("Temperature = {}, Tour Length = {}, Time Elapsed = {}".format(temp, tourLength(tour), timer() - startTime))
        tour = tSearch(tour, temp, attempts, changes)
        temp *= alpha
    return tour

def tSearch(tour, temp, attempts, changes):
    nAtt = 0
    nChg = 0

    while nAtt < attempts and nChg < changes:
        # tSelect will return the tuple ci, cj, dE
        selectionTuple = tSelect(tour)
        if accept(selectionTuple[2], temp):
            tour = tChange(tour, selectionTuple[0], selectionTuple[1])
            nChg += 1
        nAtt += 1
        if nAtt >= attempts:
            print("Max number of attempts reached, cooling...")
        if nChg >= changes:
            print("Max number of tour changes reached, cooling...")

    return tour

def tSelect(tour):
    # pick random cities in tour
    ci = random.randint(0, len(tour) - 1)
    cj = random.randint(0, len(tour) - 1)

    # find the cities directly after ci and cj
    cinx = (ci + 1) % len(tour)
    cjnx = (cj + 1) % len(tour)

    # calculate energy change , i.e. tour length change, for reversing the sequence
    # between ci and cj
    if ci != cj:
        dE = (tour[ci].distanceTo(tour[cj]) + tour[cinx].distanceTo(tour[cjnx])
              - tour[ci].distanceTo(tour[cinx]) - tour[cj].distanceTo(tour[cjnx]))
    else:
        dE = 0

    return ci, cj, float(dE)

def accept(dE, temp):
    if dE > 0:
        acceptance = (math.exp(-dE / temp) > random.random())
    else:
        acceptance = True

    return acceptance

def tChange(tour, ci, cj):
    n = len(tour)
    # snippet does not wrap around end of list
    if ci < cj:
        tSnip = tour[(ci+1):(cj+1)]
        rSnip = list(reversed(tSnip))
        tour[(ci + 1):(cj + 1)] = rSnip[:]
    else:
        # the snippet wraps around the end of the list, so ninjutsu is needed...
        tSnip = tour[(ci+1):] + tour[:(cj+1)]
        rSnip = list(reversed(tSnip))
        divider = len(tour[(ci+1):])
        tour[(ci+1):] = rSnip[:divider]
        tour[:(cj + 1)] = rSnip[divider:]

    return tour

def main():
    random.seed(time.clock())

    # set up I/O files
    #inputFileName = str(sys.argv[1])
    inputFileName = sys.path[0] + "/tsp_example_3.txt"
    inputFile = open(inputFileName, 'r')
    outputFileName = inputFileName + ".tour"
    outputFile = open(outputFileName, 'w')

    # the cityTour list will hold the current tour sequence
    cityTour = initTour(inputFile)
    random.shuffle(cityTour)

    # initialize simulation parameters per recommendations by Hansen
    n = len(cityTour)
    Tmax = round(math.sqrt(n))
    alpha = 0.95
    steps = 20 * int(round(math.log1p(n + 1)))
    attempts = 100 * n
    changes = 10 * n

    # call the annealing function with the defined parameters
    startTime = timer()
    cityTour = anneal(cityTour, Tmax, alpha, steps, attempts, changes, startTime)
    end = timer()
    print("Algorithm ran in {} seconds".format(end - startTime))

    # write output file
    outputFile.write(str(tourLength(cityTour)) + '\n')
    for k in range(n):
        outstring = str(cityTour[k].cNum) + '\n'
        outputFile.write(outstring)

    inputFile.close()
    outputFile.close()

if __name__ == '__main__':
  main()

