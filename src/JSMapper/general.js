
/**
 * log something to show that it is MapKey's linting
 * @param { string } msg the message to log with the MapKey label
 * @param { boolean } err is the message logged an error? (defaults to false)
 * @param { warning } warning is the message highlited as a warning? (defaults to false)
 */
module.exports.MKLog = function MKLog(msg = "bro this logging function is so cool", err = false, warning = false) {
    let error = false
    if(!err) { error = false } else { error = true }
    let warn = false
    if(!warning) { warn = false } else { warn = warning }
  
    if(error === false && warn === false) {
        console.log(`\x1b[32m [MapKey]:` + `\x1b[1m \x1b[37m ${msg}`)
    }
    if(warn === false && error === true) {
        console.log(`\x1b[1m \x1b[31m [Error In MapKey]:` + `\x1b[1m \x1b[37m ${msg}`)
    }
    if(warn === true && error === false) {
        console.log(`\x1b[1m \x1b[33m [Warning In MapKey]` + `\x1b[1m \x1b[37m ${msg}`)
    }
}
module.exports.logFunctionss = false;

module.exports.logFunctions = function logFunctions() {
    /**
     * Put this at the beginning of your script to console log properties of called functions and classes
     */
    logFunctionss = true
}

/**
 * turn an RGB color to a Beat Saber compatible color
 * @param { color } color the rgb color to convert
 * @returns a beat saber compatible color
 */
module.exports.rgb = function rgb(color = [1, 1, 1, 1]) {
    return [color[0] / 255, color[1] / 255, color[2] / 255, color[3]]
}

module.exports = {
    logFunctions: logFunctions,
    logFunctionss: logFunctionss
}