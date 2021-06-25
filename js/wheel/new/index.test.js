const { newObj } = require('./js/index');

it('测试new关键字返回对象', () => {
    function Targrt(name,age,gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    var target = newObj(Targrt,'Mrzhu',25,'男');
    expect(target).toEqual(obj)
})