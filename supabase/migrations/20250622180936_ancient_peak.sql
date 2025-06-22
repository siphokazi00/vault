/*
  # Add Comprehensive Sample Data for All Financial Categories

  1. Sample Data Added
    - Budget plans with realistic monthly data
    - Insurance policies across all types
    - Tax records for multiple years
    - Deductions tracker with current year data
    - Sample transactions for comprehensive reports
    - Financial goals with varied progress
    - Savings accounts and investments
    - Debt accounts with payment schedules
    - Active subscriptions with renewal dates

  2. Data Coverage
    - All tables will have meaningful sample data
    - Realistic South African financial scenarios
    - Varied data to showcase different features
    - Proper relationships between related data

  Note: This migration adds sample data for any authenticated user.
*/

-- Create a function to populate comprehensive sample data
CREATE OR REPLACE FUNCTION add_comprehensive_sample_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    sample_user_id uuid;
BEGIN
    -- Get the current authenticated user
    SELECT auth.uid() INTO sample_user_id;
    
    -- If no authenticated user, exit
    IF sample_user_id IS NULL THEN
        RAISE NOTICE 'No authenticated user found. Please sign in to populate sample data.';
        RETURN;
    END IF;

    -- Clear existing sample data for this user to avoid duplicates
    DELETE FROM budget_plans WHERE user_id = sample_user_id;
    DELETE FROM insurance_policies WHERE user_id = sample_user_id;
    DELETE FROM tax_records WHERE user_id = sample_user_id;
    DELETE FROM deductions_tracker WHERE user_id = sample_user_id;
    DELETE FROM transactions WHERE user_id = sample_user_id;
    DELETE FROM goals WHERE user_id = sample_user_id;
    DELETE FROM savings_accounts WHERE user_id = sample_user_id;
    DELETE FROM debts WHERE user_id = sample_user_id;
    DELETE FROM subscriptions WHERE user_id = sample_user_id;

    -- Insert comprehensive budget plans (12 months)
    INSERT INTO budget_plans (user_id, month_year, projected_income, projected_expenditure, actual_income, actual_expenditure, notes) VALUES
      (sample_user_id, '2024-01-01', 25000, 23000, 25000, 24500, 'New year setup costs'),
      (sample_user_id, '2024-02-01', 25000, 22000, 25000, 21800, 'Valentine''s expenses managed'),
      (sample_user_id, '2024-03-01', 25000, 23500, 25000, 22900, 'School fees paid'),
      (sample_user_id, '2024-04-01', 25000, 24000, 25000, 26500, 'Car repairs exceeded budget'),
      (sample_user_id, '2024-05-01', 25000, 20500, 28500, 21200, 'Bonus received, overspent on dining'),
      (sample_user_id, '2024-06-01', 28500, 22000, 28500, 18750, 'Exceeded savings goal'),
      (sample_user_id, '2024-07-01', 25000, 24500, 25000, 23800, 'Winter clothing purchases'),
      (sample_user_id, '2024-08-01', 25000, 23000, 25000, 24200, 'Women''s Day weekend trip'),
      (sample_user_id, '2024-09-01', 25000, 22500, 25000, 21900, 'Spring cleaning expenses'),
      (sample_user_id, '2024-10-01', 25000, 25000, 25000, 26800, 'October holiday overspend'),
      (sample_user_id, '2024-11-01', 25000, 24000, 25000, 23500, 'Black Friday purchases'),
      (sample_user_id, '2024-12-01', 25000, 28000, 27500, 31200, 'December holidays and bonuses');

    -- Insert comprehensive insurance policies
    INSERT INTO insurance_policies (user_id, policy_type, provider, coverage_amount, monthly_premium, renewal_date, status, last_claim_date) VALUES
      (sample_user_id, 'life', 'Old Mutual', 2000000, 650, '2026-03-15', 'active', NULL),
      (sample_user_id, 'car', 'Santam', 450000, 1250, '2025-08-20', 'active', '2024-01-15'),
      (sample_user_id, 'home', 'Outsurance', 1800000, 850, '2025-12-10', 'active', NULL),
      (sample_user_id, 'medical', 'Discovery Health', 500000, 3200, '2026-01-31', 'active', '2025-05-20'),
      (sample_user_id, 'disability', 'Momentum', 25000, 420, '2025-09-15', 'active', NULL),
      (sample_user_id, 'travel', 'Hollard', 100000, 85, '2025-07-01', 'active', '2024-08-10');

    -- Insert comprehensive tax records
    INSERT INTO tax_records (user_id, tax_year, taxable_income, tax_payable, deductions_claimed, refund_amount, amount_owing, sars_status, submission_date) VALUES
      (sample_user_id, 2022, 285000, 48200, 7500, 1200, 0, 'closed', '2022-09-15'),
      (sample_user_id, 2023, 298000, 52100, 8900, 0, 1200, 'closed', '2023-09-15'),
      (sample_user_id, 2024, 325000, 58250, 12400, 2850, 0, 'assessed', '2024-10-20'),
      (sample_user_id, 2025, 342000, 62580, 15600, 0, 0, 'pending', NULL);

    -- Insert comprehensive deductions tracker
    INSERT INTO deductions_tracker (user_id, tax_year, deduction_type, ytd_amount, annual_limit) VALUES
      (sample_user_id, 2025, 'retirement_annuity', 36000, 350000),
      (sample_user_id, 2025, 'medical_aid', 19200, NULL),
      (sample_user_id, 2025, 'travel_allowance', 18500, 72000),
      (sample_user_id, 2025, 'home_office', 4200, 15000),
      (sample_user_id, 2025, 'donations', 2500, 100000),
      (sample_user_id, 2025, 'other', 1800, NULL);

    -- Insert comprehensive transactions for reports
    INSERT INTO transactions (user_id, type, amount, category, date, note) VALUES
      -- Income transactions
      (sample_user_id, 'income', 25000, 'Salary', '2025-01-15', 'Monthly salary'),
      (sample_user_id, 'income', 3500, 'Freelance', '2025-01-13', 'Project payment'),
      (sample_user_id, 'income', 5000, 'Investment', '2025-01-15', 'Dividend payment'),
      (sample_user_id, 'income', 1200, 'Rental', '2025-01-01', 'Property rental income'),
      (sample_user_id, 'income', 800, 'Side Business', '2025-01-20', 'Online sales'),
      
      -- Expense transactions - Housing
      (sample_user_id, 'expense', 8500, 'Housing', '2025-01-15', 'Home loan payment'),
      (sample_user_id, 'expense', 1200, 'Housing', '2025-01-05', 'Municipal rates'),
      (sample_user_id, 'expense', 850, 'Housing', '2025-01-10', 'Home insurance'),
      
      -- Expense transactions - Transport
      (sample_user_id, 'expense', 850, 'Transport', '2025-01-12', 'Petrol'),
      (sample_user_id, 'expense', 4850, 'Transport', '2025-01-25', 'Vehicle finance'),
      (sample_user_id, 'expense', 1250, 'Transport', '2025-01-20', 'Car insurance'),
      
      -- Expense transactions - Food
      (sample_user_id, 'expense', 1250, 'Groceries', '2025-01-14', 'Pick n Pay'),
      (sample_user_id, 'expense', 180, 'Dining', '2025-01-11', 'Restaurant'),
      (sample_user_id, 'expense', 320, 'Groceries', '2025-01-21', 'Woolworths'),
      
      -- Expense transactions - Credit
      (sample_user_id, 'expense', 2200, 'Credit', '2025-01-15', 'Credit card payment'),
      (sample_user_id, 'expense', 650, 'Credit', '2025-01-20', 'Store account payment'),
      
      -- Expense transactions - Healthcare
      (sample_user_id, 'expense', 3200, 'Healthcare', '2025-01-01', 'Medical aid'),
      (sample_user_id, 'expense', 450, 'Healthcare', '2025-01-18', 'Dentist visit'),
      
      -- Expense transactions - Entertainment
      (sample_user_id, 'expense', 199, 'Entertainment', '2025-01-15', 'Netflix'),
      (sample_user_id, 'expense', 99, 'Entertainment', '2025-01-01', 'Spotify'),
      (sample_user_id, 'expense', 899, 'Entertainment', '2025-01-28', 'DStv'),
      
      -- Expense transactions - Fitness
      (sample_user_id, 'expense', 599, 'Fitness', '2025-01-25', 'Gym membership'),
      
      -- Expense transactions - Utilities
      (sample_user_id, 'expense', 1200, 'Utilities', '2025-01-05', 'Electricity'),
      (sample_user_id, 'expense', 350, 'Utilities', '2025-01-08', 'Water'),
      (sample_user_id, 'expense', 499, 'Utilities', '2025-01-10', 'Cell phone'),
      (sample_user_id, 'expense', 129, 'Utilities', '2025-01-15', 'Microsoft 365');

    -- Insert comprehensive goals
    INSERT INTO goals (user_id, title, target_amount, current_amount, target_date, status) VALUES
      (sample_user_id, 'Emergency Fund', 150000, 85600, '2025-12-31', 'active'),
      (sample_user_id, 'House Deposit', 400000, 125000, '2027-06-30', 'active'),
      (sample_user_id, 'New Car', 350000, 45000, '2026-01-31', 'active'),
      (sample_user_id, 'Vacation Fund', 50000, 38200, '2025-11-30', 'active'),
      (sample_user_id, 'Retirement Top-up', 200000, 15000, '2025-12-31', 'active'),
      (sample_user_id, 'Children Education', 500000, 75000, '2030-01-31', 'active');

    -- Insert comprehensive savings accounts
    INSERT INTO savings_accounts (user_id, institution, account_type, balance, interest_rate) VALUES
      (sample_user_id, 'FNB', 'savings', 85600, 5.5),
      (sample_user_id, 'Allan Gray', 'investment', 42300, 8.2),
      (sample_user_id, 'Sanlam', 'retirement', 125000, 7.8),
      (sample_user_id, 'Capitec', 'tfsa', 18500, 6.0),
      (sample_user_id, 'Nedbank', 'money_market', 65000, 6.8),
      (sample_user_id, 'Old Mutual', 'retirement', 89000, 7.5);

    -- Insert comprehensive debts
    INSERT INTO debts (user_id, creditor, debt_type, balance, monthly_payment, interest_rate, payment_due_date) VALUES
      (sample_user_id, 'ABSA', 'home_loan', 1250000, 8500, 11.5, 1),
      (sample_user_id, 'Standard Bank', 'credit_card', 15800, 2200, 18.5, 15),
      (sample_user_id, 'Wesbank', 'vehicle_finance', 185600, 4850, 12.8, 25),
      (sample_user_id, 'Edgars', 'store_account', 3200, 650, 22.0, 20),
      (sample_user_id, 'FNB', 'personal_loan', 45000, 1200, 15.5, 10),
      (sample_user_id, 'NSFAS', 'student_loan', 85000, 800, 8.0, 5);

    -- Insert comprehensive subscriptions
    INSERT INTO subscriptions (user_id, service_name, amount, billing_cycle, renewal_date, status) VALUES
      (sample_user_id, 'Netflix Premium', 199, 'monthly', '2025-02-15', 'active'),
      (sample_user_id, 'Spotify Family', 99, 'monthly', '2025-02-01', 'active'),
      (sample_user_id, 'DStv Premium', 899, 'monthly', '2025-01-28', 'active'),
      (sample_user_id, 'Virgin Active Gym', 599, 'monthly', '2025-02-25', 'active'),
      (sample_user_id, 'Microsoft 365', 129, 'monthly', '2025-02-15', 'active'),
      (sample_user_id, 'MTN Contract', 499, 'monthly', '2025-02-10', 'active'),
      (sample_user_id, 'Amazon Prime', 79, 'monthly', '2025-02-20', 'active'),
      (sample_user_id, 'Adobe Creative Cloud', 349, 'monthly', '2025-02-05', 'active'),
      (sample_user_id, 'Showmax', 99, 'monthly', '2025-02-12', 'active'),
      (sample_user_id, 'Audible', 149, 'monthly', '2025-02-18', 'active');

    RAISE NOTICE 'Comprehensive sample data added successfully for user: %', sample_user_id;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error adding comprehensive sample data: %', SQLERRM;
END $$;

-- Execute the function to add sample data
SELECT add_comprehensive_sample_data();