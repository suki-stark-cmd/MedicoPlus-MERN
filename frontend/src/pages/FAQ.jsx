import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            question: 'Do I need to create an account to browse doctors?',
            answer: 'No. You can search and browse all doctors on MedicoPlus without an account. You only need to login or create an account when you want to book an appointment or access your patient portal.',
        },
        {
            question: 'What is the MedicoPlus Health Card?',
            answer: 'The Health Card is your digital medical ID. It stores your medical history, prescriptions, and health information using NFC and QR code technology. You can share your records instantly with any doctor or pharmacy by tapping or scanning.',
        },
        {
            question: 'How does the "No Substitution" guarantee work?',
            answer: 'When you book a specific doctor, you are guaranteed to see that exact doctor. We never substitute your appointment with another provider. If the doctor is unavailable due to an emergency, we will notify you immediately and offer a reschedule or full refund.',
        },
        {
            question: 'What languages do doctors speak?',
            answer: 'Our doctor network supports English, Spanish, French, German, Hindi, and Mandarin. You can filter doctors by the language you speak on the doctor listing page, and select your preferred language during onboarding.',
        },
        {
            question: 'Can I cancel or reschedule an appointment?',
            answer: 'Yes. You can cancel or reschedule appointments up to 24 hours before your scheduled time through your patient portal. Cancellations within 24 hours may incur a fee depending on the doctor\'s policy.',
        },
        {
            question: 'Is my medical information secure?',
            answer: 'Yes. We use bank-level encryption (AES-256) to protect your data. All medical records are stored securely and are only accessible to you and the healthcare providers you authorize. We are fully HIPAA compliant.',
        },
        {
            question: 'How do I pay for appointments?',
            answer: 'You can pay online using credit/debit cards, UPI, or net banking. Payment is collected at the time of booking. If you have a Premium or Family subscription, certain discounts may apply.',
        },
        {
            question: 'Can I book appointments for family members?',
            answer: 'Yes. With the Family plan, you can manage appointments and health records for up to 5 family members from a single account.',
        },
    ]

    return (
        <div className="py-16 px-4 sm:px-[6%]">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Everything you need to know about MedicoPlus. If you can't find what you're looking for, contact us.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                >
                                    <h3 className="text-lg font-semibold text-slate-900">{faq.question}</h3>
                                    {isOpen ? (
                                        <Minus className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    )}
                                </button>
                                <div
                                    className={`px-6 transition-all duration-300 overflow-hidden ${
                                        isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <p className="text-slate-500 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Contact CTA */}
                <div className="text-center mt-12">
                    <p className="text-slate-500">Still have questions?</p>
                    <button
                        onClick={() => window.location.href = '/contact'}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Contact our support team
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FAQ
