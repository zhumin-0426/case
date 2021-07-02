const Mock = require('mockjs')

const mockData = Mock.mock({
    'user': {
        'id': 1,
        'name': '@name',
        'image': '@image'
    }
})

module.exports = {
    mockData
};