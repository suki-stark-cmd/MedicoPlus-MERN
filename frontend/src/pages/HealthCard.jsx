import React from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, Shield, Upload, Share2, Globe, Check, QrCode } from 'lucide-react'

const HealthCard = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="text-center py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
                    Your Digital <span className="gradient-text">Health Card</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
                    The MedicoPlus Health Card uses NFC and QR technology to store and share your medical information instantly — for people away from home.
                </p>
                <Link
                    to="/doctors"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                    Get Started
                </Link>
            </section>

            {/* How NFC/QR Works */}
            <section className="py-16 px-4 sm:px-[6%] max-w-5xl mx-auto">
                <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">
                    How It <span className="gradient-text">Works</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                            <QrCode className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Scan or Tap</h3>
                        <p className="text-sm text-slate-500">Tap your NFC-enabled phone on any NFC terminal or scan your unique QR code.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                            <Shield className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Encrypted Data</h3>
                        <p className="text-sm text-slate-500">Your data is encrypted end-to-end and only accessible with your consent.</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-50 flex items-center justify-center mb-4">
                            <Share2 className="w-8 h-8 text-cyan-600" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Instant Share</h3>
                        <p className="text-sm text-slate-500">Share prescriptions, records, or insurance info instantly with any provider.</p>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-extrabold text-slate-900">
                                What Makes It <span className="gradient-text">Special</span>
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-white shadow-sm mt-0.5">
                                        <Globe className="w-5 h-5 text-blue-600" />
                                    </div>
                                  <div>
                                        <p className="font-semibold text-slate-900">Multi-Language Support</p>
                                        <p className="text-sm text-slate-500">Communicates in 6+ languages for seamless international care.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-white shadow-sm mt-0.5">
                                        <Shield className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">No Substitution Guarantee</p>
                                        <p className="text-sm text-slate-500">You always see the doctor you book — never a substitute.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-white shadow-sm mt-0.5">
                                        <Upload className="w-5 h-5 text-cyan-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">Paperless Healthcare</p>
                                        <p className="text-sm text-slate-500">All records digital and always with you. No more lost papers.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
                                <div className="flex justify-center mb-4">
                                    {/* Visual representation of health card */}
                                    <div className="relative w-64 h-40 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white">
                                        <div className="text-center">
                                            <QrCode className="w-16 h-16 mx-auto mb-2" />
                                            <p className="text-sm font-medium">MedicoPlus Health Card</p>
                                            <p className="text-xs opacity-80">Tap to share your records</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-16 px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready for paperless healthcare?</h2>
                <p className="text-slate-500 mb-6">Join thousands of patients who travel with confidence.</p>
                <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                    Sign Up Now
                </Link>
            </section>
        </div>
    )
}

export default HealthCard
