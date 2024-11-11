import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const collection = await db.collection("users");
  const results = await collection.find({}).toArray();

  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = await db.collection("users");
  const result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/", async (req, res) => {
  try {
    const newDocument = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    };

    const collection = await db.collection("users");
    const result = await collection.insertOne(newDocument);

    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      },
    };

    const collection = await db.collection("users");
    const result = await collection.updateOne(query, updates);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("users");
    const result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
});

export default router;
