import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const adminService = {
    // Get dashboard stats
    getDashboardStats: async () => {
        const response = await axios.get(`${API_URL}/admin/dashboard`, {
            withCredentials: true
        })
        return response
    },

    // Get all users
    getUsers: async (params?: { role?: string, search?: string, page?: number, limit?: number }) => {
        const response = await axios.get(`${API_URL}/admin/users`, {
            params,
            withCredentials: true
        })
        return response
    },

    // Update user
    updateUser: async (userId: string, data: { isActive?: boolean, role?: string }) => {
        const response = await axios.put(`${API_URL}/admin/users/${userId}`, data, {
            withCredentials: true
        })
        return response
    },

    // Get pending courses
    getPendingCourses: async () => {
        const response = await axios.get(`${API_URL}/admin/courses/pending`, {
            withCredentials: true
        })
        return response
    },

    // Approve course
    approveCourse: async (courseId: string) => {
        const response = await axios.put(`${API_URL}/admin/courses/${courseId}/approve`, {}, {
            withCredentials: true
        })
        return response
    },

    // Reject course
    rejectCourse: async (courseId: string, reason: string) => {
        const response = await axios.put(`${API_URL}/admin/courses/${courseId}/reject`, { reason }, {
            withCredentials: true
        })
        return response
    }
}
