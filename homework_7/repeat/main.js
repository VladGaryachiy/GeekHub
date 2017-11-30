

/* =============================== 1 анмимация на Velocity============================================

$('[data-product]').on('click',function (event) {
 var product = $(event.currentTarget);

 product.velocity({ // анимация jQuery
     'background-color':'#3BE300',
     'translateX': '400px',//перемещаем по Х
     'translateY': '200px',//перемещаем по У
     'scale':1.3, // увел розмер
     'rotateZ':'45deg', // розворот
     'cubic-bezier': '(.67,.04,0,1.2)'
 },{

    duration:500, // скорость выполнения
    complete:function () {
        console.log('done'); // когда анимация выполнена
    }
 });
});

*/

/* ======================================== 2 анимация на класе ======================================================
$('[data-product]').on('click',function (event){
    var product = $(event.currentTarget);
    $(product).addClass('trans')
});
*/







/* ==============================1 способ====================================================
$('#start').on('click',function (event) {
    var products  = $('[data-product]');
    var promises = [];

    products.each(function (i,node) {
      var promise = new Promise(function (success, error) {
          $(node).velocity('callout.shake',{
              duration: Math.random()*1000,
              complete: function () {
                  success(i + 10);
              }
          });

      });
        promises.push(promise);
    });


    promises.forEach(function (promise) {
        promise.then(function (index) {
            console.log(index)
        })
    });

    var whenAllAnimation = Promise.all(promises); // принимает массив промисов

    whenAllAnimation.then(function (indexes) {  // передает резултаты всеx промисов
        console.log('done ' , indexes)
    })

});*/





/* ===================================== 2 способ - навесить callback на ф-ю ==================
$('#start').on('click',function () {
    shakeProducts().then(function () {
        console.log('Ready')
    });
});

function shakeProducts() {
    var products  = $('[data-product]');
    var promises = [];

    products.each(function (i,node) {
        var promise = new Promise(function (success, error) {
            $(node).velocity('callout.shake',{
                duration: Math.random()*1000,
                complete: function () {
                    success(i + 10);
                }
            });

        });
        promises.push(promise);
    });


    promises.forEach(function (promise) {
        promise.then(function (index) {
            console.log(index)
        })
    });

    var whenAllAnimation = Promise.all(promises); // принимает массив промисов
    return  whenAllAnimation;
}
*/

/* =============================== 2 способ - навесить callback на ф-ю ====================

$('#start').on('click',function () {
    shakeProducts().then(function () {
        console.log('Ready')
    });
});

function shakeProducts() {
    var products  = $('[data-product]');
    var promises = [];

    products.each(function (i,node) {
        var promise = new Promise(function (success, error) {
            $(node).velocity('callout.shake',{
                duration: Math.random()*1000,
                complete: function () {
                    success(i + 10);
                }
            });

        });
        promises.push(promise);
    });


    promises.forEach(function (promise) {
        promise.then(function (index) {
            console.log(index)
        })
    });

    var whenAllAnimation = Promise.all(promises); // принимает массив промисов
    return  whenAllAnimation;
}
*/




/* ==================================== 3 способ с ошибкой========================================

$('#start').on('click',function () {
    var promise =shakeProducts();

    promise.then(function () {
        console.log('Ready')
    });

    promise.catch(function (error) {
        console.log(error)
    })
});

function shakeProducts() {
    var products  = $('[data-product]');
    var promises = [];

    products.each(function (i,node) {
        var promise = new Promise(function (success, error) {
            $(node).velocity('callout.shake',{
                duration: Math.random()*1000,
                complete: function () {
                    if(i === 2){
                        error('Error')
                    }
                    else{
                        success(i+10);
                    }
                }
            });

        });
        promises.push(promise);
    });


    promises.forEach(function (promise, i ) {
        promise.then(function (result) { // then вешается на позитивный результат и принимает 2 параметра 1 ф - успех, 2 ф - отриц
            console.log(i , result)
        });

        promise.catch(function (error) { // ловим ошибку
            console.log(i , error)
        })
    });

    var whenAllAnimation = Promise.all(promises); // принимает массив промисов
    return  whenAllAnimation;
}*/



/*
 ================================ 4 способ  - вызоп по - цепочке =================================================
*/

$('#start').on('click',function () {
    var products = $('[data-product]');

    var promise = Promise.resolve(); // возращает промис который выполнился успешно

    products.each(function (i,node) {
       promise =  promise.then(function () { //перезаписуем
            return new Promise(function (success, error) {
                $(node).velocity('callout.shake',{
                    duration: 700,
                    complete: function () {
                        success(i+10);
                    }
                });
            });
        })
    });

    promise.then(function () {
        console.log('Done')
    });
});

/*
$('#start').on('click',function () {

    var product = $('[data-product]');
    var promises = [];

    product.each(function (i, element) {
        var promise = new Promise(function (done,error) {
            $(element).velocity('callout.shake',{
                duration: Math.random()*1000,
                complete: function () {
                    done("Ready: " + i);
                }
            });
        });

        promises.push(promise);
    });

    promises.forEach(function (element) {
        element.then(function (result) {
            console.log(result);
        })

    });


    var allPromises = Promise.all(promises);

    allPromises.then(function () {
       console.log('All done!')
    })




});
*/
