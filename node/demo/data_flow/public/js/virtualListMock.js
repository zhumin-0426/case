const Mock = require('mockjs')

const template = {
    'list|1000':[{
        'id|+1':0,
        'img':'@image'
    }]
}

const virtualListData = Mock.mock(template)

module.exports = {
    virtualListData
}