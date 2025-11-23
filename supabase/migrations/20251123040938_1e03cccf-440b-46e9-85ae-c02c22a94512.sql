-- Create profiles table to store user data
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  age integer NOT NULL,
  weight numeric NOT NULL,
  height numeric NOT NULL,
  recommended_daily_steps integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Function to calculate recommended daily steps
-- Based on age and BMI: younger and healthier individuals get higher targets
CREATE OR REPLACE FUNCTION public.calculate_recommended_steps(
  p_age integer,
  p_weight numeric,
  p_height numeric
)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  bmi numeric;
  base_steps integer := 8000;
  recommended integer;
BEGIN
  -- Calculate BMI (weight in kg / (height in meters)^2)
  bmi := p_weight / ((p_height / 100) * (p_height / 100));
  
  -- Age-based adjustments
  IF p_age < 30 THEN
    base_steps := 10000;
  ELSIF p_age < 50 THEN
    base_steps := 9000;
  ELSIF p_age < 65 THEN
    base_steps := 8000;
  ELSE
    base_steps := 7000;
  END IF;
  
  -- BMI-based adjustments (healthy BMI: 18.5-24.9)
  IF bmi < 18.5 THEN
    recommended := base_steps - 1000;  -- Underweight: lower target
  ELSIF bmi > 30 THEN
    recommended := base_steps + 2000;  -- Obese: higher target for weight loss
  ELSIF bmi > 25 THEN
    recommended := base_steps + 1000;  -- Overweight: slightly higher
  ELSE
    recommended := base_steps;  -- Healthy weight
  END IF;
  
  -- Ensure minimum of 5000 steps
  IF recommended < 5000 THEN
    recommended := 5000;
  END IF;
  
  RETURN recommended;
END;
$$;

-- Trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();