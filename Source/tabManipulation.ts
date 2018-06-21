import * as $ from 'jquery';

export function getTabId(tab: chrome.tabs.Tab): GetIdResponse {
    if (tab != (null || undefined) && tab.id != (null || undefined)) {
        return new GetIdResponse(tab.id, true);
    }

    return new GetIdResponse(-1, false);
}

export class GetIdResponse {
    Id: number;
    IsValid: boolean;

    constructor(id: number, isValid: boolean) {
        this.Id = id;
        this.IsValid = isValid;
    }
}