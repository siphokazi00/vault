/*
  # Complete Vault Database Schema

  1. New Tables
    - `savings_accounts` - Track savings and investment accounts
    - `debts` - Manage loans, credit cards, and other debts
    - `subscriptions` - Track recurring payments and subscriptions
    - `insurance_policies` - Manage insurance policies and claims
    - `tax_records` - Annual tax information and filing status
    - `deductions_tracker` - Track tax deductions throughout the year
    - `budget_plans` - Monthly budget planning and tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data

  3. Features
    - Proper foreign key relationships
    - Default values for common fields
    - Check constraints for data validation
*/

-- Savings Accounts Table
CREATE TABLE IF NOT EXISTS savings_accounts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  institution text NOT NULL,
  account_type text CHECK (account_type IN ('savings', 'investment', 'tfsa', 'retirement', 'money_market')),
  balance numeric DEFAULT 0,
  interest_rate numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE savings_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own savings accounts"
  ON savings_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Debts Table
CREATE TABLE IF NOT EXISTS debts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  creditor text NOT NULL,
  debt_type text CHECK (debt_type IN ('home_loan', 'vehicle_finance', 'credit_card', 'personal_loan', 'store_account', 'student_loan')),
  balance numeric NOT NULL,
  monthly_payment numeric DEFAULT 0,
  interest_rate numeric DEFAULT 0,
  payment_due_date integer CHECK (payment_due_date BETWEEN 1 AND 31),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own debts"
  ON debts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  service_name text NOT NULL,
  amount numeric NOT NULL,
  billing_cycle text CHECK (billing_cycle IN ('monthly', 'quarterly', 'annually')) DEFAULT 'monthly',
  renewal_date date,
  status text CHECK (status IN ('active', 'cancelled', 'paused')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own subscriptions"
  ON subscriptions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insurance Policies Table
CREATE TABLE IF NOT EXISTS insurance_policies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  policy_type text CHECK (policy_type IN ('life', 'car', 'home', 'medical', 'disability', 'travel')) NOT NULL,
  provider text NOT NULL,
  coverage_amount numeric,
  monthly_premium numeric NOT NULL,
  renewal_date date,
  status text CHECK (status IN ('active', 'expired', 'cancelled')) DEFAULT 'active',
  last_claim_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE insurance_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own insurance policies"
  ON insurance_policies
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Tax Records Table
CREATE TABLE IF NOT EXISTS tax_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  tax_year integer NOT NULL,
  taxable_income numeric DEFAULT 0,
  tax_payable numeric DEFAULT 0,
  deductions_claimed numeric DEFAULT 0,
  refund_amount numeric DEFAULT 0,
  amount_owing numeric DEFAULT 0,
  sars_status text CHECK (sars_status IN ('pending', 'submitted', 'assessed', 'closed')) DEFAULT 'pending',
  submission_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tax_year)
);

ALTER TABLE tax_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own tax records"
  ON tax_records
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Deductions Tracker Table
CREATE TABLE IF NOT EXISTS deductions_tracker (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  tax_year integer NOT NULL,
  deduction_type text CHECK (deduction_type IN ('retirement_annuity', 'medical_aid', 'travel_allowance', 'home_office', 'donations', 'other')) NOT NULL,
  ytd_amount numeric DEFAULT 0,
  annual_limit numeric,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tax_year, deduction_type)
);

ALTER TABLE deductions_tracker ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own deductions tracker"
  ON deductions_tracker
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Budget Plans Table
CREATE TABLE IF NOT EXISTS budget_plans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  month_year date NOT NULL, -- First day of the month
  projected_income numeric DEFAULT 0,
  projected_expenditure numeric DEFAULT 0,
  actual_income numeric DEFAULT 0,
  actual_expenditure numeric DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, month_year)
);

ALTER TABLE budget_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own budget plans"
  ON budget_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_goals_user_status ON goals(user_id, status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX IF NOT EXISTS idx_insurance_user_status ON insurance_policies(user_id, status);
CREATE INDEX IF NOT EXISTS idx_budget_user_month ON budget_plans(user_id, month_year DESC);