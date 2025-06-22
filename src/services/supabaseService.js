import { supabase } from '../lib/supabase'

// Auth Services
export const authService = {
  async signUp(email, password, saId) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          sa_id: saId
        }
      }
    })
    return { data, error }
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}

// Profile Services
export const profileService = {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    return { data, error }
  },

  async createProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ user_id: userId, ...profileData }])
      .select()
      .single()
    return { data, error }
  },

  async updateProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('user_id', userId)
      .select()
      .single()
    return { data, error }
  }
}

// Transaction Services
export const transactionService = {
  async getTransactions(userId, type = null) {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query
    return { data, error }
  },

  async createTransaction(userId, transactionData) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ user_id: userId, ...transactionData }])
      .select()
      .single()
    return { data, error }
  },

  async updateTransaction(id, transactionData) {
    const { data, error } = await supabase
      .from('transactions')
      .update(transactionData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async deleteTransaction(id) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// Goals Services
export const goalService = {
  async getGoals(userId) {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createGoal(userId, goalData) {
    const { data, error } = await supabase
      .from('goals')
      .insert([{ user_id: userId, ...goalData }])
      .select()
      .single()
    return { data, error }
  },

  async updateGoal(id, goalData) {
    const { data, error } = await supabase
      .from('goals')
      .update(goalData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async deleteGoal(id) {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// Savings Services
export const savingsService = {
  async getSavingsAccounts(userId) {
    const { data, error } = await supabase
      .from('savings_accounts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createSavingsAccount(userId, accountData) {
    const { data, error } = await supabase
      .from('savings_accounts')
      .insert([{ user_id: userId, ...accountData }])
      .select()
      .single()
    return { data, error }
  },

  async updateSavingsAccount(id, accountData) {
    const { data, error } = await supabase
      .from('savings_accounts')
      .update(accountData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Debt Services
export const debtService = {
  async getDebts(userId) {
    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createDebt(userId, debtData) {
    const { data, error } = await supabase
      .from('debts')
      .insert([{ user_id: userId, ...debtData }])
      .select()
      .single()
    return { data, error }
  },

  async updateDebt(id, debtData) {
    const { data, error } = await supabase
      .from('debts')
      .update(debtData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Subscription Services
export const subscriptionService = {
  async getSubscriptions(userId) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createSubscription(userId, subscriptionData) {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([{ user_id: userId, ...subscriptionData }])
      .select()
      .single()
    return { data, error }
  },

  async updateSubscription(id, subscriptionData) {
    const { data, error } = await supabase
      .from('subscriptions')
      .update(subscriptionData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Insurance Services
export const insuranceService = {
  async getInsurancePolicies(userId) {
    const { data, error } = await supabase
      .from('insurance_policies')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async createInsurancePolicy(userId, policyData) {
    const { data, error } = await supabase
      .from('insurance_policies')
      .insert([{ user_id: userId, ...policyData }])
      .select()
      .single()
    return { data, error }
  },

  async updateInsurancePolicy(id, policyData) {
    const { data, error } = await supabase
      .from('insurance_policies')
      .update(policyData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  }
}

// Tax Services
export const taxService = {
  async getTaxRecords(userId) {
    const { data, error } = await supabase
      .from('tax_records')
      .select('*')
      .eq('user_id', userId)
      .order('tax_year', { ascending: false })
    return { data, error }
  },

  async getDeductionsTracker(userId, taxYear) {
    const { data, error } = await supabase
      .from('deductions_tracker')
      .select('*')
      .eq('user_id', userId)
      .eq('tax_year', taxYear)
      .order('deduction_type')
    return { data, error }
  },

  async createTaxRecord(userId, taxData) {
    const { data, error } = await supabase
      .from('tax_records')
      .insert([{ user_id: userId, ...taxData }])
      .select()
      .single()
    return { data, error }
  },

  async updateDeductionTracker(userId, taxYear, deductionType, amount) {
    const { data, error } = await supabase
      .from('deductions_tracker')
      .upsert([{
        user_id: userId,
        tax_year: taxYear,
        deduction_type: deductionType,
        ytd_amount: amount,
        last_updated: new Date().toISOString()
      }])
      .select()
      .single()
    return { data, error }
  }
}

// Budget Services
export const budgetService = {
  async getBudgetPlans(userId) {
    const { data, error } = await supabase
      .from('budget_plans')
      .select('*')
      .eq('user_id', userId)
      .order('month_year', { ascending: false })
    return { data, error }
  },

  async createBudgetPlan(userId, budgetData) {
    const { data, error } = await supabase
      .from('budget_plans')
      .insert([{ user_id: userId, ...budgetData }])
      .select()
      .single()
    return { data, error }
  },

  async updateBudgetPlan(userId, monthYear, budgetData) {
    const { data, error } = await supabase
      .from('budget_plans')
      .upsert([{
        user_id: userId,
        month_year: monthYear,
        ...budgetData,
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    return { data, error }
  }
}