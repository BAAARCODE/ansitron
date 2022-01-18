const text = document.getElementById("content");

function format(commandName, commandArgument)
{
    document.execCommand(commandName, false, commandArgument);
    text.focus();
}

function exportToClipboard()
{
    navigator.clipboard.writeText(text.innerHTML);
}