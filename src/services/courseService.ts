import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const courseService = {
    // Create a new course
    createCourse: async (courseData: any) => {
        const response = await axios.post(`${API_URL}/courses`, courseData, {
            withCredentials: true
        })
        return response
    },

    // Get all courses for the current mentor
    getMyCourses: async () => {
        const response = await axios.get(`${API_URL}/courses/mentor/me`, {
            withCredentials: true
        })
        return response
    },

    // Get students for a specific course
    getCourseStudents: async (courseId: string) => {
        const response = await axios.get(`${API_URL}/courses/${courseId}/students`, {
            withCredentials: true
        })
        return response
    },

    // Get all students for the current mentor (across all courses)
    getMyStudents: async () => {
        const response = await axios.get(`${API_URL}/courses/mentor/students`, {
            withCredentials: true
        })
        return response
    },

    // Update a course
    updateCourse: async (courseId: string, courseData: any) => {
        const response = await axios.put(`${API_URL}/courses/${courseId}`, courseData, {
            withCredentials: true
        })
        return response
    },

    // Submit course for review
    submitCourse: async (courseId: string) => {
        const response = await axios.post(`${API_URL}/courses/${courseId}/submit`, {}, {
            withCredentials: true
        })
        return response
    }
}
