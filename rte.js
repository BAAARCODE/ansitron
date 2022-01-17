const text = document.getElementById("content");

function format(commandName, commandArgument)
{
    document.execCommand(commandName, false, commandArgument);
    content.focus();
}