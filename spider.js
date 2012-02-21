$(function () {
    var values = [0.3,0.5,0.1,0.9,0.3,0.2,0.4],
        labels = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o'];
    $("tr").each(function () {
        values.push(parseInt($("td", this).text(), 10));
        labels.push($("th", this).text());
    });
    var width = 300;
    var height = 300;
    var r = 120
    var repeat = 9;
    var container = $("#container");
    for (var j = 0; j < repeat ; j++)
    {
        var l = Math.floor(Math.random()*11)+4;
        for (var k = 0; k < l ; k++)
        {
            values[k]= Math.random();
        }


        var holderId = "holder" + j;
        container.append('<div id="'+ holderId +'" class="holder"></div>')
        var paper = Raphael(holderId, height, width),
            angle = Math.PI * 2 / l,
            cx = height/2,
            cy = width/2,
            ms = 1000;

        function process (i){
            var value1 = values[i];
            var value2 = values[(i+1)%l];

            var xAxis = cx + Math.cos(i * angle) * r;
            var yAxis = cy + Math.sin(i * angle) * r;
            var xLabel = cx + Math.cos(i * angle) * r * 1.1;
            var yLabel = cy + Math.sin(i * angle) * r * 1.1;
            paper.path(["M", cx, cy, "L", xAxis, yAxis,  "z"]).attr({stroke:"#fff", fill:color});

            var x1 = cx + Math.cos(i * angle) * value1 * r;
            var y1 = cy + Math.sin(i * angle) * value1 * r;
            var x2 = cx + Math.cos((i+1) * angle) * value2 * r;
            var y2 = cy + Math.sin((i+1) * angle) * value2 * r;
            var xCenter =  (x1 + x2 - width) / 3 + cx;
            var yCenter = (y1 + y2 - height ) / 3 + cy;
            var color = Raphael.hsb(i* (1/l), .75, 1);

            var p = paper.path(["M", cx, cy, "L", x1, y1, "Q", xCenter, yCenter, x2, y2, "z"]).attr({stroke:"#fff", fill:color});
            var txt = paper.text(xLabel, yLabel, labels[i]).attr({fill: "#fff",stroke:"#fff",  "font-size": 20});
            p.mouseover(function () {
                            p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                            //txt.stop().animate({opacity: 1}, ms, "elastic");
                        }).mouseout(function () {
                            p.stop().animate({transform: ""}, ms, "elastic");
                            //txt.stop().animate({opacity: 0}, ms);
                        });
        }
        for (var i = 0; i < l; i++)
        {
            process(i);
        }
    }
});
