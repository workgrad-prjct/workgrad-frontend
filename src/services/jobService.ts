import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Configure axios instance keys or specific headers if needed
// reusing standard axios for now as AuthContext sets global defaults

export const jobService = {
    // Create a new job
    createJob: async (jobData: any) => {
        const response = await axios.post(`${API_URL}/jobs`, jobData, {
            withCredentials: true
        })
        return response
    },

    // Get all jobs for the current employer
    getMyJobs: async () => {
        const response = await axios.get(`${API_URL}/jobs/employer/me`, {
            withCredentials: true
        })
        return response
    },

    // Get all applications for the current employer (across all jobs)
    getAllApplications: async () => {
        const response = await axios.get(`${API_URL}/jobs/employer/applications`, {
            withCredentials: true
        })
        return response
    },

    // Get applications for a specific job
    getJobApplications: async (jobId: string) => {
        const response = await axios.get(`${API_URL}/jobs/${jobId}/applications`, {
            withCredentials: true
        })
        return response
    },

    // Delete a job
    deleteJob: async (jobId: string) => {
        const response = await axios.delete(`${API_URL}/jobs/${jobId}`, {
            withCredentials: true
        })
        return response
    },

    // Update a job
    updateJob: async (jobId: string, jobData: any) => {
        const response = await axios.put(`${API_URL}/jobs/${jobId}`, jobData, {
            withCredentials: true
        })
        return response
    }
}
