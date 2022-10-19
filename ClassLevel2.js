// Let's see how to take a list of numbers and add 1 to each element
var myList = ee.List.sequence(1, 10);

// Define a function that takes a number and adds 1 to it
var myFunction = function(number) {
  return number + 1;
}
print(myFunction(1));

//Re-Define a function using Earth Engine API
var myFunction = function(number) { 
  return ee.Number(number).add(1);
}

// Map the function of the list
var newList = myList.map(myFunction);
print(newList); 

// Extracting value from a list

var value = newList.get(0)
print(value)

// Casting

// Let's try to do some computation on the extracted value
//var newValue = value.add(1)
//print(newValue)

// You get an error because Earth Engine doesn't know what is the type of 'value'
// We need to cast it to appropriate type first
var value = ee.Number(value)
var newValue = value.add(1)
print(newValue)

// Dictionary
// Convert javascript objects to EE Objects
var data = {'city': 'Pullman', 'population':25000, 'elevation': 717};
var eeData = ee.Dictionary(data);
// Once converted, you can use the methods from the
// ee.Dictionary module
print(eeData.get('city'))

// Dates
// For any date computation, you should use ee.Date module

var date = ee.Date('2019-01-01')
var futureDate = date.advance(1, 'year')
print(futureDate)



var s2 = ee.ImageCollection("COPERNICUS/S2");
var admin2 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");

var whitman = admin2.filter(ee.Filter.eq('ADM2_NAME', 'Whitman'))
var geometry = whitman.geometry()

var filtered = s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
  .filter(ee.Filter.bounds(geometry))

var image = filtered.median(); 

// Calculate  Normalized Difference Vegetation Index (NDVI)
// 'NIR' (B8) and 'RED' (B4)
var ndvi = image.normalizedDifference(['B8', 'B4']).rename(['ndvi']);

// Calculate Modified Normalized Difference Water Index (MNDWI)
// 'GREEN' (B3) and 'SWIR1' (B11)
var mndwi = image.normalizedDifference(['B3', 'B11']).rename(['mndwi']); 

// Calculate Soil-adjusted Vegetation Index (SAVI)
// 1.5 * ((NIR - RED) / (NIR + RED + 0.5))

// For more complex indices, you can use the expression() function

// Note: 
// For the SAVI formula, the pixel values need to converted to reflectances
// Multiplyng the pixel values by 'scale' gives us the reflectance value
// The scale value is 0.0001 for Sentinel-2 dataset

var savi = image.expression(
    '1.5 * ((NIR - RED) / (NIR + RED + 0.5))', {
      'NIR': image.select('B8').multiply(0.0001),
      'RED': image.select('B4').multiply(0.0001),
}).rename('savi');

var rgbVis = {min: 0.0, max: 3000, bands: ['B4', 'B3', 'B2']};
var ndviVis = {min:0, max:1, palette: ['white', 'green']}
var ndwiVis = {min:0, max:0.5, palette: ['white', 'blue']}

Map.addLayer(image.clip(geometry), rgbVis, 'Image');
Map.addLayer(mndwi.clip(geometry), ndwiVis, 'mndwi')
Map.addLayer(savi.clip(geometry), ndviVis, 'savi') 
Map.addLayer(ndvi.clip(geometry), ndviVis, 'ndvi')




var s2 = ee.ImageCollection("COPERNICUS/S2");
var admin1 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
    
var Washington = admin1.filter(ee.Filter.eq('ADM1_NAME', 'Washington'))
var geometry = Washington.geometry()
var rgbVis = {min: 0.0, max: 3000, bands: ['B4', 'B3', 'B2']};

var filtered = s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
  .filter(ee.Filter.bounds(geometry))

var composite = filtered.median().clip(geometry)
Map.addLayer(composite, rgbVis, 'Washington Composite')  


// Write a function that computes NDVI for an image and adds it as a band
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi');
  return image.addBands(ndvi);
}

// Map the function over the collection
var withNdvi = filtered.map(addNDVI);

var composite = withNdvi.median()

var ndviComposite = composite.select('ndvi').clip(Washington)

var palette = [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];

var ndviVis = {min:0, max:0.5, palette: palette }
Map.addLayer(ndviComposite, ndviVis, 'ndvi')




var image = ee.Image('COPERNICUS/S2/20190703T050701_20190703T052312_T43PGP')
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};

Map.centerObject(image)
Map.addLayer(image, rgbVis, 'Full Image', false)

// Write a function for Cloud masking
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}

var maskedImage = ee.Image(maskS2clouds(image))
Map.addLayer(maskedImage, rgbVis, 'Masked Image')



// Computing stats on a list
var myList = ee.List.sequence(1, 10);
print(myList)

// Use a reducer to compute min and max in the list
var mean = myList.reduce(ee.Reducer.mean());
print(mean);

var geometry1 = ee.Geometry.Polygon([[
        [-117.25479928244287, 46.71612224738052],
        [-117.25479928244287, 46.70140857139888],
        [-117.22802010763819, 46.70140857139888],
        [-117.22802010763819, 46.71612224738052]
        ]]);

var s2 = ee.ImageCollection("COPERNICUS/S2");
Map.centerObject(geometry1)

// Apply a reducer on a image collection
var filtered = s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2019-01-01', '2020-01-01'))
  .filter(ee.Filter.bounds(geometry))
  .select('B.*')

print(filtered.size())
var collMean = filtered.reduce(ee.Reducer.mean());
print('Reducer on Collection', collMean);

var image = ee.Image('COPERNICUS/S2/20190223T050811_20190223T051829_T44RPR')
var rgbVis = {min: 0.0, max: 3000, bands: ['B4', 'B3', 'B2']};
Map.addLayer(image, rgbVis, 'Image')
Map.addLayer(geometry, {color: 'red'}, 'Farm')
// If we want to compute the average value in each band,
// we can use reduceRegion instead
var stats = image.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: geometry1,
  scale: 100,
  maxPixels: 1e10
  })
print(stats);

// Result of reduceRegion is a dictionary. 
// We can extract the values using .get() function
print('Average value in B4', stats.get('B4'))



var s2 = ee.ImageCollection("COPERNICUS/S2");
var geometry1 = ee.Geometry.Polygon([[
    [-117.25479928244287, 46.71612224738052],
    [-117.25479928244287, 46.70140857139888],
    [-117.22802010763819, 46.70140857139888],
    [-117.22802010763819, 46.71612224738052]
    ]]);

Map.addLayer(geometry1, {color: 'red'}, 'Farm')
Map.centerObject(geometry1)
var rgbVis = {min: 0.0, max: 3000, bands: ['B4', 'B3', 'B2']};

var filtered = s2
  .filter(ee.Filter.date('2017-01-01', '2018-01-01'))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.bounds(geometry))

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

var filtered = filtered.map(maskS2clouds)
// Write a function that computes NDVI for an image and adds it as a band
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi');
  return image.addBands(ndvi);
}

// Map the function over the collection
var withNdvi = filtered.map(addNDVI);


// Display a time-series chart
var chart = ui.Chart.image.series({
  imageCollection: withNdvi.select('ndvi'),
  region: geometry1,
  reducer: ee.Reducer.mean(),
  scale: 10
}).setOptions({
      lineWidth: 1,
      title: 'NDVI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'NDVI'},
      hAxis: {title: '', format: 'YYYY-MMM'}
    })
print(chart);






