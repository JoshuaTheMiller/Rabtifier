import * as tm from './tabManipulation';
import * as $ from 'jquery';

let downloadUrl = "";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "show") {
        console.log("Message received.")

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let getTabIdResponse = tm.getTabId(tabs[0]);

            if (getTabIdResponse.IsValid) {
                chrome.pageAction.show(getTabIdResponse.Id);                
            }
        });
    }

    if (request.action == "savePayloads") {
        console.log("Payload message received.")

        console.log(request.payloads);

        console.log(Array.isArray(request.payloads));

        let objectsAsStringArray = [];

        for (let i = 0; i < request.payloads.length; i++) {
            objectsAsStringArray.push(JSON.stringify(request.payloads[i], undefined, 4));
        }

        let blob = new Blob([objectsAsStringArray], { type: "application/json" });

        // make sure to call URL.revokeObjectURL() when the download is complete
        downloadUrl = URL.createObjectURL(blob);

        let currentDateTime = Date.now();

        chrome.downloads.download({ url: downloadUrl, filename: "rabbitMQErrorPayload_" + currentDateTime + ".json" });
    }
});

chrome.downloads.onChanged.addListener(function (downloadData) {
    if (downloadData.state == null || undefined) {
        return;
    }

    if (downloadData.state.current == "complete") {
        console.log("Download complete! Releasing URL: " + downloadUrl.toString());
        URL.revokeObjectURL(downloadUrl);
    }
})