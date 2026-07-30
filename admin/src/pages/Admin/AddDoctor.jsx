import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddDoctor = () => {
  const { aToken, backendUrl } = useContext(AdminContext)
  const [docImg, setDocImg] = useState(null)
  const [docImgPreview, setDocImgPreview] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Year',
    about: '',
    fees: '',
    address1: '',
    address2: ''
  })
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setDocImg(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDocImgPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    
    if (!docImg) {
      toast.error('Please upload a doctor image')
      return
    }

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill all required fields')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    
    try {
      const formDataObj = new FormData()
      formDataObj.append('image', docImg)
      formDataObj.append('name', formData.name)
      formDataObj.append('email', formData.email)
      formDataObj.append('password', formData.password)
      formDataObj.append('speciality', formData.speciality)
      formDataObj.append('degree', formData.degree)
      formDataObj.append('experience', formData.experience)
      formDataObj.append('about', formData.about)
      formDataObj.append('fees', formData.fees)
      formDataObj.append('address', JSON.stringify({
        line1: formData.address1,
        line2: formData.address2
      }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formDataObj, {
        headers: { aToken }
      })

      if (data.success) {
        toast.success(data.message)
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          speciality: 'General physician',
          degree: 'MBBS',
          experience: '4 Year',
          about: '',
          fees: '',
          address1: '',
          address2: ''
        })
        setDocImg(null)
        setDocImgPreview('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium text-gray-800">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded-xl shadow-sm w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {docImgPreview ? (
                <img className="w-full h-full rounded-full object-cover" src={docImgPreview} alt="Preview" />
              ) : (
                <img className="w-10" src={assets.upload_area} alt="" />
              )}
            </div>
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="text-sm">Upload doctor picture</p>
        </div>

        {/* Form Sections */}
        <div className="flex flex-col lg:flex-row gap-10 text-gray-600">
          {/* Left Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div>
              <p className="mb-1 text-sm font-medium">Doctor name</p>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Doctor Email</p>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Doctor Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password (min 8 chars)"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Speciality</p>
              <select
                name="speciality"
                value={formData.speciality}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Degree</p>
              <input
                type="text"
                name="degree"
                placeholder="e.g. MBBS, MD"
                value={formData.degree}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Experience</p>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={`${i + 1} Year`}>
                    {i + 1} {i === 0 ? 'Year' : 'Years'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">Fees</p>
              <input
                type="number"
                name="fees"
                placeholder="e.g. 50"
                value={formData.fees}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div>
              <p className="mb-1 text-sm font-medium">Address</p>
              <input
                type="text"
                name="address1"
                placeholder="Address line 1"
                value={formData.address1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address2"
                placeholder="Address line 2"
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-medium">About Doctor</p>
              <textarea
                name="about"
                placeholder="Write about the doctor..."
                rows={5}
                value={formData.about}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Doctor...' : 'Add Doctor'}
        </button>
      </div>
    </form>
  )
}

export default AddDoctor