import { Selector } from "testcafe";

export function getDeviceName(deviceName) {
    return Selector('span.device-name').withExactText(deviceName);
}

export async function getAllDevices(t) {
    const devicesList = await t.request(`${process.env.API_URL}/devices`);
    await t.expect(devicesList.status).eql(200, 'Devices call failed')
    return devicesList
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
        url: `${process.env.API_URL}/devices/${firstDevice.id}`,
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
        url: `${process.env.API_URL}/devices/${lastIndex.id}`
    })
    await t.expect(deleteDevice.status).eql(200);
    await reloadPage(t);
    return lastIndex;
}

export function getTimeStamp() {
    return Date.now().toString();
}

export function getRandomType() {
    const deviceTypes = ['WINDOWS WORKSTATION', 'MAC', 'WINDOWS SERVER']
    const random = Math.floor(Math.random() * deviceTypes.length);
    return deviceTypes[random]
}

export function getRandomCapacity() {
    return Math.floor((Math.random() * 100) + 1).toString();
}
