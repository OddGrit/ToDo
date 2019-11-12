/*eslint-env browser*/
/*global $, jQuery, alert*/

var clicked = false;
var items = [[], []];
var removeItem = "";

function update() {                                         // uppdaterar, array det som sparas i localstorage
    "use strict";
    items.length = 0;
    $("#list").children('li').each(function () {
        if (this.classList.contains('clicked')) {
            items.push([$(this).text(), true]);
        } else {
            items.push([$(this).text(), false]);
        }
    });
    localStorage.setItem("array", JSON.stringify(items));
}
function itemClicked(itemClicked) {                      //Kollar om element är markerat, annars markerar
    "use strict";
    var item = itemClicked;
    
    if (clicked) {
        itemClicked.classList.remove('clicked');
        clicked = !clicked;
    } else {
        itemClicked.classList.add('clicked');
        clicked = !clicked;
    }
    update();
}

function addItem() {
    "use strict";
    $("li").each(function (index) {                                     //Kollar efter dubbletter
        if ($(this).text() === document.getElementById("input").value) {
            alert('Du håller på att lägga till en dublett!');
            document.getElementById("input").value = "";
            return false;
        }
    });
    if (document.getElementById("input").value < 1) {             //Kollar att man fyller i någonting
        return false;
    } else {
        var text = document.getElementById("input").value;
        $("#list").append('<li ondblclick="itemClicked(this)" class="listItem">' + text + '</li>');        //Lägger till nytt element i listan
        items.push([text, false]);                           // lägger till nytt element i array 
        document.getElementById("input").value = "";
        document.getElementById("input").focus();
        update();
    }
}

function removeItems() {                                  //plockar bort ifrån listan
    "use strict";
    $("#list").children('li').each(function () {
        
        if (this.classList.contains('clicked')) {
            removeItem =  $(this).text();
            items.splice($.inArray(removeItem, items), 1);               //Plockar bort ifrån array
            $(this).remove();
            document.getElementById("input").focus();                    //plockar bort ifrån själva listan
            update();
        }
    });
}
$(document).ready(function () {                           // Gör knappar större
    "use strict";
    $("button").hover(function () {
        $(this).animate({padding: "2px 20px"}, 1000);
    }, function () {
        $(this).animate({padding: "2px 10px"}, 1000);
    });
});

$(document).ready(function () {                               //Läser in ev sparad lista sedan tidigare
    "use strict";
    items =  JSON.parse(localStorage.getItem("array"));
    items.forEach(function (el) {
        if (el[1] === true) {
            $("#list").append('<li ondblclick="itemClicked(this)" class="clicked">' + el[0] + '</li>');
        } else {
            $("#list").append('<li ondblclick="itemClicked(this)" class="listItem">' + el[0] + '</li>');
        }
    });
    document.getElementById("input").focus();
});
    
$(function () {                                 //sorterar lista och uppdaterar ordningen
    "use strict";
    $('#list').sortable({
        revert    : true,
        connectWith  : ".sortable",
        stop     : function (event, ui) {
            update();
        }
    });
});
    
$(document).on('keypress', function (e) {                                      //Lyssnar efter enter
    "use strict";
    if (e.which === 13) {
        addItem();
    }
});