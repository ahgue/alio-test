import { Selector } from "testcafe";

export function getDeviceName(deviceName) {
    return Selector('span.device-name').withExactText(deviceName);
}

export function getDeviceType(type) {
    return Selector('span.device-type').withExactText(type);
}

export function getDeviceCapacity(capacity) {
    return Selector('span.device-capacity').withText(capacity)
}

export async function getAllDevices(t) {
    return await t.request('http://localhost:3000/devices');

}

export async function reloadPage(t) {
    await t.wait(2000)
    await t.eval(() => location.reload(true))
    await t.wait(2000);
}

export async function renameFirstDevice(t, name, type, capacity) {
    const devicesList = await getAllDevices(t);
    const firstDevice = await devicesList.body[0];
    const updateDevice = await t.request.put({
        url: `http://localhost:3000/devices/${firstDevice.id}`,
        body: {
            "id": firstDevice.id,
            "system_name": name,
            "type": type,
            "hdd_capacity": capacity
        },
        headers:{
            "Content-Type": "application/json"
        }
    });
    await t.expect(updateDevice.status).eql(200);
    await reloadPage(t);
}

export async function deleteLastDevice(t) {
    const devicesList = await getAllDevices(t);
    const lastDevice = await devicesList.body;
    const lastIndex = lastDevice[lastDevice.length - 1];
    const deleteDevice = await t.request.delete({
        url: `http://localhost:3000/devices/${lastIndex.id}`
    })
    await t.expect(deleteDevice.status).eql(200);
    await reloadPage(t);
    return lastIndex;
}