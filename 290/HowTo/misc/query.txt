select top 1000 
ActivityType = 
	CASE
		WHEN result.IsValidActivity = 1 THEN result.ActivityTypeToCheck
		ELSE 0
	END,
NumberOfPoints, 
NumberOfPointsOutsideThreshold,
AltitudeToTimeRSquared,
AltitudeToTimeSlope,
DistanceToTimeRSquared,
DistanceToTimeSlope,
LowestAltitude,
HighestAltitude,
ClosestDistanceFromRunway,
FurthestDistanceFromRunway, 
FirstPointDistanceFromRunway,
LastPointDistanceFromRunway,
FirstPointAltitude,
LastPointAltitude,
DATEDIFF(s, TimeFirstSeenGMT, TimeLastSeenGMT) as TimeVisibleSeconds,
DATEDIFF(s, TimeClosestToRunwayGMT, TimeFurthestToRunwayGMT) as TimeDifferenceFromRunwaySeconds,
NumberOfDisqualifyingPointsAfter,
NumberOfDisqualifyingPointsBefore
from AircraftTracking_ActivityAnalysisResult result
inner join AircraftTracking_AnalysisResult base
on base.AnalysisResultID = result.AnalysisResultID
inner join AircraftTracking_Flight trackflight
on trackflight.TrackFlightID = base.TrackFlightID
where 
base.AirportCode = 'KHTO' 
and base.Runway = '16'
and (trackflight.CreatedDateTime between '2016-07-01' and '2016-07-30')
and AltitudeToTimeRSquared is not null
order by ActivityAnalysisResultID desc
