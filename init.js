function initPalette(parentID, command, colours)
{
    var p = document.getElementById(parentID);

    for (var i = 0; i < colours.length; i++)
    {
        const colour = colours[i];
        const node = document.createElement("DIV");
        node.style.backgroundColor = colour;
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