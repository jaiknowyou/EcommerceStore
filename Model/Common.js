let CommonService = {}


CommonService.commonCheck = function (req, req_data, key = 'body') {
    if (!req_data.length) {
        return 0
    }
    let blank_array = []
    for (let count = 0; count < req_data.length; count++) {
        if (!req[key] || req[key][req_data[count]] === 'undefined' || req[key][req_data[count]] === undefined || req[key][req_data[count]] === null || (typeof req[key][req_data[count]] == 'string' && req[key][req_data[count]].trim() == '') || req[key][req_data[count]] === ' ' || req[key][req_data[count]] === '') {
            blank_array.push(req_data[count])
        }
    }
    if (blank_array.length) {
        return blank_array.join(',')
    }
    return 0
}

module.exports = CommonService