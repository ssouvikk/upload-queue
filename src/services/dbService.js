// File: src/services/dbService.js
// Service for handling database operations using Supabase

import { createClient } from '@supabase/supabase-js';
const config = require('../config/config');

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export const saveLogStats = async (logData) => {
    // Insert processed log data into the log_stats table
    const { data, error } = await supabase
        .from('log_stats')
        .insert(logData);
    if (error) {
        console.error('Error saving log stats:', error);
        throw error;
    }
    return data;
};

// Existing functions for fetching stats can remain here...
export const fetchAggregatedStats = async () => {
    const { data, error } = await supabase.from('log_stats').select('*');
    if (error) throw error;
    return data;
};

export const fetchJobStats = async (jobId) => {
    const { data, error } = await supabase.from('log_stats').select('*').eq('job_id', jobId);
    if (error) throw error;
    return data;
};
