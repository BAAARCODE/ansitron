function initPalette(parentID, colours)
{
    var p = document.getElementById(parentID);

    for (var i = 0; i < colours.length; i++)
    {
        console.log("OK");
        var node = document.createElement("DIV");
        node.style.backgroundColor = colours[i];
        node.classList.add("tool");
        p.appendChild(node);
    }
}

initPalette("text-colours", textColours);
initPalette("highlight-colours", highlightColours);
console.log("OK");