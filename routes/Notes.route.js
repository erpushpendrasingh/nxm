const express = require("express");
const { NoteModel } = require("../models/Notes.model");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
     try {
          const notes = await NoteModel.find();
          res.send(notes);
     } catch (error) {
          console.log("Somthing Error in /notes");
          console.log('error:', error)
     }
});
noteRouter.post("/create", async (req, res) => {
     const payload = req.body;
     try {
          const new_note = new NoteModel(payload);
          await new_note.save();
          res.send({ msg: "Notes is created" });
     } catch (error) {
          console.log("error:", error);
          res.send({ msg: error });
     }
});
noteRouter.patch("/update/:id", async (req, res) => {
     const payload = req.body;
     const id = req.params.id;
     const note = await NoteModel.findOne({ _id: id });
     const userID_in_note = note.userID;
     const userID_making_req = req.body.userID;
     try {
          if (userID_making_req === userID_in_note) {
               res.send({ msg: "You are not authorized" });
          } else {
               await NoteModel.findByIdAndUpdate({ _id: id }, payload);
               res.send("Update the note");
          }
     } catch (error) {
          console.log(error);
          res.send({ msg: "Something went wrong" });
     }
});
noteRouter.delete("/delete/:id", async (req, res) => {
     const id = req.params.id;
     try {
          await NoteModel.findByIdAndDelete({ _id: id });
          res.send("Deleted the note");
     } catch (error) {
          console.log("error:", error);
          res.send({ msg: "Something went wrong" });
     }
});

module.exports = {
     noteRouter,
};
