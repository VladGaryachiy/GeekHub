



function SuperArray() {


    this.__proto__= Object.create(Array.prototype);

    this.filterWhere = function (valid) {

        var NewArr = [];

        this.filter(function (items) {
            test(items,valid);

        });

        function test(itemInput, newValid) {
            Object.keys(newValid).forEach(function (validName) {
                var validRule = newValid[validName];
                var inputData = itemInput[validName];

                if(typeof valid === "object"){
                    if(validRule === inputData){
                        NewArr.push(itemInput);

                    }
                    else if(validRule.constructor.name === "RegExp"){
                        if(validRule.test(inputData)){
                            NewArr.push(itemInput);
                        }
                    }
                    else{
                        return test(inputData,validRule) ;
                    }

                }
                else{
                    return false;
                }

            })
        }
        return NewArr;
    };


}

var users = new SuperArray();

users.push({id: 1, name: 'Max', age: 18}, {id: 2, name: 'Bob', age: 20}, {id: 3, name: 'Nick', age: 18});
console.log(users.filterWhere({age: 18})); // [{id: 1, name: 'Max', age: 18}, {id: 3, name: 'Nick', age: 18}]
console.log([].filterWhere);

















/*

var users = [{id: 1, name: 'Max', age: 18}, {id: 2, name: 'Bob', age: 22}, {id: 3, name: 'Nick', age: 18}];
var teenagers = users.filterWhere({age: 18});
console.log(teenagers);

var maxes = users.filterWhere({name: /^max$/i});
console.log(maxes);

var users2 = [
    {id: 1, name: 'Max', photo: {url: 'ava1.jpg', size: {width: 100, height: 50}}},
    {id: 2, name: 'Bob', photo: {url: 'avatar.png', size: {width: 800, height: 640}}},
    {id: 3, name: 'Nick', photo: {url: 'img.jpg', size: {width: 440, height: 320}}}
];
var usersWithBigPhoto = users2.filterWhere({photo: {size: {height: /\d{3}/}}});
console.log(usersWithBigPhoto);*/
