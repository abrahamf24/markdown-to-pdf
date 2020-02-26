var fs = require("fs")
const path = require('path');

exports.removeFilesInDir = (dirPath) => {
    if(fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()){
        fs.readdir(dirPath, (err, files) => {
            if (err) throw err;
        
            for (const file of files) {
                if(fs.existsSync(path.join(dirPath, file)) && fs.lstatSync(path.join(dirPath, file)).isDirectory()){
                    this.removeFilesInDir(path.join(dirPath, file));
                }else{
                    fs.unlink(path.join(dirPath, file), err => {
                        if (err) throw err;
                    });
                }
            }
        });
    }
}