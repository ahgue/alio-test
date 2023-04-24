import { Selector } from "testcafe";

export class AddDevicePage{
    constructor() {
        this.systemName = Selector('input#system_name');
        this.hddCapacity = Selector('input#hdd_capacity');
        this.submittButton = Selector('button.submitButton');
        this.typeDropdown = Selector('select#type');
        this.typeOptions = this.typeDropdown.find('option');
    }

    async createDevice(t, deviceName, deviceType, deviceCapacity) {
        await t
            .typeText(this.systemName, deviceName)
            .click(this.typeDropdown)
            .click(this.typeOptions.withExactText(deviceType))
            .typeText(this.hddCapacity, deviceCapacity)
            .click(this.submittButton);
    }
}