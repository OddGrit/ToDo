var clicked = false;

function itemClicked(itemClicked){
    var item = itemClicked;
    
    //alert(document.getElementById("l1").textContent);
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
    var text = document.getElementById("input").value;
    $("#list").append('<li onclick="itemClicked(this)" class="listItem">' + text + '</li>');
    items.push(text);
    document.getElementById("input").value = "";

}

function removeItems()
{
     // alert(items);
//    var itemList = document.getElementsByClassName("listItem");
//    for (i = 0; i < itemList.length; ++i){
//        if (itemList[n].hasClass('clicked')){
//            alert("boo");
//            itemList[n].removeChild();
//        }
//    }
    $("#list").children('li').each(function(){
        
        if (this.classList.contains('clicked')){
            removeItem =  $(this).text();
             items.splice( $.inArray(removeItem, items), 1 );
            $(this).remove(); 
        }
         
    });
    
}

//___________________________________________________________________________--
//Pelle kod

var items = ["äta","sova","handla"];
var removeItem =""

$( document ).ready(function() {
   $('#list li').each(function (i) {
    $(this).append(items[i]);
});
});

//______________________________________________________________________________-