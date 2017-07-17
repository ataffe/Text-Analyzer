/**
 * Created by Alexxx on 7/12/2017.
 */
var Analyzer = {
    var numWords = 0;
    var mainText = "test";
    var words = new Array("");
    var topWords = new Array("");

    print = function(text){
        this.mainText = mainText + text;
        document.getElementById("resBox").value += this.mainText;
    }
}
