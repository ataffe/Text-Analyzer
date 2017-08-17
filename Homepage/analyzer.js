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

readText = function (text) {
    mainText = text;
};

//create a node class to hold each letter
function Node() {
    this.isLeaf = false;
    this.children = new Array(26);
    this.frequency = 0;
    for(var i = 0; i < 26; i++){
        this.children[i] = null;
    }
}

function clearNode(node) {
    node.isLeaf = false;
    node.frequency = 0;
    for(var i = 0; i < 26; i++){
        node.children[i] = null;
    }
}


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
            console.log(word + " frequency: " + vertex.frequency);
        }else{
            console.log("found " + word + " with frequency: " + vertex.frequency + " but did not increment frequency");
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
 * Function that reads the words in from the input text box.
 */
function readWords() {
    readText(document.getElementById("inBox").value);

    if(mainText !== savedText){
        trieMade = false;
        clearNode(root);
        console.log("saved text is different from main text");
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

        for (var j = 0; j < longestWords.length; j++) {
            longestWordString += longestWords[j] + "<br/>";
        }
    }
}



