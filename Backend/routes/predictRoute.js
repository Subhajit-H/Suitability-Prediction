import express from 'express';
import { suitabilityPrediction } from '../controllers/predictController.js';

const predictRouter = express.Router();

// Route for predicting suitability
predictRouter.post('/suitability', suitabilityPrediction);

export default predictRouter;