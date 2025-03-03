// lib/bullmq.js
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

export const logQueue = new Queue('log-processing-queue', { connection });

export async function enqueueLogFile({ fileId, filePath }) {
    // জব মেটাডাটা হিসেবে fileId ও filePath সংযুক্ত করুন, প্রয়োজনে অতিরিক্ত ফিল্ডও দিতে পারেন।
    const job = await logQueue.add('process-log', { fileId, filePath }, {
        attempts: 3,       // retry limit
        priority: 1,       // ছোট ফাইলের জন্য প্রাধান্য দিতে পারেন (প্রয়োজন অনুযায়ী সেট করুন)
    });
    return job;
}
