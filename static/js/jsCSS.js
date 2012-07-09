$(function()
{
    $("#main_nav li").click(function()
    {
        window.location=$(this).find("a").attr("href");
        return false;
	});
    
    //------------------------------------------------------------//
    //               Footer Adjustment for Justin                 //
    //------------------------------------------------------------//
    
    var resolution = $(window).height();
    
    var footer = $("#footer");
    var footerMargin = parseInt($(footer).css('marginTop'),10);
    var contentHeight= $("#content").outerHeight() +
                       $("#header").outerHeight() +
                       $(footer).outerHeight()+
                       parseInt($("#content").css('marginTop'),10);                           
    
    if( contentHeight < resolution )
    {
        footerMargin += (resolution - contentHeight);
        footerMargin = parseInt(footerMargin, 10);        
        $(footer).css('marginTop', footerMargin + "px");        
    }
	
});