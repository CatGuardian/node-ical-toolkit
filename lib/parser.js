/**
 * Parsers
 * */

//Deps
var ical2json = require('ical2json'),
  fs          = require('fs'),
  transformer = require('./transformer');

//Make it better later on, Don't release the zango
/**
 * Parse file string to JSON
 * */
exports.parseToJSON = function (fileContent, callback) {
  try {
    var fileContent = fileContent.toString();
    var json        = ical2json.convert(fileContent);
    //TODO: get transformer working
    //console.log(`0--parseToJSON:: ${JSON.stringify(json0, null, 2)}`);
    //var json   = transformer.transform(ical2json.convert(fileContent));
    //console.log(`1--parseToJSON:: ${JSON.stringify(json, null, 2)}`);

    if (typeof callback == 'function') {
      setImmediate(function () {
        callback(null, json);
      });
    } else return json;
  } catch (err) {
    err = new Error('Error in parsing .ics file string. ' + err.message);
    if (typeof callback == 'function') {
      setImmediate(function () {
        callback(err);
      });
    } else return err;
  }
};

/**
 * parse file to JSON
 * */
exports.parseFileToJSON = function (filePath, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) callback(new Error(err));
    else exports.parseToJSON(content, callback);
  });
};

/**
 * parse file to JSON Sync
 * */
exports.parseFileToJSONSync = function (filePath) {
  try {
    return exports.parseToJSON(fs.readFileSync(filePath));
  } catch (c) {
    return new Error('Error in parsing .ics file string. ' + c.message);
  }
};
