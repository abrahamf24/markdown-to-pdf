const {removeFilesInDir} = require('./functions')
var markdownpdf = require("markdown-pdf")
var through = require('through');
var cheerio = require('cheerio');
var fs = require("fs")
const path = require('path');

var settingsJsonPath = process.argv[2];
if(!settingsJsonPath){
    console.error('The settings JSON file path not dound in args');
    return;
}

if (!fs.existsSync(settingsJsonPath)) {
    console.error(`The settings file ${settingsJsonPath} does not exists`);
    return;
}

let rawSettings = fs.readFileSync(settingsJsonPath);
let settings = JSON.parse(rawSettings);

let {mapFiles, clearDirs} = settings;

if(clearDirs){
    clearDirs.forEach(dirToClear => {
        removeFilesInDir(dirToClear)
    });
}

mapFiles && Object.keys(mapFiles).forEach(filePathIn => {
    var preProcessHtml = function() {

        return through(function(data) {
            var $ = cheerio.load(data);
    
            $('img[src]').each(function(i, elem) {
                var pathSrc = $(this).attr('src');
                pathSrc = 'file:///'+path.dirname(filePathIn).split(path.sep).pop()+'/'+ pathSrc;
                $(this).attr('src', pathSrc);
            });
    
            this.queue($.html());
        });
    };

    markdownpdf({preProcessHtml}).from(filePathIn).to(mapFiles[filePathIn], function () {
        console.log(`File ${mapFiles[filePathIn]} generated`)
    })
});