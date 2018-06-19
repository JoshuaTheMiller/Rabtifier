$(function () {
    $("#formatMessagesButton").click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let message = {
                action: "formatMessages"
            }

            chrome.tabs.sendMessage(tabs[0].id, message);
        })
    });

    $("#downloadAllPayloadsAsJsonButton").click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let message = {
                action: "downloadAllPayloadsAsJson"
            }

            chrome.tabs.sendMessage(tabs[0].id, message);
        })
    });
});