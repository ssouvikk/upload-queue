// File: src/services/dbService.js
// Service for handling database operations using Supabase with error handling and logging

const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');
const logger = require('../config/logger');

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

module.exports = {
    saveLogStats: async (logData) => {
        try {
            const { data, error } = await supabase.from('log_stats').insert(logData);
            if (error) {
                logger.error('Error saving log stats: ' + error.message);
                throw error;
            }
            return data;
        } catch (error) {
            logger.error('Error in saveLogStats: ' + error.message);
            throw error;
        }
    },

    fetchAggregatedStats: async () => {
        try {
            const { data, error } = await supabase.from('log_stats').select('*');
            if (error) {
                logger.error('Error fetching aggregated stats: ' + error.message);
                throw error;
            }
            return data;
        } catch (error) {
            logger.error('Error in fetchAggregatedStats: ' + error.message);
            throw error;
        }
    },

    fetchJobStats: async (jobId) => {
        try {
            const { data, error } = await supabase.from('log_stats').select('*').eq('job_id', jobId);
            if (error) {
                logger.error('Error fetching job stats: ' + error.message);
                throw error;
            }
            return data;
        } catch (error) {
            logger.error('Error in fetchJobStats: ' + error.message);
            throw error;
        }
    },
};
