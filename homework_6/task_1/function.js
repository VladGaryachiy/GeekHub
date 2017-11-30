(function () {

    var body = $(document.body);

    $('#products > [data-product]').on('mousedown',function (event) {
        var helper = $(event.currentTarget); // елемент
        var clone = helper.clone(); // клонируем
        clone.css('width',helper.width()); // ширина как у парента

        var helperOffset = helper.offset(); //позици елемента на странице - возравщает обьект
        var offset = {
           top:  event.pageY - helperOffset.top, // ростояние от курсора к началу елемента
           left: event.pageX - helperOffset.left
        };

        clone.css({ // позиция елемента при нажатии
            top:event.pageY - offset.top,
            left:event.pageX - offset.left
        });


        clone.appendTo(body); // добавим клон в body
        var carts = $("#carts > [data-info]").toArray().map(function (cart) {  // описание позиции корзины
            var rect = cart.getBoundingClientRect();
            return{
                node:cart,
                rect:rect
            };
        });


        var prevCart;

        body.on('mousemove.dragProduct',function (event) { // тягаем елемнт по body


            clone.css({ // позиция елемента при движении относительно курсора
                top:event.pageY - offset.top,
                left:event.pageX - offset.left
            });

            if(prevCart){
                $(prevCart.node).removeClass('overlaps');
                prevCart = null;
            }
            var cloneRect = clone.get(0).getBoundingClientRect();

            var cart  = carts.find(function (cart) {

                return overlaps(cart.rect,cloneRect);
            });



            if(cart){
                $(cart.node).addClass('overlaps');
                prevCart = cart;
            }


        });

        body.on('mouseup.dragProduct',function (event) {


               var count = 0;

               for(var i = 0; i< $('[data-info]')[0].children[1].children.length; i++) {
                     count++;
               }

            outer:if(prevCart){
                    for (var j = 0; j < $('[data-info]')[0].children[1].children.length; j++){
                       var res = new RegExp(clone[0].children[0].textContent);
                       if(res.test($('[data-info]')[0].children[1].children[j].children[1].textContent)){
                           $('[data-info]')[0].children[1].children[j].children[3].textContent++;

                           var priceCount =  $('[data-info]')[0].children[1].children;
                           priceCount[j].children[2].textContent;
                           var num1 = Number(priceCount[j].children[2].textContent);
                           var num2 = Number(clone[0].children[2].textContent);
                           priceCount[j].children[2].textContent = num1 + num2;

                           break outer;
                       }
                   }

                    $('<tr data-elemet><td>' + count + '</td>'
                    + '<td>' + clone[0].children[0].textContent + '</td>'
                    + '<td>' + clone[0].children[2].textContent + '</td>'
                    + '<td>' + 1 + '</td>' +'<td><button data-add>Добавить</button></td>'
                    + '<td><button data-delete>Удалить</button></td>' +
                     +  '</tr> ').appendTo('[data-info]');


            }


            (function Delete() {
                $('[data-delete]').click(function (event) {
                 console.log(event);
                 var del = event.delegateTarget.parentElement.parentElement;
                 $(del).remove();


                });
            })();


            (function Add() {
                $('[data-add]').click(function (event) {

                    /*==============================================PRICE=====================================================*/
                    var addNum1 = event.delegateTarget.parentElement.parentElement.cells;
                    var addNum2 = clone[0].children[2].textContent;

                            var newNum1 = Number(addNum1[2].outerText);
                            var newNum2 = Number(addNum2);
                   var result = newNum1 + newNum2;

                    /*===============================================AMOUNT====================================================*/


                     event.delegateTarget.parentElement.parentElement.cells[2].textContent = result;
                     event.delegateTarget.parentElement.parentElement.cells[3].textContent++;
                     CountPrice();

                });
            })();



            (function CountPrice() {

                var  countPrice = 0;
                for(var i = 1; i < $('[data-info]')[0].children[1].children.length; i++){
                    var arr = []; arr.push($('[data-info]')[0].children[1].children[i].children[2].textContent);
                    for(var k = 0; k < arr.length; k++){
                        countPrice+= Number(arr[k]);
                    }
                }
                $('#totalPrice').html('<span>'+ countPrice+'</span>');

            })();


           function CountPrice(){
                var  countPrice = 0;
                for(var i = 1; i < $('[data-info]')[0].children[1].children.length; i++){
                    var arr = []; arr.push($('[data-info]')[0].children[1].children[i].children[2].textContent);
                    for(var k = 0; k < arr.length; k++){
                        countPrice+= Number(arr[k]);
                    }
                }
               $('#totalPrice').html('<span>'+ countPrice  +'</span>');
            };



            clone.remove();
            $('[data-info]').removeClass('overlaps');
            body.off('mousemove.dragProduct');
            body.off('mouseup.dragProduct');
        });
    });

    function overlaps(rect1, rect2) {  /* фукция ищет пересичение елемента с корзиной*/
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom)
    }






})();