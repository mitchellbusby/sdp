$(document).ready(function(){
    $(window).on("load",function(){
        showActs();
        showBtn();
        window.onscroll = function(){
            if (isBottom()) {
                $("#button").remove();
                var spinner = $("<div>").attr("id","spinner").appendTo($("#container"));
                Spinners.create("#spinner",{
                    radius:30,
                    height:10,
                    width:2.5,
                    dashes:30,
                    opacity:1,
                    padding:3,
                    rotation:700,
                    color:"#000000"
                }).play();
                showActs();
                spinner.remove();
                showBtn();
            }
        };
    });
});

function showActs(){
    var dataImg = {"data":[{"src":"1.png"},{"src":"1.png"},{"src":"1.png"},{"src":"1.png"},{"src":"1.png"}]};
    $.each(dataImg.data, function(index,value){
        var row = $("<div>").addClass("row").appendTo($("#container"));
        var c1 = $("<div>").addClass("medium-3 columns").appendTo(row);
        var c2 = $("<div>").addClass("medium-9 columns").appendTo(row);
        $("<img>").attr("src","./test_data/" + $(value).attr("src")).appendTo(c2);
        var c3 = $("<div>").addClass("medium-3 columns").appendTo(row);
    });
    //showBtn();
}

function isBottom(){
    var row = $(".row");
    var lastRowHeight = row.last().get(0).offsetTop + Math.floor(row.last().height() + row.last().height()/24);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    return lastRowHeight < (documentHeight + scrollHeight);
}

function showBtn(){
    var row = $("<div>").addClass("row").appendTo($("#container"));
    var c1 = $("<div>").addClass("medium-3 columns").appendTo(row);
    var c2 = $("<div>").addClass("medium-9 columns").appendTo(row);
    var btn = $("<button>").addClass("btn").text("View More");
    btn.attr("id","button").appendTo(c2);
    var c3 = $("<div>").addClass("medium-3 columns").appendTo(row);
    $("#button").on("click",function(){
        $("#button").remove();
        var spinner = $("<div>").attr("id","spinner").appendTo(c2);
        Spinners.create("#spinner",{
            radius:30,
            height:10,
            width:2.5,
            dashes:30,
            opacity:1,
            padding:3,
            rotation:700,
            color:"#000000"
        }).play();
        //spinner.center();
        //alert("stop");
        showActs();
        spinner.remove();
        showBtn();
    });
}

