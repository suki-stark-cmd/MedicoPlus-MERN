import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { Send, Bot, User, Loader2 } from 'lucide-react'

const SymptomChecker = () => {
    const { backendUrl, token } = useContext(AppContext)
    const [symptoms, setSymptoms] = useState('')
    const [isChecking, setIsChecking] = useState(false)
    const [result, setResult] = useState(null)

    // Mock AI response for demonstration
    // In production, integrate with an AI service like OpenAI or a medical LLM
    const mockAIResponse = (input) => {
        const suggestions = [
            {
                condition: 'Common Cold',
                severity: 'Mild',
                description: 'Likely a viral upper respiratory infection. Rest, hydration, and over-the-counter remedies can help.',
                recommendation: 'Monitor symptoms for 2-3 days. See a doctor if fever lasts more than 3 days or breathing difficulties occur.',
            },
            {
                condition: 'Migraine',
                severity: 'Moderate',
                description: 'Symptoms align with migraine patterns. Often triggered by stress, diet, or sleep changes.',
                recommendation: 'Rest in a quiet, dark room. Consider over-the-counter pain relief. Track triggers for future prevention.',
            },
        ]

        // Simple keyword matching for mock
        if (input.toLowerCase().includes('headache') || input.toLowerCase().includes('head')) {
            return suggestions[1]
        }
        if (input.toLowerCase().includes('fever') || input.toLowerCase().includes('cold')) {
            return suggestions[0]
        }
        return suggestions[0]
    }

    const handleCheck = async () => {
        if (!symptoms.trim()) return

        setIsChecking(true)
        setResult(null)

        try {
            // In production, send to AI endpoint:
            // const response = await axios.post(`${backendUrl}/api/user/symptom-check`, { symptoms }, { headers: { token } })
            // setResult(response.data)

            // Mock response
            setTimeout(() => {
                const res = mockAIResponse(symptoms)
                setResult(res)
                setIsChecking(false)
            }, 1500)
        } catch (error) {
            console.log(error)
            setIsChecking(false)
        }
    }

    const handleClear = () => {
        setSymptoms('')
        setResult(null)
    }

    return (
        <div className="py-12 px-4 sm:px-[6%] max-w-4xl mx-auto">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-4">
                    <Bot className="w-3.5 h-3.5" />
                    AI-Powered
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
                    Symptom Checker
                </h1>
                <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                    Describe your symptoms and get AI-powered insights about potential conditions. 
                    This tool is for informational purposes only — always consult a healthcare professional for proper diagnosis.
                </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4 mb-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Describe Your Symptoms</label>
                    <textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="e.g., I've had a headache for 2 days, fever, and runny nose..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 resize-none"
                        rows={4}
                    />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    {result && (
                        <button
                            onClick={handleClear}
                            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Clear Results
                        </button>
                    )}
                    <button
                        onClick={handleCheck}
                        disabled={isChecking || !symptoms.trim()}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 cursor-pointer"
                    >
                        {isChecking ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <Bot className="w-4 h-4" />
                                <span>Check Symptoms</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Result */}
            {result && (
                <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-blue-100">
                            <Bot className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">AI Analysis Result</h3>
                            <p className="text-xs text-slate-500">Informational only — not a medical diagnosis</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-100">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xl font-bold text-slate-900">{result.condition}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                result.severity === 'Mild' ? 'bg-emerald-50 text-emerald-600' :
                                result.severity === 'Moderate' ? 'bg-amber-50 text-amber-600' :
                                'bg-rose-50 text-rose-600'
                            }`}>
                                {result.severity}
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-3">{result.description}</p>
                        <div className="p-3 bg-slate-50 rounded-xl">
                            <p className="text-xs font-semibold text-slate-700 mb-1">Recommendation:</p>
                            <p className="text-xs text-slate-600">{result.recommendation}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.href = '/doctors'}
                        className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        Find a Doctor for Consultation
                    </button>
                </div>
            )}
        </div>
    )
}

export default SymptomChecker
