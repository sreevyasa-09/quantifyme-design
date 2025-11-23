/**
 * AdaBoost Regression Implementation
 * Uses ensemble of weak learners to predict step counts based on movement patterns
 */

interface DataPoint {
  features: number[]; // [acceleration_x, acceleration_y, acceleration_z, magnitude]
  target: number; // actual step count
}

interface WeakLearner {
  threshold: number;
  featureIndex: number;
  prediction: number;
  weight: number;
}

export class AdaBoostRegressor {
  private learners: WeakLearner[] = [];
  private numLearners: number;

  constructor(numLearners: number = 10) {
    this.numLearners = numLearners;
  }

  /**
   * Train the AdaBoost model with historical movement data
   */
  train(data: DataPoint[]): void {
    const n = data.length;
    let weights = new Array(n).fill(1 / n);

    for (let t = 0; t < this.numLearners; t++) {
      // Find best weak learner
      const learner = this.findBestWeakLearner(data, weights);
      
      // Calculate weighted error
      const predictions = data.map(d => this.predictWithLearner(d.features, learner));
      const errors = data.map((d, i) => Math.abs(d.target - predictions[i]));
      const weightedError = errors.reduce((sum, err, i) => sum + weights[i] * err, 0);
      
      // Calculate learner weight (alpha)
      const maxError = Math.max(...errors);
      const normalizedError = weightedError / maxError;
      const alpha = Math.log((1 - normalizedError) / (normalizedError + 1e-10));
      
      learner.weight = alpha;
      this.learners.push(learner);

      // Update sample weights
      weights = weights.map((w, i) => {
        const relativeError = errors[i] / maxError;
        return w * Math.exp(alpha * relativeError);
      });
      
      // Normalize weights
      const sumWeights = weights.reduce((a, b) => a + b, 0);
      weights = weights.map(w => w / sumWeights);
    }
  }

  /**
   * Predict step count from movement features
   */
  predict(features: number[]): number {
    if (this.learners.length === 0) {
      // Fallback to simple heuristic if not trained
      const magnitude = features[3] || 0;
      return magnitude > 1.2 ? 1 : 0;
    }

    const weightedPredictions = this.learners.map(learner => ({
      pred: this.predictWithLearner(features, learner),
      weight: learner.weight
    }));

    const totalWeight = weightedPredictions.reduce((sum, wp) => sum + wp.weight, 0);
    const prediction = weightedPredictions.reduce((sum, wp) => sum + wp.pred * wp.weight, 0) / totalWeight;

    return Math.max(0, Math.round(prediction));
  }

  private findBestWeakLearner(data: DataPoint[], weights: number[]): WeakLearner {
    let bestLearner: WeakLearner = {
      threshold: 0,
      featureIndex: 0,
      prediction: 0,
      weight: 0
    };
    let bestError = Infinity;

    // Try each feature
    for (let featureIdx = 0; featureIdx < data[0].features.length; featureIdx++) {
      const values = data.map(d => d.features[featureIdx]);
      const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

      // Try different thresholds
      for (const threshold of uniqueValues) {
        const prediction = this.calculatePrediction(data, weights, featureIdx, threshold);
        const error = this.calculateError(data, weights, featureIdx, threshold, prediction);

        if (error < bestError) {
          bestError = error;
          bestLearner = {
            threshold,
            featureIndex: featureIdx,
            prediction,
            weight: 0
          };
        }
      }
    }

    return bestLearner;
  }

  private predictWithLearner(features: number[], learner: WeakLearner): number {
    return features[learner.featureIndex] > learner.threshold ? learner.prediction : 0;
  }

  private calculatePrediction(
    data: DataPoint[],
    weights: number[],
    featureIdx: number,
    threshold: number
  ): number {
    const selected = data
      .map((d, i) => ({ target: d.target, weight: weights[i], selected: d.features[featureIdx] > threshold }))
      .filter(item => item.selected);

    if (selected.length === 0) return 0;

    const totalWeight = selected.reduce((sum, item) => sum + item.weight, 0);
    return selected.reduce((sum, item) => sum + item.target * item.weight, 0) / totalWeight;
  }

  private calculateError(
    data: DataPoint[],
    weights: number[],
    featureIdx: number,
    threshold: number,
    prediction: number
  ): number {
    return data.reduce((sum, d, i) => {
      const pred = d.features[featureIdx] > threshold ? prediction : 0;
      return sum + weights[i] * Math.abs(d.target - pred);
    }, 0);
  }
}

/**
 * Generate synthetic training data for demonstration
 */
export function generateTrainingData(samples: number = 100): DataPoint[] {
  const data: DataPoint[] = [];

  for (let i = 0; i < samples; i++) {
    // Simulate accelerometer readings
    const baseAccel = Math.random() * 2;
    const ax = (Math.random() - 0.5) * baseAccel;
    const ay = (Math.random() - 0.5) * baseAccel;
    const az = 9.8 + (Math.random() - 0.5) * baseAccel;
    const magnitude = Math.sqrt(ax * ax + ay * ay + az * az);

    // Step count based on magnitude (higher magnitude = more steps)
    const steps = magnitude > 10 ? Math.floor((magnitude - 9.8) * 2 + Math.random() * 2) : 0;

    data.push({
      features: [ax, ay, az, magnitude],
      target: steps
    });
  }

  return data;
}
