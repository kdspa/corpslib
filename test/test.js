const CorpsLib = require('../dist/DCI');

const c = new CorpsLib.DCIClient();

async function test(name) {
    const res = await c.getEvent(name);
    return res;
}

test('2024-drums-along-the-rockies');