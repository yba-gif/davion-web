const { Client } = require('minio');
const { config } = require('dotenv');
const path = require('path');

// Load environment variables
config({
    path: [
        path.join(process.cwd(), '.env'),
        path.join(process.cwd(), '../../.env'),
    ],
    override: false,
});

async function testMinIOConnection() {
    const minioConfig = {
        endpoint: process.env.MINIO_ENDPOINT || 's3.dw3tr.com',
        port: parseInt(process.env.MINIO_PORT || '443', 10),
        useSSL: process.env.MINIO_USE_SSL !== 'false',
        accessKey: process.env.MINIO_ACCESS_KEY || 'dw3tr',
        secretKey: process.env.MINIO_SECRET_KEY || 'DevOpsRul3z!@#',
        bucketName: process.env.MINIO_BUCKET_NAME || 'uploads',
        publicUrl: process.env.MINIO_PUBLIC_URL || 'https://s3.dw3tr.com',
    };

    console.log('🔧 MinIO Configuration:', {
        endpoint: minioConfig.endpoint,
        port: minioConfig.port,
        useSSL: minioConfig.useSSL,
        bucketName: minioConfig.bucketName,
        publicUrl: minioConfig.publicUrl,
    });

    const client = new Client({
        endPoint: minioConfig.endpoint,
        port: minioConfig.port,
        useSSL: minioConfig.useSSL,
        accessKey: minioConfig.accessKey,
        secretKey: minioConfig.secretKey,
    });

    try {
        console.log('🔄 Testing MinIO connection...');
        const buckets = await client.listBuckets();
        console.log('✅ MinIO connection successful!');
        console.log('📂 Available buckets:', buckets.map(b => b.name));

        // Test if target bucket exists
        const bucketExists = await client.bucketExists(minioConfig.bucketName);
        console.log(`📁 Bucket "${minioConfig.bucketName}" exists:`, bucketExists);

        if (!bucketExists) {
            console.log(`🔄 Creating bucket "${minioConfig.bucketName}"...`);
            await client.makeBucket(minioConfig.bucketName, 'us-east-1');
            console.log(`✅ Bucket "${minioConfig.bucketName}" created successfully!`);
        }

        console.log('🎉 MinIO setup is working correctly!');
    } catch (error) {
        console.error('❌ MinIO connection failed:', error.message);
        console.error('Full error:', error);
    }
}

testMinIOConnection();