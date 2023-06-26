const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJobByID,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJobByID).patch(updateJob).delete(deleteJob);

module.exports = router;
