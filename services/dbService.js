// File: services/dbService.js
// Service for handling database operations using Supabase

const { createClient } = require('@supabase/supabase-js');
const config = require('../config/config');

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

exports.fetchAggregatedStats = async () => {
    // Query Supabase for aggregated stats from log_stats table
    const { data, error } = await supabase.from('log_stats').select('*');
    if (error) throw error;
    return data;
};

exports.fetchJobStats = async (jobId) => {
    // Query Supabase for stats of a specific job using jobId
    const { data, error } = await supabase.from('log_stats').select('*').eq('job_id', jobId);
    if (error) throw error;
    return data;
};
