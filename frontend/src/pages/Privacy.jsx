import React from 'react'

const Privacy = () => {
    return (
        <div className="py-20 px-4 sm:px-[6%]">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
                <p className="text-slate-500 mb-2">
                    Last Updated: August 1, 2026
                </p>

                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mt-8">
                    <h2>What Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, including your name, email address, phone number,
                        medical history, and any information stored in your Health Card.
                    </p>

                    <h2>How We Use Your Information</h2>
                    <ul>
                        <li>To provide, maintain, and improve our services</li>
                        <li>To authenticate your account and keep it secure</li>
                        <li>To process and manage your appointment bookings</li>
                        <li>To store and share your medical records as you authorize</li>
                        <li>To communicate with you about appointments and service updates</li>
                    </ul>

                    <h2>Information Sharing</h2>
                    <p>
                        We do not sell your personal information. We may share your medical information only with:
                        healthcare providers you authorize, pharmacy partners you select, and as required by law.
                        All data is encrypted end-to-end (AES-256).
                    </p>

                    <h2>Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal data at any time through your
                        patient portal. You can also export your full medical record in standard formats.
                    </p>

                    <h2>Data Security</h2>
                    <p>
                        MedicoPlus uses industry-standard encryption and security measures including:
                        TLS 1.3 encryption in transit, AES-256 encryption at rest, regular security audits,
                        HIPAA compliance certifications, and strict access controls.
                    </p>

                    <h2>Cookies</h2>
                    <p>
                        We use cookies and similar technologies to authenticate sessions and remember your preferences.
                        You can manage cookie settings through your browser.
                    </p>

                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                        privacy@medicoplus.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Privacy
