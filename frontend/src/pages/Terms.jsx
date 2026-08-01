import React from 'react'

const Terms = () => {
    return (
        <div className="py-20 px-4 sm:px-[6%]">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
                <p className="text-slate-500 mb-2">
                    Last Updated: August 1, 2026
                </p>

                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mt-8">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the MedicoPlus platform, you agree to be bound by these Terms of Service.
                        If you do not agree, you may not use our services.
                    </p>

                    <h2>2. Eligibility</h2>
                    <p>
                        You must be at least 18 years old to create an account. By using our services, you represent
                        and warrant that you have the right, authority, and capacity to enter into this agreement.
                    </p>

                    <h2>3. Doctor Verification</h2>
                    <p>
                        MedicoPlus verifies the credentials of all doctors on our platform. However, we are not a
                        licensing body and make no representations about the suitability of any doctor for your needs.
                    </p>

                    <h2>4. Appointment Booking and Cancellation</h2>
                    <p>
                        You can book appointments through our platform. Cancellations must be made at least 24 hours
                        prior to the appointment time. No-shows or late cancellations may incur fees charged by the doctor.
                    </p>

                    <h2>5. Health Information</h2>
                    <p>
                        The MedicoPlus Health Card stores your medical information. You are responsible for ensuring
                        the accuracy of this information. We are not liable for any adverse outcomes from reliance on
                        information stored in your Health Card.
                    </p>

                    <h2>6. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, MedicoPlus shall not be liable for any indirect, incidental,
                        special, or consequential damages, including lost profits, data, or use, arising from your use
                        of our services.
                    </p>

                    <h2>7. Termination</h2>
                    <p>
                        We may terminate or suspend your account at any time, with or without cause, with or without notice.
                    </p>

                    <h2>8. Governing Law</h2>
                    <p>
                        These Terms are governed by the laws of the State of New York, without regard to conflict of law principles.
                    </p>

                    <h2>9. Changes to Terms</h2>
                    <p>
                        We may update these Terms from time to time. We will notify you by posting the updated date above.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Terms
