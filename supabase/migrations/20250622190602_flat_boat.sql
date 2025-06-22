/*
  # Populate sample data for current authenticated user

  This migration will populate sample data for any authenticated user.
  It checks for existing users and adds comprehensive sample data.
*/

-- First, let's create a function that can be called to populate data for any user
CREATE OR REPLACE FUNCTION populate_sample_data_for_user(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Clear existing data to avoid conflicts
    DELETE FROM budget_plans WHERE user_id = target_user_id;
    DELETE FROM insurance_policies WHERE user_id = target_user_id;
    DELETE FROM tax_records WHERE user_id = target_user_id;
    DELETE FROM deductions_tracker WHERE user_id = target_user_id;
    DELETE FROM transactions WHERE user_id = target_user_id;
    DELETE FROM goals WHERE user_id = target_user_id;
    DELETE FROM savings_accounts WHERE user_id = target_user_id;
    DELETE FROM debts WHERE user_id = target_user_id;
    DELETE FROM subscriptions WHERE user_id = target_user_id;

    -- Insert budget plans
    INSERT INTO budget_plans (user_id, month_year, projected_income, projected_expenditure, actual_income, actual_expenditure, notes) VALUES
      (target_user_id, '2024-01-01', 25000, 23000, 25000, 24500, 'New year setup costs'),
      (target_user_id, '2024-02-01', 25000, 22000, 25000, 21800, 'Valentine expenses managed'),
      (target_user_id, '2024-03-01', 25000, 23500, 25000, 22900, 'School fees paid'),
      (target_user_id, '2024-04-01', 25000, 24000, 25000, 26500, 'Car repairs exceeded budget'),
      (target_user_id, '2024-05-01', 25000, 20500, 28500, 21200, 'Bonus received, overspent on dining'),
      (target_user_id, '2024-06-01', 28500, 22000, 28500, 18750, 'Exceeded savings goal'),
      (target_user_id, '2024-07-01', 25000, 24500, 25000, 23800, 'Winter clothing purchases'),
      (target_user_id, '2024-08-01', 25000, 23000, 25000, 24200, 'Women Day weekend trip'),
      (target_user_id, '2024-09-01', 25000, 22500, 25000, 21900, 'Spring cleaning expenses'),
      (target_user_id, '2024-10-01', 25000, 25000, 25000, 26800, 'October holiday overspend'),
      (target_user_id, '2024-11-01', 25000, 24000, 25000, 23500, 'Black Friday purchases'),
      (target_user_id, '2024-12-01', 25000, 28000, 27500, 31200, 'December holidays and bonuses');

    -- Insert insurance policies
    INSERT INTO insurance_policies (user_id, policy_type, provider, coverage_amount, monthly_premium, renewal_date, status, last_claim_date) VALUES
      (target_user_id, 'life', 'Old Mutual', 2000000, 650, '2026-03-15', 'active', NULL),
      (target_user_id, 'car', 'Santam', 450000, 1250, '2025-08-20', 'active', '2024-01-15'),
      (target_user_id, 'home', 'Outsurance', 1800000, 850, '2025-12-10', 'active', NULL),
      (target_user_id, 'medical', 'Discovery Health', 500000, 3200, '2026-01-31', 'active', '2025-05-20'),
      (target_user_id, 'disability', 'Momentum', 25000, 420, '2025-09-15', 'active', NULL),
      (target_user_id, 'travel', 'Hollard', 100000, 85, '2025-07-01', 'active', '2024-08-10');

    -- Insert tax records
    INSERT INTO tax_records (user_id, tax_year, taxable_income, tax_payable, deductions_claimed, refund_amount, amount_owing, sars_status, submission_date) VALUES
      (target_user_id, 2022, 285000, 48200, 7500, 1200, 0, 'closed', '2022-09-15'),
      (target_user_id, 2023, 298000, 52100, 8900, 0, 1200, 'closed', '2023-09-15'),
      (target_user_id, 2024, 325000, 58250, 12400, 2850, 0, 'assessed', '2024-10-20'),
      (target_user_id, 2025, 342000, 62580, 15600, 0, 0, 'pending', NULL);

    -- Insert deductions tracker
    INSERT INTO deductions_tracker (user_id, tax_year, deduction_type, ytd_amount, annual_limit) VALUES
      (target_user_id, 2025, 'retirement_annuity', 36000, 350000),
      (target_user_id, 2025, 'medical_aid', 19200, NULL),
      (target_user_id, 2025, 'travel_allowance', 18500, 72000),
      (target_user_id, 2025, 'home_office', 4200, 15000),
      (target_user_id, 2025, 'donations', 2500, 100000),
      (target_user_id, 2025, 'other', 1800, NULL);

    -- Insert transactions
    INSERT INTO transactions (user_id, type, amount, category, date, note) VALUES
      (target_user_id, 'income', 25000, 'Salary', '2025-01-15', 'Monthly salary'),
      (target_user_id, 'income', 3500, 'Freelance', '2025-01-13', 'Project payment'),
      (target_user_id, 'income', 5000, 'Investment', '2025-01-15', 'Dividend payment'),
      (target_user_id, 'income', 1200, 'Rental', '2025-01-01', 'Property rental income'),
      (target_user_id, 'expense', 8500, 'Housing', '2025-01-15', 'Home loan payment'),
      (target_user_id, 'expense', 1250, 'Groceries', '2025-01-14', 'Pick n Pay'),
      (target_user_id, 'expense', 850, 'Transport', '2025-01-12', 'Petrol'),
      (target_user_id, 'expense', 180, 'Dining', '2025-01-11', 'Restaurant'),
      (target_user_id, 'expense', 2200, 'Credit', '2025-01-15', 'Credit card payment'),
      (target_user_id, 'expense', 3200, 'Healthcare', '2025-01-01', 'Medical aid'),
      (target_user_id, 'expense', 199, 'Entertainment', '2025-01-15', 'Netflix'),
      (target_user_id, 'expense', 599, 'Fitness', '2025-01-25', 'Gym membership'),
      (target_user_id, 'expense', 1200, 'Utilities', '2025-01-05', 'Electricity'),
      (target_user_id, 'expense', 499, 'Utilities', '2025-01-10', 'Cell phone');

    -- Insert goals
    INSERT INTO goals (user_id, title, target_amount, current_amount, target_date, status) VALUES
      (target_user_id, 'Emergency Fund', 150000, 85600, '2025-12-31', 'active'),
      (target_user_id, 'House Deposit', 400000, 125000, '2027-06-30', 'active'),
      (target_user_id, 'New Car', 350000, 45000, '2026-01-31', 'active'),
      (target_user_id, 'Vacation Fund', 50000, 38200, '2025-11-30', 'active');

    -- Insert savings accounts
    INSERT INTO savings_accounts (user_id, institution, account_type, balance, interest_rate) VALUES
      (target_user_id, 'FNB', 'savings', 85600, 5.5),
      (target_user_id, 'Allan Gray', 'investment', 42300, 8.2),
      (target_user_id, 'Sanlam', 'retirement', 125000, 7.8),
      (target_user_id, 'Capitec', 'tfsa', 18500, 6.0);

    -- Insert debts
    INSERT INTO debts (user_id, creditor, debt_type, balance, monthly_payment, interest_rate, payment_due_date) VALUES
      (target_user_id, 'ABSA', 'home_loan', 1250000, 8500, 11.5, 1),
      (target_user_id, 'Standard Bank', 'credit_card', 15800, 2200, 18.5, 15),
      (target_user_id, 'Wesbank', 'vehicle_finance', 185600, 4850, 12.8, 25),
      (target_user_id, 'Edgars', 'store_account', 3200, 650, 22.0, 20);

    -- Insert subscriptions
    INSERT INTO subscriptions (user_id, service_name, amount, billing_cycle, renewal_date, status) VALUES
      (target_user_id, 'Netflix Premium', 199, 'monthly', '2025-02-15', 'active'),
      (target_user_id, 'Spotify Family', 99, 'monthly', '2025-02-01', 'active'),
      (target_user_id, 'DStv Premium', 899, 'monthly', '2025-01-28', 'active'),
      (target_user_id, 'Virgin Active Gym', 599, 'monthly', '2025-02-25', 'active'),
      (target_user_id, 'Microsoft 365', 129, 'monthly', '2025-02-15', 'active'),
      (target_user_id, 'MTN Contract', 499, 'monthly', '2025-02-10', 'active');

    RAISE NOTICE 'Sample data populated successfully for user: %', target_user_id;
END $$;

-- Now populate data for all existing users in auth.users
DO $$
DECLARE
    user_record RECORD;
BEGIN
    FOR user_record IN SELECT id FROM auth.users LOOP
        PERFORM populate_sample_data_for_user(user_record.id);
    END LOOP;
    
    RAISE NOTICE 'Sample data populated for all existing users';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error populating sample data: %', SQLERRM;
END $$;