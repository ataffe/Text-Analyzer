/**
 * Created by Alexxx on 7/12/2017.
 ***/

<script>

    var Analyzer() = {
        var numWords = 0;
        var mainText = "This is a test";
        var words = new Array("none");
        var topWords = new Array("none");

        readText = function (text) {
            this.mainText = text;
        };

        getWords = function () {
            return words;
        }

        toString = function () {
            var returnString = "Text statistics\n\n"
             + "----------------------------------------------"
             + "----------------------------------------------\n\n"
             + "Number of Words: " + numWords + "\n";
            document.getElementById("")
        }

        countWords = function () {
            var num_words = 0;
            var regex = /\n|\s{2,}/g;
            var words = mainText.split(regex)
            var list = [];

            for(var i = 0; i < words.length; i++){
                var letters = words[i].split("");

                if(letters.length != 0){
                    list.push(words[i]);
                }
            }

            words = letters.join();
            num_words = words.length;
            return num_words;
        }
    }

    test = function() {
        mainText = mainText + "Alex";
        document.getElementById("resBox").value += mainText.textContent || mainText.innerText;
    }

</script>