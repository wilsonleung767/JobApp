import { Router } from 'express';
import db from "../mongodb_connection.js"
const JobRouter = new Router();

// Add an endpoint to fetch all job listings
JobRouter.get('/', async (req, res) => {
  try {
    const jobListings = await db.collection('Job').find({}).toArray();

    if (jobListings) {
      res.json(jobListings);
    } else {
      res.status(404).json({ error: 'No job listings found' });
    }
  } catch (error) {
    console.error('Error fetching job listings:', error);
    res.status(500).json({ error: 'Failed to fetch job listings' });
  }
});

// Function to get the latest job ID from the database
async function getLatestJobID() {
    const latestJob = await db.collection('Job').findOne({}, { sort: { jobID: -1 } });
    return latestJob ? latestJob.jobID : 0;
}

// Add an endpoint to fetch job details by jobID
JobRouter.get('/:jobID', async (req, res) => {
  try {
    const jobID = parseInt(req.params.jobID); // Parse the jobID from the URL parameter
    const job = await db.collection('Job').findOne({ jobID: jobID });

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

// Add an endpoint to get the latest job ID
JobRouter.get('/latestJobId', async (req, res) => {
    try {
      const latestJobID = await getLatestJobID();
      res.json({ latestJobId: latestJobID });
    } catch (error) {
      console.error('Error fetching latest job ID:', error);
      res.status(500).json({ error: 'Failed to fetch latest job ID' });
    }
  });

JobRouter.post('/Job', async (req, res) => {
    try {
      // Get the latest job ID from the database
      const latestJobID = await getLatestJobID();
  
      // Increment the latest job ID for the new job
      const newJobID = latestJobID + 1;
  
      // Extract data from the request body
      const { title, location, employer, salary, createdAt, description } = req.body;
  
      // Create a new job object with the incremented job ID
      const newJob = {
        jobID: newJobID,
        title,
        location,
        employer,
        salary,
        createdAt,
        description,
      };
  
      // Insert the new job document into the MongoDB collection
      const result = await db.collection('Job').insertOne(newJob);
  
      if (result.insertedCount === 1) {
        res.send({ jobIsCreated: true });
      } else {
        res.send({ jobIsCreated: false, error_message: 'Failed to create Job' });
      }
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).send({ jobIsCreated: false, error_message: 'Failed to create Job' });
    }
  });
  
export default JobRouter;