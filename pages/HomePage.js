import { Selector } from "testcafe";
import { getDeviceCapacity, getDeviceName, getDeviceType } from "../utils";

export class HomePage {
    constructor() {
        this.addDeviceButton = Selector('a.submitButton');
    }
    
    async isElementVisible(t, deviceName, type, capacity) {
        /**
         * I'm creating 3 different webElements to assert name, type and capacity are right
         */
        const webElement = getDeviceName(deviceName);
        const infoRow = webElement.parent(0)
        const deviceType = infoRow.find('span.device-type').withExactText(type);
        const deviceCapacity = infoRow.find('span.device-capacity').withText(capacity)
        const deviceOptions = webElement.parent(1);
        await t
            .expect(webElement.visible).eql(true, 'Device name error')
            .expect(deviceType.visible).eql(true, 'Device type error')
            .expect(deviceCapacity.visible).eql(true, 'Device capacity error')
            // right here I'm reviewing that every single row/device has it's own edit and remove buttons
            .expect(deviceOptions.find('a.device-edit').visible).eql(true, 'Edit button error')
            .expect(deviceOptions.find('button.device-remove').visible).eql(true, 'Remove button error')
    }

    async clickAddDevice(t) {
        await t.
            click(this.addDeviceButton)
    }

    async isElementPresent(element) {
        return await Selector(`a[href="/devices/edit/${element}"]`).visible
        
    }
}
