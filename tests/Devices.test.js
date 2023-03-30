import { HomePage } from "../pages/HomePage";
import { AddDevicePage } from "../pages/AddDevicePage";
import { getAllDevices, renameFirstDevice, deleteLastDevice } from "../utils";

const homePage = new HomePage();
const addDevicePage = new AddDevicePage();

fixture `Testing devices`
    .page('http://localhost:3001/')

/**Test 1 (required)
 * Make an API call to retrieve the list of devices.
 * Use the list of devices to check the elements are visible in the DOM. Check the name, type and capacity of each element of the list using the class names and make sure they are correctly displayed.
 * Verify that all devices contain the edit and delete buttons.
 */
test('first test', async t =>{
    const devicesList = await getAllDevices(t)
    for (const device of devicesList.body) {
        // next method has all assertions inside (name, type, capacity, and both buttons)
        await homePage.isElementVisible(t, device.system_name, device.type, device.hdd_capacity);
    }
});

/**
 * Test 2 (required)
 * Verify that devices can be created properly using the UI.
 * Verify the new device is now visible. Check name, type and capacity are visible and correctly displayed to the user.
 */
test('second test', async t => {
    await homePage.clickAddDevice(t);
    await addDevicePage.createDevice(t, 'New_Test_Device', '19');
    homePage.isElementVisible(t, 'New_Test_Device', 'WINDOWS WORKSTATION', '19');
});

/**
 * Test 3 (required)
 * Make an API call that renames the first device of the list to “Rename Device”.
 * Reload the page and verify the modified device has the new name.
 */
test('third test', async t => {
    await renameFirstDevice(t, "testing_update", "MAC", "15");
    await homePage.isElementVisible(t, 'testing_update', 'MAC', '15');
});

/**Test 4 (required)
 * Make an API call that deletes the last element of the list.
 * Reload the page and verify the element is no longer visible and it doesn’t exist in the DOM.
 */
test('fourth test', async t => {
    const lastDevice = await deleteLastDevice(t);
    await t.expect(await homePage.isElementPresent(lastDevice.id)).eql(false)
});
