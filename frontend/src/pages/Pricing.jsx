import React from 'react'
import { Check, Star, Zap, Shield } from 'lucide-react'

const Pricing = () => {
    const plans = [
        {
            name: 'Basic',
            subtitle: 'For individuals',
            price: '$0',
            period: 'Forever',
            features: ['Unlimited doctor search', 'Basic booking', 'Email notifications', 'Digital health card'],
            notIncluded: ['NFC card', 'AI symptom checker', 'Priority booking', 'Prescription delivery'],
            cta: 'Get Started Free',
            popular: false,
        },
        {
            name: 'Premium',
            subtitle: 'For power users',
            price: '$9.99',
            period: 'per month',
            features: ['All Basic features', 'NFC health card', 'AI symptom checker', 'Priority booking', 'Prescription delivery', 'Pharmacy finder', 'Multi-language health records'],
            notIncluded: [],
            cta: 'Start Free Trial',
            popular: true,
        },
        {
            name: 'Family',
            subtitle: 'For families',
            price: '$19.99',
            period: 'per month',
            features: ['All Premium features', 'Up to 5 family members', 'Family health dashboard', 'Emergency access profile', '24/7 priority support'],
            notIncluded: [],
            cta: 'Start Free Trial',
            popular: false,
        },
    ]

    return (
        <div className="py-20 px-4 sm:px-[6%]">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
                    Simple, Transparent <span className="gradient-text">Pricing</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-12">
                    Choose the plan that fits your healthcare needs. Start with our free Basic plan or upgrade for advanced features.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl border-2 p-8 shadow-sm hover:shadow-xl transition-shadow flex flex-col ${
                                plan.popular
                                    ? 'border-blue-600'
                                    : 'border-slate-200'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-full">
                                        <Star className="w-3 h-3 fill-amber-300" />
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">{plan.name}</h2>
                                <p className="text-slate-500 text-sm mt-1">{plan.subtitle}</p>
                                <div className="mt-4">
                                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                                    <span className="text-slate-500 text-sm"> {plan.period}</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <ul className="space-y-3 text-left mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.notIncluded.map((feature, idx) => (
                                        <li key={`not-${idx}`} className="flex items-center gap-2 text-sm">
                                            <span className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-slate-400 line-through">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                                plan.popular
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/20'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pricing
