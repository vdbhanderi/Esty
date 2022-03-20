require('dotenv').config()
const fs=require('fs')
const S3=require('aws-sdk/clients/s3')
const bucketName=process.env.AWS_BUCKET_NAME
const region=process.env.AWS_BUCKET_REGION
const accessKey=process.env.AWS_ACCESS_KEY
const secreatKey=process.env.AWS_SECRET_KEY
AWS_BUCKET_REGION="us-east-1"
AWS_ACCESS_KEY="AKIA4SYTREPCOFKXJ2MY"
AWS_SECRET_KEY="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"

const s3=new S3({
    region,
    accessKey,
    secreatKey

})
function uploadFile(file){
    const fileStream=fs.createReadStream(file.path)
    const uploadParams={
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}
function downloadFile(key){
    console.log("inside download")
    const downloadParams={
        Bucket: bucketName,
        Key: key
    }
    return s3.getObject(downloadParams).createReadStream()
}
exports.uploadFile=uploadFile
exports.downloadFile=downloadFile