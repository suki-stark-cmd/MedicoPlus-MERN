import React from 'react'
import { Link } from 'react-router-dom'
import { Building2, Package, Truck, Phone, Mail, MapPin, Globe } from 'lucide-react'

const ForPharmacies = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="gradient-hero text-white py-20 px-4 text-center">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
                        For <span className="text-cyan-200">Pharmacy Partners</span>
                    </h1>
                    <p className="text-slate-100 text-lg mb-8 max-w-2xl mx-auto">
                        Connect your pharmacy to MedicoPlus patients. Enable prescription fulfillment, medication delivery, and seamless health record integration.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        Partner With Us
                    </Link>
                </div>
            </section>

            {/* Partnership Benefits */}
            <section className="py-16 px-4 sm:px-[6%] bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                            Pharmacy <span className="gradient-text">Partnership Benefits</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                                <Package className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Direct Prescription Fulfillment</h3>
                            <p className="text-sm text-slate-500">Patients can send prescriptions directly to your pharmacy from their MedicoPlus health record.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                                <Truck className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Medication Delivery Integration</h3>
                            <p className="text-sm text-slate-500">Integrate your delivery service directly into the patient's MedicoPlus app for home delivery.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow text-center">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-50 flex items-center justify-center mb-4">
                                <Globe className="w-8 h-8 text-cyan-600" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">Multi-Language Support</h3>
                            <p className="text-sm text-slate-500">Serve multilingual patients with our language-enabled platform and translated interfaces.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4 sm:px-[6%] text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                        Ready to Partner?
                    </h2>
                    <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                        Join our growing network of pharmacy partners. Contact our partnership team to get started.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-600">
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-blue-600" />
                            <span>+1 (800) PHARMACY</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-indigo-600" />
                            <span>pharmacy@medicoplus.com</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForPharmacies
