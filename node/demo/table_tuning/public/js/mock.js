const Mock = require('mockjs')
// 数据模版
const template = {
    'list|10000': [{
        'id|+1': 1,
        'name': '@name',
        'img': '@image',
        'size|+1': 1,
        'suf': 'jpeg',
        'time': '@time',
    }]
}

const Data = Mock.mock(template)

module.exports = {
    Data
}