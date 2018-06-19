// chrome.webRequest.onComplete.addListener(function(request, sender, sendResponse) {
//     console.log("Error Response Detected!");
// }, {urls:["*Error_Queue_*"]});

// Requires "webRequest" permission which is not available to Event Pages

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "formatMessages") {
        console.log("format message message received.");

        $("#msg-wrapper .box tr")
            .filter(function (index, item) {
                return $(item).children("th").text().indexOf("Payload") >= 0
            })
            .children("td")
            .html(function () {
                let unformattedText = $(this).find(".msg-payload").text()
                    .replace(/"\s*{\\/g, '{')
                    .replace(/}\s*"/g, '}')
                    .replace(/\\"/g, '"');

                let obj = JSON.parse(unformattedText);

                let formattedText = syntaxHighlight(obj);

                return '<pre>' + formattedText.replace(/\\r\\n/g, '\n') + '</pre>';
            });
    }

    if (request.action == "downloadAllPayloadsAsJson") {
        let payloadArray = [];

        $("#msg-wrapper .box tr")
            .filter(function (index, item) {
                return $(item).children("th").text().indexOf("Payload") >= 0
            })
            .children("td")
            .each(function () {
                let unformattedText = $(this).find(".msg-payload").text()
                    .replace(/"\s*{\\/g, '{')
                    .replace(/}\s*"/g, '}')
                    .replace(/\\"/g, '"');

                let obj = JSON.parse(unformattedText);                

                payloadArray.push(obj);
            });

        let message = {
            action: "savePayloads",
            payloads: payloadArray
        }        

        chrome.runtime.sendMessage(message);
    }
});

function syntaxHighlight(json) {
    // Thanks to this wizard of a developer:
    // https://stackoverflow.com/a/7220510/1542187
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 4);
    }

    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
};

let message = {
    action: "show"
}

chrome.runtime.sendMessage(message);