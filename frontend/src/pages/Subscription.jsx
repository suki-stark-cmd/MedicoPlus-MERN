import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Check, Crown, Zap, BadgeCheck, Calendar, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Subscription = () => {
    const { userData, currencySymbol } = useContext(AppContext)
    const navigate = useNavigate()

    const plans = [
        {
            id: 'starter',
            name: 'Starter',
            tagline: 'Basic care access',
            price: { monthly: 0, annual: 0 },
            features: [
                'Book appointments with all verified doctors',
                'Access medical records',
                'Basic prescription downloads',
                'Email notifications'
            ],
            color: 'from-slate-400 to-slate-500',
            icon: <Calendar className="w-5 h-5" />,
            popular: false
        },
        {
            id: 'premium',
            name: 'Premium',
            tagline: 'Complete healthcare experience',
            price: { monthly: 9.99, annual: 7.99 },
            features: [
                'Priority booking with top specialists',
                'Unlimited medical record storage',
                'Digital prescriptions & downloads',
                '24/7 chat support',
                'Family member coverage (up to 5)',
                'NFC Health Card sharing',
                'Exclusive wellness content'
            ],
            color: 'from-blue-600 via-indigo-600 to-cyan-500',
            icon: <Crown className="w-5 h-5" />,
            popular: true
        },
        {
            id: 'pro',
            name: 'Pro',
            tagline: 'Family health suite',
            price: { monthly: 19.99, annual: 15.99 },
            features: [
                'All Premium features',
                'Dedicated health assistant',
                'Annual preventive checkup discounts',
                'Specialist consultation priority',
                'Family member coverage (up to 10)',
                'AI-powered symptom checker',
                'Pharmacy delivery integrations',
                'Early access to new features'
            ],
            color: 'from-amber-500 via-rose-500 to-pink-500',
            icon: <Zap className="w-5 h-5" />,
            popular: false
        }
    ]

    const userPlan = 'premium' // In real app, derive from userData

    const handleSelectPlan = (planId) => {
        if (planId === 'basic') {
            // Stay on free plan
        }
        // In real app, redirect to payment gateway
        console.log('Selected plan:', planId)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-12 px-4 sm:px-[6%]">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        <span>MedicoPlus Membership</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Choose Your <span className="gradient-text">Health Plan</span>
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
                        Unlock premium healthcare benefits tailored to your needs. 
                        Switch plans anytime or cancel with no questions asked.
                    </p>
                </div>

                {/* Current Plan Banner */}
                {userData && (
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-3xl p-6 sm:p-8 text-white">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <p className="text-sm text-blue-100 font-medium">Current Plan</p>
                                <h2 className="text-2xl font-extrabold">{userData.name || 'Patient Name'}</h2>
                                <p className="text-blue-200 text-sm">
                                    You are on the <span className="font-semibold capitalize">{userPlan}</span> plan.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-blue-100">
                                <Calendar className="w-4 h-4" />
                                <span>Renews monthly</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {plans.map((plan) => {
                        const isCurrent = userPlan === plan.id
                        return (
                            <div
                                key={plan.id}
                                className={`relative bg-white/90 backdrop-blur-xl border rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${isCurrent ? 'border-blue-500/40 shadow-blue-500/10 scale-[1.03]' : 'border-slate-100'}`}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-rose-500 text-white px-4 py-1.5 text-xs font-bold rounded-bl-2xl">
                                        MOST POPULAR
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className={`p-6 pb-4 bg-gradient-to-r ${plan.color} text-white rounded-t-3xl flex items-center gap-3`}>
                                    {plan.icon}
                                    <h3 className="text-xl font-bold">{plan.name}</h3>
                                </div>

                                {/* Plan Body */}
                                <div className="p-6 flex flex-col flex-1 space-y-5">
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{plan.tagline}</p>

                                    {/* Price */}
                                    <div className="space-y-1">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-extrabold text-slate-900">{currencySymbol}{plan.price.monthly === 0 ? 'Free' : plan.price.monthly}</span>
                                            {plan.price.monthly > 0 && <span className="text-sm text-slate-500">/ month</span>}
                                        </div>
                                        <p className="text-xs text-slate-400">
                                            {plan.price.annual > 0
                                                ? `Billed annually at ${currencySymbol}${plan.price.annual}/mo when billed yearly`
                                                : 'Forever free'}
                                        </p>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-2.5 flex-1">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                                <span className="text-sm text-slate-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => handleSelectPlan(plan.id)}
                                        className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                                            isCurrent
                                                ? 'bg-slate-100 text-slate-900 cursor-default'
                                                : `bg-gradient-to-r ${plan.color} text-white hover:scale-105 hover:shadow-lg shadow-md`
                                        }`}
                                        disabled={isCurrent}
                                    >
                                        {isCurrent ? 'Current Plan' : plan.price.monthly === 0 ? 'Get Started' : 'Select Plan'}
                                        {plan.price.monthly > 0 && !isCurrent && <CreditCard className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Payment Method Section */}
                <div className="bg-white/90 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Method</h2>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-100 rounded-xl">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">Visa ending in 4242</p>
                                <p className="text-xs text-slate-500">Expires 06/27</p>
                            </div>
                        </div>
                        <button
                            className="px-4 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            Edit
                        </button>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white/90 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Billing Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase">Can I change plans later?</p>
                            <p className="text-slate-600 mt-1">Yes, upgrade or downgrade anytime with no penalties.</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-medium uppercase">What happens if I cancel?</p>
                            <p className="text-slate-600 mt-1">You keep premium features until the end of your billing cycle.</p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    )
}

export default Subscription
