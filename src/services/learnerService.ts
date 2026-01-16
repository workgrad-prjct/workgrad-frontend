import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const learnerService = {
    // Get learner profile
    getProfile: async () => {
        const response = await axios.get(`${API_URL}/learner/profile`, {
            withCredentials: true
        })
        return response
    },

    // Update learner profile
    updateProfile: async (data: any) => {
        const response = await axios.put(`${API_URL}/learner/profile`, data, {
            withCredentials: true
        })
        return response
    },

    // Save resume
    saveResume: async (data: { content: string, pdfUrl?: string }) => {
        const response = await axios.post(`${API_URL}/learner/resume`, data, {
            withCredentials: true
        })
        return response
    },

    // Get my courses
    getMyCourses: async () => {
        const response = await axios.get(`${API_URL}/learner/courses`, {
            withCredentials: true
        })
        return response
    },

    // Get my applications
    getApplications: async (params?: { status?: string, page?: number, limit?: number }) => {
        const response = await axios.get(`${API_URL}/learner/applications`, {
            params,
            withCredentials: true
        })
        return response
    },

    // Get dashboard stats
    getDashboardStats: async () => {
        const response = await axios.get(`${API_URL}/learner/dashboard`, {
            withCredentials: true
        })
        return response
    }
}
