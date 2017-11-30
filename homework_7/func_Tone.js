


    var start = $('#start');
    /*currentSrc $('<img data-img height="200px" width="200px" class="animals" src='+item+' >').appendTo('#images');*/

    start.click(function () {

        var imageMass = [
            'https://naked-science.ru/sites/default/files/field/image/1_688.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Canis_lupus_laying.jpg/250px-Canis_lupus_laying.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Felis_silvestris_silvestris.jpg/1200px-Felis_silvestris_silvestris.jpg',

        ];


        var promise = Promise.resolve();

        imageMass.forEach(function (item,i) {

            promise = promise.then(function () {
                return new Promise(function (done,error) {
                    var create = $('<img data-img height="200px" width="200px" class="animals" src='+item+' >');
                    $(create).appendTo('#images');
                    $('[data-img]').load(
                        done(i)
                    )
                })
            }).then(function () {
                console.log(i+' Good')
            })


        })











    });