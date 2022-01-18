function initPalette(parentID, command, colours)
{
    var p = document.getElementById(parentID);

    for (var i = 0; i < colours.length; i++)
    {
        const colour = colours[i];
        const node = document.createElement("DIV");
        node.style.backgroundColor = colour;
        if (colour == "rgb(47, 49, 54)") // "Default" highlight with low contrast
        {
            node.style.boxShadow = "0px 0px 0px 2px #202225 inset";
        } 
        node.classList.add("tool");

        node.onclick = function()
        {
            format('styleWithCSS', true);
            format(command, node.style.backgroundColor);
            format('styleWithCSS', false);
            console.log(node.style.backgroundColor);
        }

        p.appendChild(node);
    }
}

initPalette("text-colours", "foreColor", textColours);
initPalette("highlight-colours", "hiliteColor", highlightColours);