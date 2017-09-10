/*
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
*/

/**
 * This function jumps to the about page.
 */
goToAbout = function () {
        window.location.href = "About.html";
    };


var numWords = 0;
var mainText = "";
var numCharacters = 0;
var wordsRead = false;
var longestWordString = "";
var trieMade = false;
var savedText = "";
var definition = "";

/**
 * this function reads the text from input box and stores it
 * @param text
 */
readText = function (text) {
    mainText = text;
};

/**
 * This function makes a RESTful call to the pearson dictionary and get the definition of the input word
 *
 */
function getDefinition(word){
    var xhttp = new XMLHttpRequest();
    var url = "http://api.pearson.com/v2/dictionaries/lasde/entries?headword=" + word.toLowerCase();
    console.log(url);
    xhttp.onreadystatechange=function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            var definitionRaw = JSON.parse(xhttp.responseText);
            var part_of_speech = definitionRaw.results[0].part_of_speech;
            definition = definitionRaw.results[0].senses[0].definition[0];
            longestWordString += word.charAt(0).toUpperCase() + word.slice(1) + " (" + part_of_speech + ") - " + definition + "<br/><br/>";
            document.getElementById("resTable").rows[2].cells[1].innerHTML = longestWordString;

        }
    };
    xhttp.open("GET",url, true);
    xhttp.send();
}

/**
 * The node class that is used to make the trie
 * @constructor
 */
function Node() {
    this.isLeaf = false;
    this.children = new Array(26);
    this.frequency = 0;
    for(var i = 0; i < 26; i++){
        this.children[i] = null;
    }
}

/**
 * clears the data in a node
 * @param node the node whose data will be cleared.
 */
function clearNode(node) {
    node.isLeaf = false;
    node.frequency = 0;
    for(var i = 0; i < 26; i++){
        node.children[i] = null;
    }
}

/**
 * This function adds a word to the trie.
 * @param vertex the root of the trie.
 * @param word the word that will be added
 * @returns {number} returns 0 if the function was successful, and -1 if not successfully added.
 */
function addWord(vertex, word){

    for(var i = 0 ; i < word.length; i++){
        var index = word.charCodeAt(i);

        if(index < 65 || index > 122 || (index > 90 && index < 97)){
            console.log("got a bad character");
            return -1;
        }else{
            if(index >= 65 && index <= 90){
                index = index - 65;
            }else{
                index = index - 97;
            }
        }


        if(vertex.children[index] === null){
            vertex.children[index] = new Node();
            vertex = vertex.children[index];
        }
    }
    vertex.isLeaf = true;
    vertex.frequency++;
    return 0;
}

/**
 * Function to search for a word in the trie, it has the option to add to the frequency if it is found.
 * @param vertex the root of the trie.
 * @param word the word to search for.
 * @param add a boolean to indicate if the word is found to add to the frequency of the word in the trie.
 * @returns {*} returns true if the word is found and false if not.
 */
function search(vertex, word, add) {

    for(var i = 0; i < word.length; i++) {
        var index = word.charCodeAt(i);
        if(index < 65 || index > 122 || (index > 90 && index < 97)){
            return -1;
        }else{
            if(index >= 65 && index <= 90){
                index = index - 65;
            }else{
                index = index - 97;
            }
        }

        if(vertex === undefined || vertex === null || vertex.children[index] === undefined || vertex.children[index] === null){
            return false;
        }

        vertex = vertex.children[index];
    }

    if(vertex !== undefined && vertex !== null && vertex.isLeaf){
        if(add === true) {
            vertex.frequency++;
        }

        return true;
    }else{
        return false;
    }

}

/**
 * Function that removes puncuation or any character that is not alphanumeric.
 * @param word The word to be cleaned.
 * @returns {*} the cleaned word.
 */
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

//The root of the trie.
root = new Node();

/**
 * Function that reads the words in from the input text box. I need to break this up into more function it's getting a bit
 * huge.
 */
function readWords() {
    readText(document.getElementById("inBox").value);

    if(mainText !== savedText){
        trieMade = false;
        clearNode(root);
        //console.log("saved text is different from main text");
    }


    var longestWords = [];
    numWords = 0;
    numCharacters = 0;
    longestWordString = "";

    var tmpWords = mainText.match(/\S+/g);
    numCharacters = mainText.split("").length;

    if(tmpWords !== null) {
        for (var i = 0; i < tmpWords.length; i++) {
            var word = cleanWord(tmpWords[i]);

            //Find the longest word
            if (i === 0) {
                longestWords[0] = word;
            } else {
                if (word.length > longestWords[0].length) {
                    longestWords = [];
                    longestWords.push(word);
                } else if (word.length === longestWords[0].length) {
                    longestWords.push(word);
                }
            }

                var found = false;
                if(!trieMade){
                    found = search(this.root, word, true);
                }else {
                    found = search(this.root, word, false);
                }

                //add word to trie
                if (found) {
                    numWords++;
                } else {
                    if (addWord(this.root, word) === 0) {
                        numWords++;
                    }
                }
        }
        if (numWords > 0) {
            wordsRead = true;
            trieMade = true;
            savedText = mainText;
        }

        //This get all the longest words if there are multiple words
        for (var j = 0; j < longestWords.length; j++) {
            getDefinition(longestWords[j]);
        }

    }
}



