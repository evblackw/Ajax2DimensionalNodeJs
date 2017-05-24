/**
 * Created by evblackw on 3/23/2017.
 */
//var bodyParser = require('body-parser');

$(startUp);

var obj = {//obj being sent to the server to update results
    team: 0,
    res:  "",
    opp: 1,
};
function startUp() {
    var tArray = [
        ["x","-","-","-"], //row 0
        ["-","x","-","-"], //row 1
        ["-","-","x","-"], //row 2
        ["-","-","-","x"]  //row 3
    ];


    $("#btnSub").click(function() {
        $('#table').empty();

        obj.team = $('select[name=user1]').val();
        obj.res  = $('select[name=res]').val();
        obj.opp  = $('select[name=user2]').val();

        if(obj.team == obj.opp) {
            alert("Team cant play each other!");
            obj.res = obj.team+": x";
        }
            alert("Team 1: " + obj.team + "  Result:  " + obj.res + "  Opponent: " + obj.opp);

            var request = $.post("/postResult", {changeBy: obj},
                function (dataBack) {

                    alert(dataBack.length);
                    var t = "";
                    for (var i = 0; i < dataBack.length; i++) {
                        for (var j = 0; j < 1; j++) {
                            var c0 = dataBack[i][j];//setting each cell
                            var c1 = dataBack[i][j + 1];
                            var c2 = dataBack[i][j + 2];
                            var c3 = dataBack[i][j + 3];
                            //alert("Databack:  " + c0 + "    " + c1 + "     " + c2);
                            //setting each cell in the 2D Array
                            t = '<div id="dRow" class="divRow">' +
                                '<div class="divCell">'+i.toString()+":" + c0 + '</div> ' +
                                '<div class="divCell">' + c1 + '</div> ' +
                                '<div class="divCell">' + c2 + '</div> ' +
                                '<div class="divCell">' + c3 + '</div> ' +
                                '</div>';

                        }
                        $('#table').append(t); //after set append them row by row

                    }        //console.log(e);
                });

            request.fail(function (jqXHR, textStatus, errorThrown) {
                $("#res").text(jqXHR.responseText);
                alert("request fail");
            });


    });

}
