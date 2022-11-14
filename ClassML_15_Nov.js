// line 3-206 we are creating labels for urban,bare, water,vegetation
// Modified only resources
var bangalore = ee.FeatureCollection("users/ujavalgandhi/public/bangalore_boundary"),
    urban = /* color: #cad6c9 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([77.65618319730623, 12.95477448092164]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([77.65865082959994, 12.954586277198294]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([77.63830895643099, 12.955150887941738]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.66609664182528, 12.94988113790161]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.66375775556429, 12.901946395056886]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([77.65888686399325, 12.89370537764819]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([77.65365119199618, 12.896257193774513]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([77.62019868116244, 12.879690841834488]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([77.52617116193636, 12.949504722919158]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([77.5341748736368, 12.950006609436077]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([77.52097840528353, 12.94268733095577]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([77.53140683393343, 12.936183448914932]),
            {
              "landcover": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([77.53735060911043, 12.932983727663112]),
            {
              "landcover": 0,
              "system:index": "12"
            })]),
    bare = /* color: #aa7233 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([77.57875318746432, 12.90030448811505]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([77.5725885921923, 12.900400939536988]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([77.49744362980495, 12.922142137826711]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.49586649090419, 12.923512017657885]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.51070317426908, 12.987672000516854]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([77.62705455241222, 13.020352510846644]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([77.60701308665294, 13.023070275607665]),
            {
              "landcover": 1,
              "system:index": "6"
            })]),
    water = /* color: #0b4a8b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([77.58402702188951, 12.946465216050397]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([77.58241769648058, 12.944980444410998]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([77.56014463282091, 12.952027802976799]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.61788722849352, 12.909343273988116]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.67170307016832, 12.935778845503677]),
            {
              "landcover": 2,
              "system:index": "4"
            })]),
    vegetation = /* color: #4dff5e */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([77.5929834739004, 12.973819098281412]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([77.5915243521963, 12.972020838933782]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([77.58681439316615, 12.948882773171434]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.58470259216357, 12.952709641880457]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.58338294532824, 12.913978183843149]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([77.58053458317988, 12.923805025122903]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([77.57196240215771, 13.010018094770263]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([77.56953768520825, 13.021422529521482]),
            {
              "landcover": 3,
              "system:index": "7"
            })]);

// Reading the Harmonized dataset
            var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
            var geometry = bangalore.geometry();

// Creating Visual Parameters
            var rgbVis = {
              min: 0.0,
              max: 3000,
              bands: ['B4', 'B3', 'B2'],
            };
 // Filtering the dataset based on cloud percentage,date and geometry            
            var filtered = s2
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
              .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
              .filter(ee.Filter.bounds(geometry))
              .select('B.*');
            
 
// Creating a composite image based on median and clipping it 
            var composite = filtered.median().clip(geometry) ;
            
            // Display the input composite.
            Map.addLayer(composite, rgbVis, 'image');
            
//merging all the points into one ground control points
            var gcps = urban.merge(bare).merge(water).merge(vegetation);
            
// Overlay the point on the image to get training data.
            var training = composite.sampleRegions({
              collection: gcps, 
              properties: ['landcover'], 
              scale: 10
            });
            
            
// Train a classifier use the function ee.classifier based on gcps (var training)
            var classifier = ee.Classifier.smileRandomForest(50).train({
              features: training,  
              classProperty: 'landcover', 
              inputProperties: composite.bandNames()
            });

// // Classify the image.
            var classified = composite.classify(classifier);
            Map.centerObject(geometry);
            Map.addLayer(classified, {min: 0, max: 3, palette: ['gray', 'brown', 'blue', 'green']}, '2019');
            
// you just created a basic ML model for classifying an image
// How do we test the accuracy of our models ?
// Crate a model and do an accuracy assessment 

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
var basin = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7");
var gcp = ee.FeatureCollection("users/ujavalgandhi/e2e/arkavathy_gcps");
print(gcp)   
var arkavathy = basin.filter(ee.Filter.eq('HYBAS_ID', 4071139640));
var geometry = arkavathy.geometry();
Map.centerObject(geometry);

var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
 
var filtered = s2
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
  .filter(ee.Filter.bounds(geometry))
  .select('B.*');

var composite = filtered.median().clip(geometry);

// Display the input composite.
Map.addLayer(composite, rgbVis, 'image');


// Add a random column and split the GCPs into training and validation set
var gcp = gcp.randomColumn();
print(gcp)

// This being a simpler classification, we take 60% points
// for validation. Normal recommended ratio is
// 70% training, 30% validation
var trainingGcp = gcp.filter(ee.Filter.lt('random', 0.6));
print(trainingGcp)
var validationGcp = gcp.filter(ee.Filter.gte('random', 0.4));
print(validationGcp)

// Overlay the point on the image to get training data.
var training = composite.sampleRegions({
  collection: trainingGcp,
  properties: ['landcover'],
  scale: 10,
  tileScale: 16
});

print(training) // you will see landcover added

// Train a classifier.
var classifier = ee.Classifier.smileRandomForest(50)
.train({
  features: training,  
  classProperty: 'landcover',
  inputProperties: composite.bandNames()
});

// Classify the image.
var classified = composite.classify(classifier);

Map.addLayer(classified, {min: 0, max: 3, palette: ['gray', 'brown', 'blue', 'green']}, '2019');

// adding legend is bit complicated showing you how to do it

var legend = ui.Panel({style: {position: 'middle-right', padding: '8px 15px'}});

var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {color: '#ffffff',
      backgroundColor: color,
      padding: '10px',
      margin: '0 0 4px 0',
    }
  });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0px 0 4px 6px',
    }
  }); 
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')}
)};

var title = ui.Label({
  value: 'Legend',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0px 0 4px 0px'}});
    
legend.add(title);
legend.add(makeRow('gray','Built-up'))
legend.add(makeRow('brown','Bare Earth'))
legend.add(makeRow('blue','Water'))
legend.add(makeRow('green','Vegetation'))

Map.add(legend);

//************************************************************************** 
// Accuracy Assessment
//************************************************************************** 

// Use classification map to assess accuracy using the validation fraction
// of the overall training set created above.
var test = classified.sampleRegions({
  collection: validationGcp,
  properties: ['landcover'],
  tileScale: 16,
  scale: 10,
});
print(test) // properties have classification and landcover

var testConfusionMatrix = test.errorMatrix('landcover', 'classification')
// Printing of confusion matrix may time out. Alternatively, you can export it as CSV
print('Confusion Matrix', testConfusionMatrix);
print('Test Accuracy', testConfusionMatrix.accuracy());

// Improving the model by normalizing the image
// We will write a function to take an image and normalize it 
// use simple random forest

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
var basin = ee.FeatureCollection('WWF/HydroSHEDS/v1/Basins/hybas_7');
var gcp = ee.FeatureCollection('users/ujavalgandhi/e2e/arkavathy_gcps');
var alos = ee.Image('JAXA/ALOS/AW3D30/V2_2');


var arkavathy = basin.filter(ee.Filter.eq('HYBAS_ID', 4071139640));
var geometry = arkavathy.geometry();
Map.centerObject(geometry);

var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
// Function to remove cloud and snow pixels from Sentinel-2 SR image

function maskCloudAndShadowsSR(image) {
  var cloudProb = image.select('MSK_CLDPRB');
  var snowProb = image.select('MSK_SNWPRB');
  var cloud = cloudProb.lt(10);
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); // 3 = cloud shadow
  var cirrus = scl.eq(10); // 10 = cirrus
  // Cloud probability less than 10% or cloud shadow classification
  var mask = cloud.and(cirrus.neq(1)).and(shadow.neq(1));
  return image.updateMask(mask);
}


var filtered = s2
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
  .filter(ee.Filter.bounds(geometry))
  .map(maskCloudAndShadowsSR)
  .select('B.*');

var composite = filtered.median().clip(geometry);


var addIndices = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename(['ndvi']);
  var ndbi = image.normalizedDifference(['B11', 'B8']).rename(['ndbi']);
  var mndwi = image.normalizedDifference(['B3', 'B11']).rename(['mndwi']); 
  var bsi = image.expression(
      '(( X + Y ) - (A + B)) /(( X + Y ) + (A + B)) ', {
        'X': image.select('B11'), //swir1
        'Y': image.select('B4'),  //red
        'A': image.select('B8'), // nir
        'B': image.select('B2'), // blue
  }).rename('bsi');
  return image.addBands(ndvi).addBands(ndbi).addBands(mndwi).addBands(bsi);
};

var composite = addIndices(composite);


// Calculate Slope and Elevation
var elev = alos.select('AVE_DSM').rename('elev');
var slope = ee.Terrain.slope(alos.select('AVE_DSM')).rename('slope');

var composite = composite.addBands(elev).addBands(slope);

var visParams = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000, gamma: 1.2};
Map.addLayer(composite, visParams, 'RGB');

// Normalize the image 

// Machine learning algorithms work best on images when all features have
// the same range

// Function to Normalize Image
// Pixel Values should be between 0 and 1
// Formula is (x - xmin) / (xmax - xmin)
//************************************************************************** 
function normalize(image){
  var bandNames = image.bandNames();
  // Compute min and max of the image
  var minDict = image.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: geometry,
    scale: 10,
    maxPixels: 1e9,
    bestEffort: true,
    tileScale: 16
  });
  var maxDict = image.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: geometry,
    scale: 10,
    maxPixels: 1e9,
    bestEffort: true,
    tileScale: 16
  });
  var mins = ee.Image.constant(minDict.values(bandNames));
  var maxs = ee.Image.constant(maxDict.values(bandNames));

  var normalized = image.subtract(mins).divide(maxs.subtract(mins));
  return normalized;
}

var composite = normalize(composite);
// Add a random column and split the GCPs into training and validation set
var gcp = gcp.randomColumn();

// This being a simpler classification, we take 60% points
// for validation. Normal recommended ratio is
// 70% training, 30% validation
var trainingGcp = gcp.filter(ee.Filter.lt('random', 0.6));
var validationGcp = gcp.filter(ee.Filter.gte('random', 0.4));

// Overlay the point on the image to get training data.
var training = composite.sampleRegions({
  collection: trainingGcp,
  properties: ['landcover'],
  scale: 10,
  tileScale: 16
});
print(training);

// Train a classifier.
var classifier = ee.Classifier.smileRandomForest(50)
.train({
  features: training,  
  classProperty: 'landcover',
  inputProperties: composite.bandNames()
});

// Classify the image.
var classified = composite.classify(classifier);

Map.addLayer(classified, {min: 0, max: 3, palette: ['gray', 'brown', 'blue', 'green']}, '2019');

//************************************************************************** 
// Accuracy Assessment
//************************************************************************** 

// Use classification map to assess accuracy using the validation fraction
// of the overall training set created above.
var test = classified.sampleRegions({
  collection: validationGcp,
  properties: ['landcover'],
  scale: 10,
  tileScale: 16
});

var testConfusionMatrix = test.errorMatrix('landcover', 'classification');

// Printing of confusion matrix may time out. Alternatively, you can export it as CSV
print('Confusion Matrix', testConfusionMatrix);
print('Test Accuracy', testConfusionMatrix.accuracy());
 
//************************************************************************** 
// Exporting Results
//************************************************************************** 

// Create a Feature with null geometry and the value we want to export.
// Use .array() to convert Confusion Matrix to an Array so it can be
// exported in a CSV file
var fc = ee.FeatureCollection([
  ee.Feature(null, {
    'accuracy': testConfusionMatrix.accuracy(),
    'matrix': testConfusionMatrix.array()
  })
]);

print(fc);

Export.table.toDrive({
  collection: fc,
  description: 'Accuracy_Export',
  folder: 'earthengine',
  fileNamePrefix: 'accuracy',
  fileFormat: 'CSV'
});


// caluclate area
// try to incorprate in original code

var classified = ee.Image('users/ujavalgandhi/e2e/bangalore_classified');
var bangalore = ee.FeatureCollection('users/ujavalgandhi/public/bangalore_boundary');

Map.addLayer(bangalore, {color: 'blue'}, 'Bangalore City');

Map.addLayer(classified,
  {min: 0, max: 3, palette: ['gray', 'brown', 'blue', 'green']},
  'Classified Image 2019');

// Calling .geometry() on a feature collection gives the
// dissolved geometry of all features in the collection

// .area() function calculates the area in square meters
var cityArea = bangalore.geometry().area();

// We can cast the result to a ee.Number() and calculate the
// area in square kilometers
var cityAreaSqKm = ee.Number(cityArea).divide(1e6).round();
print(cityAreaSqKm);


// Area Calculation for Images
var vegetation = classified.eq(3);
// If the image contains values 0 or 1, we can calculate the
// total area using reduceRegion() function

// The result of .eq() operation is a binary image with pixels
// values of 1 where the condition matched and 0 where it didn't
Map.addLayer(vegetation, {min:0, max:1, palette: ['white', 'green']}, 'Green Cover');

// Since our image has only 0 and 1 pixel values, the vegetation
// pixels will have values equal to their area
var areaImage = vegetation.multiply(ee.Image.pixelArea());


// Now that each pixel for vegetation class in the image has the value
// equal to its area, we can sum up all the values in the region
// to get the total green cover.

var area = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: bangalore.geometry(),
  scale: 10,
  maxPixels: 1e10
});
// The result of the reduceRegion() function is a dictionary with the key
// being the band name. We can extract the area number and convert it to
// square kilometers
var vegetationAreaSqKm = ee.Number(area.get('classification')).divide(1e6).round();
print(vegetationAreaSqKm);

