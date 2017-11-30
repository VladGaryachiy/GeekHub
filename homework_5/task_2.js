

function  filterWhere(){

    var arr = [];
    var obj = [];

    for(var keyOne in arguments[0]){
        obj.push(arguments[0][keyOne]);
    }


    var res = obj[0];
    for(var i = 0; i<this.length; i++){

        for(var keyTwo in this[i]){
            if(res.test(this[i][keyTwo])){
                arr.push(this[i])
            }
        }

    }
    return arr;

}

Array.prototype.filterWhere = filterWhere;

var users = [{id: 1, name: 'Max', age: 18}, {id: 2, name: 'Bob', age: 22}, {id: 3, name: 'Nick', age: 18}];
var teenagers = users.filterWhere({name:/^max$/i});
console.log(teenagers);

