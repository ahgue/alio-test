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
        const deviceType = getDeviceType(type);
        const deviceCapacity = getDeviceCapacity(capacity);
        const deviceOptions = webElement.parent(1);
        await t
            .expect(webElement.exists).eql(true)
            .expect(deviceType.exists).eql(true)
            .expect(deviceCapacity.exists).eql(true)
            // right here I'm reviewing that every single row/device has it's own edit and remove buttons
            .expect(deviceOptions.find('a.device-edit').exists).ok()
            .expect(deviceOptions.find('button.device-remove').exists).ok()
    }

    async clickAddDevice(t) {
        await t.
            click(this.addDeviceButton)
    }

    async isElementPresent(element) {
        return await Selector(`a[href="/devices/edit/${element}"]`).exists
        
    }
}
