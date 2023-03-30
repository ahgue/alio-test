import { Selector } from "testcafe";

export class AddDevicePage{
    constructor() {
        this.systemName = Selector('input#system_name');
        this.hddCapacity = Selector('input#hdd_capacity');
        this.submittButton = Selector('button.submitButton');
    }

    async createDevice(t, ) {
        await t
            .typeText(this.systemName, 'New_Test_Device')
            .typeText(this.hddCapacity, '19')
            .click(this.submittButton);
    }
}