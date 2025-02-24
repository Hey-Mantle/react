export const PlanAvailability = {
  Public: "public",
  CustomerTag: "customerTag",
  ShopifyPlan: "shopifyPlan",
  Customer: "customer",
  Hidden: "hidden",
} as const;

export const Labels = {
  AmountPerInterval: "{{ amount }} per {{ interval }}",
  Back: "Back",
  Cancel: "Cancel",
  CancelConfirmation: "Are you sure you want to cancel your subscription?",
  CancelPlan: "Cancel plan",
  ChangePlan: "Change plan",
  CurrentPlan: "Current plan",
  CustomPlans: "Custom plans",
  CustomPlansDescription: "Plans tailored to your specific needs",
  DiscountAmount: "{{ amount }} discount",
  DiscountAmountExpired: "{{ amount }} discount expired",
  FreeTrialLength: "{{ trialDays }}-day free trial",
  Features: "Features",
  Month: "month",
  MonthShort: "mo",
  Monthly: "Monthly",
  NextBillingDate: "Next billing date",
  NotSubscribed: "You're not subscribed to a plan yet.",
  Year: "year",
  YearShort: "yr",
  Yearly: "Yearly",
  MostPopular: "Most popular",
  Per: "/",
  Plans: "Plans",
  Price: "Price",
  SelectPlan: "Select plan",
  SubscribeSuccessTitle: "Subscription successful",
  SubscribeSuccessBody: "Thanks for subscribing to our app!",
  Subscription: "Subscription",
  SubscriptionCancelled: "Subscription cancelled",
  UsageCharges: "Usage charges",

  // Common
  loading: "Loading...",
  error: "An error occurred",
  retry: "Retry",
  cancel: "Cancel",
  continue: "Continue",
  
  // Subscription
  subscribe: "Subscribe",
  subscribeNow: "Subscribe Now",
  upgradeNow: "Upgrade Now",
  manageSubscription: "Manage Subscription",
  cancelSubscription: "Cancel Subscription",
  
  // Payment
  addPaymentMethod: "Add Payment Method",
  updatePaymentMethod: "Update Payment Method",
  
  // Features
  featureNotAvailable: "This feature is not available on your current plan",
  upgradeRequired: "Upgrade Required",
  limitReached: "Limit Reached",
} as const;
