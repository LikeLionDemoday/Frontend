import axiosInstance from './axios';

/**
 * API Service helper functions for common HTTP operations
 * Provides a consistent interface for making API requests
 */

const apiService = {
  /**
   * GET request
   * @param {string} url - The endpoint URL
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  get: async (url, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * POST request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request body data
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  post: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * PUT request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request body data
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  put: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * PATCH request
   * @param {string} url - The endpoint URL
   * @param {object} data - Request body data
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  patch: async (url, data, config = {}) => {
    try {
      const response = await axiosInstance.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * DELETE request
   * @param {string} url - The endpoint URL
   * @param {object} config - Optional axios config
   * @returns {Promise} Response data
   */
  delete: async (url, config = {}) => {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload file with FormData
   * @param {string} url - The endpoint URL
   * @param {FormData} formData - Form data containing files
   * @returns {Promise} Response data
   */
  upload: async (url, formData) => {
    try {
      const response = await axiosInstance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
