var inputFiles;
var readFile = function () {
    var fileInput = document.querySelector("#fileInput");
    var files = fileInput.files;

    var f1 = files.length;
    var i = 0;
    var output = document.getElementById("resBox");
    while (i < f1) {
        inputFiles = files[i];
        output.value += inputFiles.name;
        i++;
    }
};



goToAbout = function () {
        window.location.href = "About.html";
    };


var numWords = 0;
var mainText = "";
var numCharacters = 0;
var wordsRead = false;
var longestWordString = "";

readText = function (text) {
    mainText = text;
};

//create a node class to hold each letter
function Node() {
    this.isLeaf = false;
    this.name = "test mark";
    this.children = new Array(26);

    for(var i = 0; i < 26; i++){
        this.children[i] = null;
    }
}


function addWord(vertex, word){

    for(var i = 0 ; i < word.length; i++){
        var index = word.charCodeAt(i);

        if(index < 65 || index > 122 || (index > 90 && index < 97)){
            console.log("got a bad character");
            return -1;
        }else{
            index = index - 97;
        }

        if(vertex.children[index] === null){
            vertex.children[index] = new Node();
        }
    }
    vertex.isLeaf = true;
    return 0;
}


function search(vertex, word) {

    for(var i = 0; i < word.length; i++){
        var index = word.charCodeAt(i);

        if(index < 65 || index > 122 || (index > 90 && index < 97)){
            return -1;
        }else{
            index = index - 97;
        }

        if(vertex === undefined || vertex === null || vertex.children[i] === null){
            return false;
        }

        vertex = vertex.children[index];
    }
    return(vertex !== undefined && vertex !== null && vertex.isLeaf);
}

function cleanWord (word) {
    for(var i = 0 ; i < word.length; i++){
        var char = word.charCodeAt(i);
        if(char < 65 || char > 122 || (char > 90 && char < 97)){
            char = String.fromCharCode(char);
            var bottom = word.substring(0,i);
            var top = word.substring(i+1,word.length);
            word = bottom + top;
        }
    }
    return word;
}

root = new Node();

function readWords() {
    readText(document.getElementById("inBox").value);

    var longestWords = [];
    numWords = 0;
    numCharacters = 0;
    longestWordString = "";

    var tmpWords = mainText.match(/\S+/g);
    numCharacters = mainText.split("").length;


    for(var i = 0; i < tmpWords.length; i++){
        var word = cleanWord(tmpWords[i]);

        //Find the longest word
        if(i === 0){
            longestWords[0] = word;
        }else{
            if(word.length > longestWords[0].length){
                longestWords = [];
                longestWords.push(word);
            }else if(word.length === longestWords[0].length){
                longestWords.push(word);
            }
        }


        //add word to trie
        if(search(this.root,word)){
            numWords++;
        }else{
            if(addWord(this.root,word) === 0){
                numWords++;
            }
        }
    }
    if(numWords > 0){
        wordsRead = true;
    }

    for(var i = 0; i < longestWords.length; i++){
        longestWordString += longestWords[i] + "<br/>";
    }

}



