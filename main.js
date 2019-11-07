var clicked = false;
var items = [""];
var removeItem =""

function itemClicked(itemClicked){                      //Kollar om element är markerat, annars markerar
    var item = itemClicked;
    
    if (clicked) {
        itemClicked.classList.remove('clicked');
        clicked = !clicked;
    } else {
        itemClicked.classList.add('clicked');
        clicked = !clicked;
    }
}

function addItem()
{

   $( "li" ).each(function( index ) {                                                                                                      //Kollar efter dubbletter
             if ($( this ).text()==document.getElementById("input").value) {
               alert('Du håller på att lägga till en dublett!');
               document.getElementById("input").value ="";
               return false;
             } 
               }); 
    if (document.getElementById("input").value<1) {                                                                    //Kollar att man fyller i någonting
       return false;
    }   else{

          var text = document.getElementById("input").value;
            $("#list").append('<li onclick="itemClicked(this)" class="listItem">' + text + '</li>');        //Lägger till nytt element i listan
            items.push(text);                                                                                                                             // lägger till nytt element i array 
            document.getElementById("input").value = "";
            document.getElementById("input").focus();
            save(); 

      }
    }

function removeItems()                                  //plockar bort ifrån listan
{
    $("#list").children('li').each(function(){
        
        if (this.classList.contains('clicked')){
            removeItem =  $(this).text();
             items.splice( $.inArray(removeItem, items), 1 );               //Plockar bort ifrån array
            $(this).remove();  
            document.getElementById("input").focus();                                                                     //plockar bort ifrån själva listan
            save();
        }
         
    });
}
$(document).ready(function(){                           // Gör knappar större
    $("button").hover(function(){
        $(this).animate({padding: "2px 20px"}, 1000);
    }, function(){
        $(this).animate({padding: "2px 10px"}, 1000);
    });
});

 $( document ).ready(function() {                               //Läser in ev sparad lista sedan tidigare
    items =  JSON.parse(localStorage.getItem("array"));
     items.forEach(function(el){
        $("#list").append('<li onclick="itemClicked(this)" class="listItem">'+el+'</li>');
    } );
     document.getElementById("input").focus();
});
    
$(function  () {                                    //Gör listan Sorterbar
  $("#list").sortable();
});

function save(){                                // sparar listan i locastorage
localStorage.setItem("array", JSON.stringify(items));
};

 $(document).on('keypress',function(e) {                                                    //Lyssnar efter enter
    if(e.which == 13) {
        addItem();
    }
});