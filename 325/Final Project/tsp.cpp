#include <iostream>
#include <cmath>
#include <fstream>
#include <string>
#include <vector>
#include <algorithm>
#include <ccomplex>
#include <cstdio>
#include <ctime>
#include <tuple>
#include <cstdlib>
#include <cfenv>
#include <sstream>

#define SSTR(x) static_cast<std::ostringstream &>(           \
					(std::ostringstream() << std::dec << x)) \
					.str()

using namespace std;

class City
{

public:
	int number;
	int x;
	int y;

	//Constructs a city
	City();
	City(int number, int x, int y);
	int getY();
	int getX();
	int distanceTo(City city);
};

City::City()
{
	this->number = 0;
	this->x = 0;
	this->y = 0;
}

City::City(int number, int x, int y)
{
	this->number = number;
	this->x = x;
	this->y = y;
}

//Gets y
int City::getY()
{
	return this->y;
}

//Gets x
int City::getX()
{
	return this->x;
}

//Gets distance to given city
int City::distanceTo(City city)
{
	int xDistance = pow(getX() - city.getX(), 2);
	int yDistance = pow(getY() - city.getY(), 2);
	int d = nearbyint(sqrt(xDistance + yDistance));
	return d;
}

int tourLength(vector<City> &cities);
void initTour(ifstream &inputFile, vector<City> &cities);
void printVector(vector<City> &cities);
void anneal(vector<City> &cities, double Tmax, double alpha, int steps, int attempts, int changes, int startTime);
void tSearch(vector<City> &cities, double temp, int attempts, int changes);
tuple<int, int, double> tSelect(vector<City> &cities);
bool accept(double dE, double temp);
void tChange(vector<City> &cities, int ci, int cj);

int main(int argc, char *argv[])
{
	unsigned seed;

	seed = time(0);
	srand(seed);

	//setup I/O files
	string filename;
	ifstream inputFile;
	ofstream outputFile;

	inputFile.open(argv[1]);
	filename = argv[1];

	vector<City> cities;

	initTour(inputFile, cities);
	printVector(cities);
	random_shuffle(cities.begin(), cities.end());

	//initialize simulation parameters per recommendations by Hansen
	int n = cities.size();
	double Tmax = nearbyint(sqrt(n));
	double alpha = 0.95;
	int steps = 20 * nearbyint(log1p(n - 1));
	int attempts = 100 * n;
	int changes = 10 * n;

	//call the annealing function with the defined parameters
	int startTime = clock();

	anneal(cities, Tmax, alpha, steps, attempts, changes, startTime);

	int duration = (clock() - startTime) / (double)CLOCKS_PER_SEC;
	cout << "Algorithm ran in " << duration << "seconds." << endl;

	//write outputfile
	string outfilename = filename + ".tour";
	outputFile.open(outfilename.c_str());

	outputFile << tourLength(cities) << endl;
	for (int i = 0; i < cities.size(); i++)
	{
		string outString = SSTR(cities[i].number);
		outputFile << outString << "\n";
	}

	inputFile.close();
	outputFile.close();

	return 0;
}

int tourLength(vector<City> &cities)
{
	int n = cities.size();
	int dSum = cities[n - 1].distanceTo(cities[0]); //fix this
	for (int i = 0; i < (n - 1); i++)
	{
		dSum += cities[i].distanceTo(cities[i + 1]);
	}
	return dSum;
}

void initTour(ifstream &inputFile, vector<City> &cities)
{
	City temp;
	while (inputFile >> temp.number >> temp.x >> temp.y)
	{
		cities.push_back(temp);
	}
}

void printVector(vector<City> &cities)
{
	for (int i = 0; i < cities.size(); i++)
	{
		cout << cities[i].number << ' ' << cities[i].x << ' ' << cities[i].y << endl;
	}
}

void anneal(vector<City> &cities, double Tmax, double alpha, int steps, int attempts, int changes, int startTime)
{
	double temp = Tmax;
	for (int i = 0; i < steps; i++)
	{
		//changed to loop up to
		//while temp > 1e-6:
		int time = (clock() - startTime) / (double)CLOCKS_PER_SEC;
		cout << "Temperature = " << temp << ", Tour Length = " << tourLength(cities) << ", Time Elapsed = " << time << endl;
		tSearch(cities, temp, attempts, changes);
		temp *= alpha;
	}
}

void tSearch(vector<City> &cities, double temp, int attempts, int changes)
{
	int nAtt = 0;
	int nChg = 0;

	while (nAtt < attempts && nChg < changes)
	{
		// tSelect will return the tuple ci, cj, dE
		tuple<int, int, double> selectionTuple = tSelect(cities);
		if (accept(get<2>(selectionTuple), temp))
		{
			tChange(cities, get<0>(selectionTuple), get<1>(selectionTuple));
			nChg += 1;
		}
		nAtt += 1;
		if (nAtt >= attempts)
			cout << "Max number of attempts reached, cooling..." << endl;
		if (nChg >= changes)
			cout << "Max number of tour changes reached, cooling..." << endl;
	}
}

tuple<int, int, double> tSelect(vector<City> &cities)
{
	//pick random cities in tour (-> remainder will be a number between 0 and max-1)
	int max = cities.size();

	int ci = rand() % max;
	int cj = rand() % max;

	//find the cities directly after ci and cj
	int cinx = (ci + 1) % cities.size();
	int cjnx = (cj + 1) % cities.size();


	//calculate energy change, i.e.tour length change, for reversing the sequence between ci and cj
	int dE = 0;
	if (ci != cj)
	{
		dE = (cities[ci].distanceTo(cities[cj]) + cities[cinx].distanceTo(cities[cjnx]) - cities[ci].distanceTo(cities[cinx]) - cities[cj].distanceTo(cities[cjnx]));

	}
	tuple<int, int, double> result(ci, cj, double(dE));
	return result;
}

//I'm not sure what line 214 is calculating or if this function is returning just a bool?
bool accept(double dE, double temp)
{
	bool acceptance;
	if (dE > 0)
	{
		acceptance = (exp(-dE / temp) > rand());
	}

	else
		acceptance = true;

	return acceptance;
}

// TODO: Patrick refactored, please test
void tChange(vector<City> &cities, int ci, int cj)
{

	swap(cities[ci], cities[cj]);
	int n = cities.size();

	// define iterators for the snip boundaries
	vector<City>::iterator snipStart = cities.begin();
	vector<City>::iterator snipEnd = cities.begin();

	if ((ci + 1) < cities.size())
	{
		advance(snipStart, ci + 1);
	}

	if ((cj + 1) < cities.size())
	{
		advance(snipEnd, cj + 1);
	}
	else
	{
		snipEnd = cities.end();
	}

	//snippet does not wrap around end of list
	if (ci < cj)
	{
		reverse(snipStart, snipEnd);
	}
	else
	{
		//the snippet wraps around the end of the list, so ninjutsu is needed...
		//for Python at least, modular wizardry is needed for C++
		int lss = n + cj - ci;

		for (int k = 1; k < lss / 2 + 1; ++k)
		{
			swap(cities[(ci + k) % n], cities[(n + cj - k + 1) % n]);
		}
	}
}
