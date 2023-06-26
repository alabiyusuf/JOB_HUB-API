const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

// GET ALL JOBS

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  if (jobs.length === 0) {
    res
      .status(200)
      .json({ msg: `Job board is empty, kindly create new jobs.` });
  }
  res.status(200).json({ jobs, count: jobs.length });
};

// GET A SINGLE JOB BY ID

const getJobByID = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError("No Job with id ${jobId} ");
  }
  res.status(200).json({ job });
};

// CREATE NEW JOB
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(200).json({ job });
};

// UPDATE/PATCH JOB USING ID

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError("No job with the id${jobId} ");
  }
  res.status(200).json({ job });
};

// DELETE JOB USING ID
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError("No job with the id ${jobId} ");
  }
  res.status(200).send();
};

module.exports = {
  getAllJobs,
  getJobByID,
  createJob,
  updateJob,
  deleteJob,
};
