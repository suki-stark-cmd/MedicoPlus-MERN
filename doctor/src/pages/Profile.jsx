import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { User, Mail, Phone, Stethoscope, GraduationCap, Calendar, MapPin, Save, Globe } from 'lucide-react'

const SPECIALITIES = [
  'General physician', 'Gynecologist', 'Dermatologist', 'Pediatrician',
  'Neurologist', 'Gastroenterologist', 'Cardiologist', 'Orthopedic',
  'ENT Specialist', 'Ophthalmologist', 'Dentist', 'Psychiatrist'
]

const DEGREES = ['MBBS', 'MD', 'MS', 'FRCS', 'MBBS, MD', 'MBBS, MS']

const Profile = () => {
  const { dToken, backendUrl } = useContext(DoctorContext)
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    speciality: '',
    degree: '',
    experience: '',
    about: '',
    fees: '',
    address1: '',
    address2: '',
    languagesSpoken: ['en'],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { dToken }
      })
      if (data.success) {
        setProfile(data.doctor)
        setFormData({
          name: data.doctor.name || '',
          email: data.doctor.email || '',
          phone: data.doctor.phone || '',
          speciality: data.doctor.speciality || '',
          degree: data.doctor.degree || '',
          experience: data.doctor.experience || '',
          about: data.doctor.about || '',
          fees: data.doctor.fees || '',
          address1: data.doctor.address?.line1 || '',
          address2: data.doctor.address?.line2 || '',
          languagesSpoken: data.doctor.languagesSpoken || ['en'],
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (dToken) {
      fetchProfile()
    }
  }, [dToken])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLangChange = (lang) => {
    setFormData((prev) => {
      const langs = prev.languagesSpoken.includes(lang)
        ? prev.languagesSpoken.filter((l) => l !== lang)
        : [...prev.languagesSpoken, lang]
      return { ...prev, languagesSpoken: langs }
    })
  }

  const saveProfile = async () => {
    setSaving(true)
    try {
      const payload = {
        name: formData.name,
        speciality: formData.speciality,
        degree: formData.degree,
        experience: formData.experience,
        about: formData.about,
        fees: formData.fees,
        address: JSON.stringify({
          line1: formData.address1,
          line2: formData.address2,
        }),
        languagesSpoken: formData.languagesSpoken,
        phone: formData.phone,
      }

      const { data } = await axios.put(
        `${backendUrl}/api/doctor/profile`,
        payload,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success('Profile updated successfully')
        setProfile(data.doctor)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card rounded-xl p-6">
          <div className="p-8 text-center text-gray-400">Loading profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Doctor Profile</h1>

      <div className="glass-card rounded-2xl p-6 border border-gray-200">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-indigo-100">
            {profile?.image ? (
              <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-300" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{profile?.name || 'Dr. Name'}</h2>
            <p className="text-gray-500">{profile?.speciality || 'Speciality'}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 text-xs rounded-full ${
                profile?.verificationStatus === 'verified'
                  ? 'bg-emerald-100 text-emerald-700'
                  : profile?.verificationStatus === 'rejected'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {profile?.verificationStatus || 'pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Dr. Jane Doe"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                placeholder="doctor@example.com"
                readOnly
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4" /> Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+1 234 567 890"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Stethoscope className="w-4 h-4" /> Speciality
              </label>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {SPECIALITIES.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
                {formData.speciality && !SPECIALITIES.includes(formData.speciality) && (
                  <option value={formData.speciality}>{formData.speciality}</option>
                )}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <GraduationCap className="w-4 h-4" /> Degree
              </label>
              <select
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {DEGREES.map((deg) => (
                  <option key={deg} value={deg}>{deg}</option>
                ))}
                {formData.degree && !DEGREES.includes(formData.degree) && (
                  <option value={formData.degree}>{formData.degree}</option>
                )}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4" /> Experience
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Array.from({ length: 20 }, (_, i) => {
                  const val = `${i + 1} Year${i > 0 ? 's' : ''}`
                  return <option key={val} value={val}>{val}</option>
                })}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                Consultation Fees ($)
              </label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. 50"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4" /> Address
              </label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                placeholder="Address line 1"
              />
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Address line 2"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Globe className="w-4 h-4" /> Languages Spoken
              </label>
              <div className="flex flex-wrap gap-2">
                {['en', 'es', 'fr', 'de', 'hi', 'zh'].map((lang) => {
                  const labels = {
                    en: 'English', es: 'Spanish', fr: 'French',
                    de: 'German', hi: 'Hindi', zh: 'Chinese'
                  }
                  const selected = formData.languagesSpoken.includes(lang)
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLangChange(lang)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                        selected
                          ? 'bg-indigo-500 text-white border-indigo-500'
                          : 'text-gray-600 border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {labels[lang]}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Stethoscope className="w-4 h-4" /> About
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                rows={6}
                placeholder="Write a brief bio about your practice..."
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Verification Status</h3>
              <p className="text-sm text-gray-600">
                Current status: <strong>{profile?.verificationStatus || 'pending'}</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Your profile must be verified by an administrator before patients can book appointments.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button
            onClick={saveProfile}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #0d9481 100%)'
            }}
          >
            {saving ? 'Saving...' : (
              <>
                <Save className="w-4 h-4" />
                Save Profile
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
