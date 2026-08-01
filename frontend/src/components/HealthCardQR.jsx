import React, { useState } from 'react'

const HealthCardQR = ({ patientId, size = 'md' }) => {
    const [copied, setCopied] = useState(false)

    const qrData = `medicoplus://patient/${patientId || 'unknown'}`
    const qrSizeClass = size === 'sm' ? 'w-20 h-20' : size === 'lg' ? 'w-40 h-40' : 'w-32 h-32'

    const handleCopy = () => {
        navigator.clipboard.writeText(qrData)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Simple SVG-based placeholder QR code pattern
    // In production, replace with a real QR library (e.g., qrcode.react)
    const generateQRPattern = (data) => {
        // Generate a deterministic pattern based on data
        let hash = 0
        for (let i = 0; i < data.length; i++) {
            hash = ((hash << 5) - hash + data.charCodeAt(i)) & 0xffffffff
        }

        const modules = []
        const size = 21
        for (let y = 0; y < size; y++) {
            const row = []
            for (let x = 0; x < size; x++) {
                const bit = (hash + (x * 7) + (y * 13)) % 3 === 0
                row.push(bit)
            }
            modules.push(row)
        }

        return { modules, size }
    }

    const qrCode = generateQRPattern(qrData)

    const handleNFC = () => {
        // NFC sharing handled by browser NDEF API when supported
        if (navigator.ndef && navigator.ndef.write) {
            navigator.ndef.write({
                records: [{
                    recordType: 'url',
                    data: `https://medicoplus.com/patient/${patientId || 'unknown'}`
                }]
            })
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } else {
            handleCopy()
        }
    }

    return (
        <div className={`flex flex-col items-center gap-3 ${qrSizeClass.replace('w-', 'w-').replace('h-', 'h-')}`}>
            <div className={`${qrSizeClass} bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center p-1.5 relative group`}>
                {/* SVG QR Code */}
                <svg
                    className="w-full h-full object-contain"
                    viewBox={`0 0 ${qrCode.size} ${qrCode.size}`}
                    shapeRendering="pixelated"
                >
                    {qrCode.modules.map((row, y) =>
                        row.map((bit, x) =>
                            bit ? (
                                <rect
                                    key={`${x}-${y}`}
                                    x={x}
                                    y={y}
                                    width="1"
                                    height="1"
                                    fill="#1e3a8a"
                                />
                            ) : null
                        )
                    )}
                </svg>

                {/* Tap to NFC hint on hover */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                    <span className="text-[8px] text-white text-center">Tap for NFC</span>
                </div>
            </div>

            <button
                onClick={handleNFC}
                className="text-xs text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
                <span>{copied ? 'Copied!' : 'Share Health Card'}</span>
            </button>

            <p className="text-[10px] text-slate-400 text-center max-w-[120px] break-all">
                {qrData}
            </p>
        </div>
    )
}

export default HealthCardQR
