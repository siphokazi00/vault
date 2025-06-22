import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  transactionService,
  goalService,
  savingsService,
  debtService,
  subscriptionService,
  insuranceService,
  taxService,
  budgetService
} from '../services/supabaseService'

export const useTransactions = (type = null) => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchTransactions()
    }
  }, [user, type])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const { data, error } = await transactionService.getTransactions(user.id, type)
      if (error) throw error
      setTransactions(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (transactionData) => {
    try {
      const { data, error } = await transactionService.createTransaction(user.id, transactionData)
      if (error) throw error
      setTransactions(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  return { transactions, loading, error, addTransaction, refetch: fetchTransactions }
}

export const useGoals = () => {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchGoals()
    }
  }, [user])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      const { data, error } = await goalService.getGoals(user.id)
      if (error) throw error
      setGoals(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const addGoal = async (goalData) => {
    try {
      const { data, error } = await goalService.createGoal(user.id, goalData)
      if (error) throw error
      setGoals(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  const updateGoal = async (id, goalData) => {
    try {
      const { data, error } = await goalService.updateGoal(id, goalData)
      if (error) throw error
      setGoals(prev => prev.map(goal => goal.id === id ? data : goal))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }

  return { goals, loading, error, addGoal, updateGoal, refetch: fetchGoals }
}

export const useSavingsAccounts = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchAccounts()
    }
  }, [user])

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      const { data, error } = await savingsService.getSavingsAccounts(user.id)
      if (error) throw error
      setAccounts(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { accounts, loading, error, refetch: fetchAccounts }
}

export const useDebts = () => {
  const [debts, setDebts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchDebts()
    }
  }, [user])

  const fetchDebts = async () => {
    try {
      setLoading(true)
      const { data, error } = await debtService.getDebts(user.id)
      if (error) throw error
      setDebts(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { debts, loading, error, refetch: fetchDebts }
}

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchSubscriptions()
    }
  }, [user])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const { data, error } = await subscriptionService.getSubscriptions(user.id)
      if (error) throw error
      setSubscriptions(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { subscriptions, loading, error, refetch: fetchSubscriptions }
}

export const useInsurancePolicies = () => {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchPolicies()
    }
  }, [user])

  const fetchPolicies = async () => {
    try {
      setLoading(true)
      const { data, error } = await insuranceService.getInsurancePolicies(user.id)
      if (error) throw error
      setPolicies(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { policies, loading, error, refetch: fetchPolicies }
}

export const useTaxData = () => {
  const [taxRecords, setTaxRecords] = useState([])
  const [deductionsTracker, setDeductionsTracker] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchTaxData()
    }
  }, [user])

  const fetchTaxData = async () => {
    try {
      setLoading(true)
      const [taxResult, deductionsResult] = await Promise.all([
        taxService.getTaxRecords(user.id),
        taxService.getDeductionsTracker(user.id, new Date().getFullYear())
      ])
      
      if (taxResult.error) throw taxResult.error
      if (deductionsResult.error) throw deductionsResult.error
      
      setTaxRecords(taxResult.data || [])
      setDeductionsTracker(deductionsResult.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { taxRecords, deductionsTracker, loading, error, refetch: fetchTaxData }
}

export const useBudgetPlans = () => {
  const [budgetPlans, setBudgetPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchBudgetPlans()
    }
  }, [user])

  const fetchBudgetPlans = async () => {
    try {
      setLoading(true)
      const { data, error } = await budgetService.getBudgetPlans(user.id)
      if (error) throw error
      setBudgetPlans(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { budgetPlans, loading, error, refetch: fetchBudgetPlans }
}