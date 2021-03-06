const text = document.getElementById("content");
const copyButton = document.getElementById("copy-ansi");

function format(commandName, commandArgument)
{
    document.execCommand(commandName, false, commandArgument);
    text.focus();
}

function exportToClipboard()
{
    navigator.clipboard.writeText(HTMLtoANSI(text.innerHTML));
    copyButton.innerHTML = "Copied!";
    setTimeout(() => {
        copyButton.innerHTML = "Copy as ANSI";
    }, 2000);
}

function HTMLtoANSI(html)
{
    var text = html;
    text = text.replaceAll("<div>", "");
    text = text.replaceAll("</div>", "\n");
    
    text = text.trim();

    var ANSIargs = [];

    while(text.includes("<"))
    {
        console.log(text);

        var leftIndex = text.indexOf("<");
        var rightIndex;

        var leftmostIndex = leftIndex;

        var tag;
        
        do
        {
            rightIndex = leftIndex + text.substring(leftIndex).indexOf(">");
            tag = text.substring(leftIndex + 1, rightIndex);

            console.log(leftIndex + ", " + rightIndex + ", \"" + tag + "\"");

            if (tag.includes("/")) ANSIargs.pop();
            else
            {
                switch (tag)
                {
                    case "b":
                        ANSIargs.push("1");
                        break;
                    case "u":
                        ANSIargs.push("4");
                        break;
                }
                if (tag.includes("span style=\"c"))
                {
                    var colourTag = tag.substring(tag.indexOf("rgb"), tag.indexOf(")") + 1);
                    var argnum = 29 + textColours.indexOf(colourTag);
                    if (argnum > 29) 
                    {
                        ANSIargs.push(argnum);
                    }
                }
                else if (tag.includes("span style=\"b"))
                {
                    var colourTag = tag.substring(tag.indexOf("rgb"), tag.indexOf(")") + 1);
                    var argnum = 39 + highlightColours.indexOf(colourTag);
                    if (argnum > 39) 
                    {
                        ANSIargs.push(argnum);
                    }
                }
            }
            leftIndex = rightIndex + 1;
        }
        while(leftIndex < text.length && text.charAt(leftIndex) == '<')

        var ANSItag;
        if (ANSIargs.length == 0)
        {
            ANSItag = "\033[0m"
        }
        else
        {
            ANSItag = "\033[0m\033[";
            for (a of ANSIargs)
            {
                ANSItag += a + ";"
            }
            ANSItag = ANSItag.substring(0, ANSItag.length - 1) + "m";
        }
        
        text = text.replace(text.substring(leftmostIndex, leftIndex), ANSItag);
    }

    text = text.replaceAll("&nbsp;", " ");
    text = text.replaceAll("&amp;", "&");
    text = text.replaceAll("&lt;", "<");
    text = text.replaceAll("&gt;", ">");

    text = "```ansi\n" + text + "\n```";

    return text;
}