const Mock = require('mockjs')

const template = {
    'flow|1000':[{
        'id|+1':0,
        'name':'@name',
        'img':'@image'
    }]
}

const lazyLoadingData = Mock.mock(template)

module.exports = {
    lazyLoadingData
}