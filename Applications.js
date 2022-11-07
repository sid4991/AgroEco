//Spectral Angle Mapper Part 1

var geometry = 
    /* color: #98ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-117.22605086395438, 46.75583208245601],
          [-117.22605086395438, 46.70335395287569],
          [-117.08185530731376, 46.70335395287569],
          [-117.08185530731376, 46.75583208245601]]], null, false);
Map.centerObject(geometry)
var s2 = ee.ImageCollection("COPERNICUS/S2")
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};

// Write a function for Cloud masking
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask)//.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
} 

var filtered = s2
  .filter(ee.Filter.bounds(geometry))
  .map(maskS2clouds)
  .select('B.*')
  
var dateOfIncident = ee.Date('2018-04-15')
var before = filtered
  .filter(ee.Filter.date(
    dateOfIncident.advance(-2, 'year'), dateOfIncident))
  .filter(ee.Filter.calendarRange(05, 05, 'month'))
  .median()
  
var after = filtered
  .filter(ee.Filter.date(
    dateOfIncident, dateOfIncident.advance(1, 'month')))
  .median()


Map.addLayer(before, rgbVis, 'Before')
Map.addLayer(after, rgbVis, 'After')

// Use the spectralDistnace() function to get spectral distance measures

// Use the metric 'Spectral Angle Mapper (SAM)
// The result is the spectral angle in radians
var angle = after.spectralDistance(before, 'sam');
Map.addLayer(angle, {min: 0, max: 1, palette: ['white', 'purple']}, 'Spectral Angle');

// Use the metric 'Squared Euclidian Distance (SED)'
var sed = after.spectralDistance(before, 'sed');
// Take square root to get euclidian distance
var distance = sed.sqrt();

Map.addLayer(distance, {min: 0, max: 1500, palette: ['white', 'red']}, 'spectral distance');


//Spectral Index Change Part 2

// 2021, massive forest fires broke out in
// numerous places OR  WA.
// By 25 July 2021 most fire was brought under control
// This script shows how to do damage assessment using
// spectral index change detection technique.

// Define the area of interest

var geometry = 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-117.69119376912735, 45.57078929054561],
          [-117.69119376912735, 44.687202009907246],
          [-116.5293895699086, 44.687202009907246],
          [-116.5293895699086, 45.57078929054561]]], null, false);
          
          
var fireStart = ee.Date('2021-06-01');
var fireEnd = ee.Date('2021-07-01');

Map.centerObject(geometry, 10)

var s2 = ee.ImageCollection("COPERNICUS/S2")

// Write a function for Cloud masking
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask)//.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
} 

// Apply filters and cloud mask
var filtered = s2
  .filter(ee.Filter.bounds(geometry))
  .map(maskS2clouds)
  .select('B.*')

// Create Before and After composites
var before = filtered
  .filter(ee.Filter.date(
    fireStart.advance(-2, 'month'), fireStart))
  .median()

var after = filtered
  .filter(ee.Filter.date(
    fireEnd, fireEnd.advance(1, 'month')))
  .median()

// Freshly burnt regions appeat bright in SWIR-bands
// Use a False Color Visualization
var swirVis = {
  min: 0.0,
  max: 3000,
  bands: ['B12', 'B8', 'B4'],
};
Map.addLayer(before, swirVis, 'Before')
Map.addLayer(after, swirVis, 'After')

// Write a function to calculate  Normalized Burn Ratio (NBR)
// 'NIR' (B8) and 'SWIR-2' (B12)
var addNBR = function(image) {
  var ndbi = image.normalizedDifference(['B8', 'B12']).rename(['nbr']);
  return image.addBands(ndbi)
}

var beforeNbr = addNBR(before).select('nbr');
var afterNbr = addNBR(after).select('nbr');

var nbrVis = {min: -0.5, max: 0.5, palette: ['white', 'black']}

Map.addLayer(beforeNbr, nbrVis, 'Prefire NBR');
Map.addLayer(afterNbr, nbrVis, 'Postfire NBR');

// Calculate Change in NBR (dNBR)
var change = beforeNbr.subtract(afterNbr)

// Apply a threshold
var threshold = 0.3

// Display Burned Areas
var burned = change.gt(threshold)
Map.addLayer(burned, {min:0, max:1, palette: ['white', 'red']}, 'Burned', false) 


// LandCover
// Make a cloud-free Landsat 8 TOA composite (from raw imagery).
var points = ee.FeatureCollection('GOOGLE/EE/DEMOS/demo_landcover_labels');
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1');

var image = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2018-01-01', '2018-12-31'),
  asFloat: true
});

print(image)

// Use these bands for prediction.
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];

// Load training points. The numeric property 'class' stores known labels.


// This property stores the land cover labels as consecutive
// integers starting from zero.
var label = 'landcover';

// Overlay the points on the imagery to get training.
var training = image.select(bands).sampleRegions({
  collection: points,
  properties: [label],
  scale: 30
});

// Train a CART classifier with default parameters.
var trained = ee.Classifier.smileCart().train(training, label, bands);

// Classify the image with the same bands used for training.
var classified = image.select(bands).classify(trained);

// Display the inputs and the results.
Map.centerObject(points, 11);
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 0.4}, 'image');
Map.addLayer(classified,
             {min: 0, max: 2, palette: ['red', 'green', 'blue']},
             'classification');
Map.addLayer(points);

// Burn Area
