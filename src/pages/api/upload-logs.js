// pages/api/upload-logs.js
import nextConnect from 'next-connect';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../lib/supabaseClient';
import { enqueueLogFile } from '../../lib/bullmq';

// Multer সেটআপ: আমরা memory storage ব্যবহার করছি যাতে আপলোড হওয়া ফাইলটি Buffer আকারে থাকে।
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // উদাহরণস্বরূপ: 50MB ফাইল সাইজ লিমিট
});

const apiRoute = nextConnect({
    onError(error, req, res, next) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Server error occurred' });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    },
});

// Next.js-এ default body parser বন্ধ করতে হবে যাতে Multer সঠিকভাবে কাজ করে।
export const config = {
    api: {
        bodyParser: false,
    },
};

apiRoute.use(upload.single('file')); // 'file' হলো form data field এর নাম

apiRoute.post(async (req, res) => {
    try {
        // ফাইলটি পাওয়া যাচ্ছে কিনা যাচাই করুন
        if (!req.file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        // অতিরিক্ত ফাইল ভ্যালিডেশন করতে পারেন (যেমন ফাইল টাইপ, ফাইল সাইজ ইত্যাদি)

        // একটি ইউনিক fileId তৈরি করুন
        const fileId = uuidv4();
        const fileName = `${fileId}-${req.file.originalname}`;

        // Supabase Storage-এ ফাইল আপলোড করুন
        const { data, error: uploadError } = await supabase
            .storage
            .from('logs') // নিশ্চিত করুন যে আপনার Supabase Storage bucket এর নাম 'logs'
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
            });

        if (uploadError) {
            console.error('Supabase Upload Error:', uploadError);
            return res.status(500).json({ error: uploadError.message });
        }

        // Supabase Storage থেকে ফাইলের path গ্রহণ করুন
        const filePath = data.path;

        // BullMQ কিউতে জব enqueue করুন
        const job = await enqueueLogFile({ fileId, filePath });

        // সফল রেসপন্স রিটার্ন করুন
        res.status(200).json({ jobId: job.id, fileId, filePath });
    } catch (error) {
        console.error('Upload API Error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default apiRoute;
