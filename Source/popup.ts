import * as tm from './tabManipulation';
import * as $ from 'jquery';

$(function () {
    $("#formatMessagesButton").click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let message = {
                action: "formatMessages"
            }

            let getTabIdResponse = tm.getTabId(tabs[0]);

            if (getTabIdResponse.IsValid) {
                chrome.tabs.sendMessage(getTabIdResponse.Id, message);
            }
        })
    });

    $("#downloadAllPayloadsAsJsonButton").click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let message = {
                action: "downloadAllPayloadsAsJson"
            }

            let getTabIdResponse = tm.getTabId(tabs[0]);

            if (getTabIdResponse.IsValid) {
                chrome.tabs.sendMessage(getTabIdResponse.Id, message);
            }
        })
    });
});