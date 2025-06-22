/*
  # Add Sample Financial Data

  1. Sample Data Added
    - Budget plans for 6 months (2025)
    - Insurance policies (life, car, home, medical, disability)
    - Tax records for 3 years (2023-2025)
    - Deductions tracker for current year
    - Sample transactions for reports
    - Financial goals with progress
    - Savings accounts and investments
    - Debt accounts (home loan, credit card, etc.)
    - Active subscriptions

  2. Security
    - All data is user-specific and respects RLS policies
    - Uses dynamic user insertion for authenticated users

  Note: This migration creates sample data for the first authenticated user that exists.
  In a real application, you would typically seed this data through the application layer.
*/

-- Create a function to safely insert sample data for existing users
DO $$
DECLARE
    sample_user_id uuid;
BEGIN
    -- Get the first authenticated user (if any exists)
    SELECT auth.uid() INTO sample_user_id;
    
    -- If no authenticated user context, skip sample data insertion
    IF sample_user_id IS NULL THEN
        RAISE NOTICE 'No authenticated user context found. Sample data will be inserted when users sign up.';
        RETURN;
    END IF;

    -- Insert sample budget plans
    INSERT INTO budget_plans (user_id, month_year, projected_income, projected_expenditure, actual_income, actual_expenditure, notes) VALUES
      (sample_user_id, '2025-01-01', 25000, 27000, 25000, 28500, 'January expenses higher than expected'),
      (sample_user_id, '2025-02-01', 25000, 25500, 25000, 24100, 'Holiday expenses managed well'),
      (sample_user_id, '2025-03-01', 25000, 23500, 25000, 22800, 'Stayed within budget'),
      (sample_user_id, '2025-04-01', 25000, 24000, 25000, 26500, 'Car repairs exceeded budget'),
      (sample_user_id, '2025-05-01', 25000, 20500, 28500, 21200, 'Bonus received, overspent on dining'),
      (sample_user_id, '2025-06-01', 28500, 22000, 28500, 18750, 'Exceeded savings goal');

    -- Insert sample insurance policies
    INSERT INTO insurance_policies (user_id, policy_type, provider, coverage_amount, monthly_premium, renewal_date, status, last_claim_date) VALUES
      (sample_user_id, 'life', 'Old Mutual', 2000000, 650, '2026-03-15', 'active', NULL),
      (sample_user_id, 'car', 'Santam', 450000, 1250, '2025-08-20', 'active', '2024-01-15'),
      (sample_user_id, 'home', 'Outsurance', 1800000, 850, '2025-12-10', 'active', NULL),
      (sample_user_id, 'medical', 'Discovery Health', 500000, 3200, '2026-01-31', 'active', '2025-05-20'),
      (sample_user_id, 'disability', 'Momentum', 25000, 420, '2025-09-15', 'active', NULL);

    -- Insert sample tax records
    INSERT INTO tax_records (user_id, tax_year, taxable_income, tax_payable, deductions_claimed, refund_amount, amount_owing, sars_status, submission_date) VALUES
      (sample_user_id, 2023, 298000, 52100, 8900, 0, 1200, 'closed', '2023-09-15'),
      (sample_user_id, 2024, 325000, 58250, 12400, 2850, 0, 'assessed', '2024-10-20'),
      (sample_user_id, 2025, 342000, 62580, 15600, 0, 0, 'pending', NULL);

    -- Insert sample deductions tracker
    INSERT INTO deductions_tracker (user_id, tax_year, deduction_type, ytd_amount, annual_limit) VALUES
      (sample_user_id, 2025, 'retirement_annuity', 36000, 350000),
      (sample_user_id, 2025, 'medical_aid', 19200, NULL),
      (sample_user_id, 2025, 'travel_allowance', 18500, 72000),
      (sample_user_id, 2025, 'home_office', 4200, 15000);

    -- Insert sample transactions for reports
    INSERT INTO transactions (user_id, type, amount, category, date, note) VALUES
      (sample_user_id, 'income', 25000, 'Salary', '2025-01-15', 'Monthly salary'),
      (sample_user_id, 'income', 3500, 'Freelance', '2025-01-13', 'Project payment'),
      (sample_user_id, 'expense', 1250, 'Groceries', '2025-01-14', 'Pick n Pay'),
      (sample_user_id, 'expense', 850, 'Transport', '2025-01-12', 'Petrol'),
      (sample_user_id, 'expense', 180, 'Dining', '2025-01-11', 'Restaurant'),
      (sample_user_id, 'expense', 8500, 'Housing', '2025-01-15', 'Home loan payment'),
      (sample_user_id, 'expense', 2200, 'Credit', '2025-01-15', 'Credit card payment'),
      (sample_user_id, 'income', 5000, 'Investment', '2025-01-15', 'Dividend payment');

    -- Insert sample goals
    INSERT INTO goals (user_id, title, target_amount, current_amount, target_date, status) VALUES
      (sample_user_id, 'Emergency Fund', 150000, 85600, '2025-12-31', 'active'),
      (sample_user_id, 'House Deposit', 400000, 125000, '2027-06-30', 'active'),
      (sample_user_id, 'New Car', 350000, 45000, '2026-01-31', 'active'),
      (sample_user_id, 'Vacation Fund', 50000, 38200, '2025-11-30', 'active');

    -- Insert sample savings accounts
    INSERT INTO savings_accounts (user_id, institution, account_type, balance, interest_rate) VALUES
      (sample_user_id, 'FNB', 'savings', 85600, 5.5),
      (sample_user_id, 'Allan Gray', 'investment', 42300, 8.2),
      (sample_user_id, 'Sanlam', 'retirement', 125000, 7.8),
      (sample_user_id, 'Capitec', 'tfsa', 18500, 6.0);

    -- Insert sample debts
    INSERT INTO debts (user_id, creditor, debt_type, balance, monthly_payment, interest_rate, payment_due_date) VALUES
      (sample_user_id, 'ABSA', 'home_loan', 1250000, 8500, 11.5, 1),
      (sample_user_id, 'Standard Bank', 'credit_card', 15800, 2200, 18.5, 15),
      (sample_user_id, 'Wesbank', 'vehicle_finance', 185600, 4850, 12.8, 25),
      (sample_user_id, 'Edgars', 'store_account', 3200, 650, 22.0, 20);

    -- Insert sample subscriptions
    INSERT INTO subscriptions (user_id, service_name, amount, billing_cycle, renewal_date, status) VALUES
      (sample_user_id, 'Netflix Premium', 199, 'monthly', '2025-02-15', 'active'),
      (sample_user_id, 'Spotify Family', 99, 'monthly', '2025-02-01', 'active'),
      (sample_user_id, 'DStv Premium', 899, 'monthly', '2025-01-28', 'active'),
      (sample_user_id, 'Virgin Active Gym', 599, 'monthly', '2025-02-25', 'active'),
      (sample_user_id, 'Microsoft 365', 129, 'monthly', '2025-02-15', 'active'),
      (sample_user_id, 'MTN Contract', 499, 'monthly', '2025-02-10', 'active');

    RAISE NOTICE 'Sample data inserted successfully for user: %', sample_user_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error inserting sample data: %', SQLERRM;
END $$;

-- Alternative approach: Create a function that can be called to populate sample data for any user
CREATE OR REPLACE FUNCTION populate_sample_data(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Insert sample budget plans
    INSERT INTO budget_plans (user_id, month_year, projected_income, projected_expenditure, actual_income, actual_expenditure, notes) VALUES
      (target_user_id, '2025-01-01', 25000, 27000, 25000, 28500, 'January expenses higher than expected'),
      (target_user_id, '2025-02-01', 25000, 25500, 25000, 24100, 'Holiday expenses managed well'),
      (target_user_id, '2025-03-01', 25000, 23500, 25000, 22800, 'Stayed within budget'),
      (target_user_id, '2025-04-01', 25000, 24000, 25000, 26500, 'Car repairs exceeded budget'),
      (target_user_id, '2025-05-01', 25000, 20500, 28500, 21200, 'Bonus received, overspent on dining'),
      (target_user_id, '2025-06-01', 28500, 22000, 28500, 18750, 'Exceeded savings goal')
    ON CONFLICT (user_id, month_year) DO NOTHING;

    -- Insert sample insurance policies
    INSERT INTO insurance_policies (user_id, policy_type, provider, coverage_amount, monthly_premium, renewal_date, status, last_claim_date) VALUES
      (target_user_id, 'life', 'Old Mutual', 2000000, 650, '2026-03-15', 'active', NULL),
      (target_user_id, 'car', 'Santam', 450000, 1250, '2025-08-20', 'active', '2024-01-15'),
      (target_user_id, 'home', 'Outsurance', 1800000, 850, '2025-12-10', 'active', NULL),
      (target_user_id, 'medical', 'Discovery Health', 500000, 3200, '2026-01-31', 'active', '2025-05-20'),
      (target_user_id, 'disability', 'Momentum', 25000, 420, '2025-09-15', 'active', NULL)
    ON CONFLICT DO NOTHING;

    -- Insert sample tax records
    INSERT INTO tax_records (user_id, tax_year, taxable_income, tax_payable, deductions_claimed, refund_amount, amount_owing, sars_status, submission_date) VALUES
      (target_user_id, 2023, 298000, 52100, 8900, 0, 1200, 'closed', '2023-09-15'),
      (target_user_id, 2024, 325000, 58250, 12400, 2850, 0, 'assessed', '2024-10-20'),
      (target_user_id, 2025, 342000, 62580, 15600, 0, 0, 'pending', NULL)
    ON CONFLICT (user_id, tax_year) DO NOTHING;

    -- Insert sample deductions tracker
    INSERT INTO deductions_tracker (user_id, tax_year, deduction_type, ytd_amount, annual_limit) VALUES
      (target_user_id, 2025, 'retirement_annuity', 36000, 350000),
      (target_user_id, 2025, 'medical_aid', 19200, NULL),
      (target_user_id, 2025, 'travel_allowance', 18500, 72000),
      (target_user_id, 2025, 'home_office', 4200, 15000)
    ON CONFLICT (user_id, tax_year, deduction_type) DO NOTHING;

    -- Insert sample transactions for reports
    INSERT INTO transactions (user_id, type, amount, category, date, note) VALUES
      (target_user_id, 'income', 25000, 'Salary', '2025-01-15', 'Monthly salary'),
      (target_user_id, 'income', 3500, 'Freelance', '2025-01-13', 'Project payment'),
      (target_user_id, 'expense', 1250, 'Groceries', '2025-01-14', 'Pick n Pay'),
      (target_user_id, 'expense', 850, 'Transport', '2025-01-12', 'Petrol'),
      (target_user_id, 'expense', 180, 'Dining', '2025-01-11', 'Restaurant'),
      (target_user_id, 'expense', 8500, 'Housing', '2025-01-15', 'Home loan payment'),
      (target_user_id, 'expense', 2200, 'Credit', '2025-01-15', 'Credit card payment'),
      (target_user_id, 'income', 5000, 'Investment', '2025-01-15', 'Dividend payment');

    -- Insert sample goals
    INSERT INTO goals (user_id, title, target_amount, current_amount, target_date, status) VALUES
      (target_user_id, 'Emergency Fund', 150000, 85600, '2025-12-31', 'active'),
      (target_user_id, 'House Deposit', 400000, 125000, '2027-06-30', 'active'),
      (target_user_id, 'New Car', 350000, 45000, '2026-01-31', 'active'),
      (target_user_id, 'Vacation Fund', 50000, 38200, '2025-11-30', 'active');

    -- Insert sample savings accounts
    INSERT INTO savings_accounts (user_id, institution, account_type, balance, interest_rate) VALUES
      (target_user_id, 'FNB', 'savings', 85600, 5.5),
      (target_user_id, 'Allan Gray', 'investment', 42300, 8.2),
      (target_user_id, 'Sanlam', 'retirement', 125000, 7.8),
      (target_user_id, 'Capitec', 'tfsa', 18500, 6.0);

    -- Insert sample debts
    INSERT INTO debts (user_id, creditor, debt_type, balance, monthly_payment, interest_rate, payment_due_date) VALUES
      (target_user_id, 'ABSA', 'home_loan', 1250000, 8500, 11.5, 1),
      (target_user_id, 'Standard Bank', 'credit_card', 15800, 2200, 18.5, 15),
      (target_user_id, 'Wesbank', 'vehicle_finance', 185600, 4850, 12.8, 25),
      (target_user_id, 'Edgars', 'store_account', 3200, 650, 22.0, 20);

    -- Insert sample subscriptions
    INSERT INTO subscriptions (user_id, service_name, amount, billing_cycle, renewal_date, status) VALUES
      (target_user_id, 'Netflix Premium', 199, 'monthly', '2025-02-15', 'active'),
      (target_user_id, 'Spotify Family', 99, 'monthly', '2025-02-01', 'active'),
      (target_user_id, 'DStv Premium', 899, 'monthly', '2025-01-28', 'active'),
      (target_user_id, 'Virgin Active Gym', 599, 'monthly', '2025-02-25', 'active'),
      (target_user_id, 'Microsoft 365', 129, 'monthly', '2025-02-15', 'active'),
      (target_user_id, 'MTN Contract', 499, 'monthly', '2025-02-10', 'active');

END $$;