import express from "express";

const router = express.Router();

router.get("/verify/dof/:id", function (req, res) {
  res.send({ status: "success" });
});

export default router;
