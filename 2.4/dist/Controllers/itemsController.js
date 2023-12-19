"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.editItem = exports.addItem = exports.getItems = void 0;
const mongoDBcontroller_1 = require("./mongoDBcontroller");
async function getItems(req, res) {
    let user = req.session.userLogin;
    if (user) {
        try {
            // Obtain of the user from DB.
            let userInDB = await (0, mongoDBcontroller_1.getUser)(user);
            res.json({ items: userInDB.items });
        }
        catch (err) {
            res.status(500).send({ "error": `${err.message}` });
        }
    }
    else {
        res.status(403).send({ error: 'forbidden' });
    }
}
exports.getItems = getItems;
async function addItem(req, res) {
    try {
        let user = req.session.userLogin;
        if (user) {
            let todoCount = await (0, mongoDBcontroller_1.addItemInDB)(user, req.body.text);
            // Retrieves a response to frontend client.
            res.json({ id: todoCount });
        }
        else {
            res.status(401).send('Not found');
        }
    }
    catch (err) {
        res.status(500).send({ "error ": `${err.message}` });
    }
}
exports.addItem = addItem;
async function editItem(req, res) {
    let itemID = req.body.id;
    let newItem = req.body;
    let username = req.session.userLogin;
    try {
        await (0, mongoDBcontroller_1.editItemInDB)(username, itemID, newItem.text, newItem.checked);
        res.json({ ok: true });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
}
exports.editItem = editItem;
async function deleteItem(req, res) {
    let itemID = req.body.id;
    let username = req.session.userLogin;
    try {
        await (0, mongoDBcontroller_1.deleteItemInDB)(username, itemID);
        res.json({ ok: true });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
}
exports.deleteItem = deleteItem;
