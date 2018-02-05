import { Router } from "express";

const api = db => {
  const router = Router();

  router.post("/list", (req, res) => {
    const { listId, listTitle, boardId } = req.body;
    db
      .collection("boards")
      .updateOne(
        { _id: boardId },
        { $push: { lists: { _id: listId, title: listTitle, cards: [] } } }
      )
      .then(result => res.send(result));
  });

  router.post("/card", (req, res) => {
    const { cardTitle, cardId, listId, boardId } = req.body;
    db
      .collection("boards")
      .updateOne(
        { _id: boardId, "lists._id": listId },
        { $push: { "lists.$.cards": { _id: cardId, title: cardTitle } } }
      )
      .then(result => res.send(result));
  });

  router.put("/card", (req, res) => {
    const { cardTitle, cardIndex, listId, boardId } = req.body;
    const field = `lists.$.cards.${cardIndex}.title`;
    db
      .collection("boards")
      .updateOne(
        { _id: boardId, "lists._id": listId },
        { $set: { [field]: cardTitle } }
      )
      .then(result => res.send(result));
  });

  return router;
};

export default api;