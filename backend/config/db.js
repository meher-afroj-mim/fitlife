import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitlife';
    
    // If using MongoDB Atlas, ensure database name is properly set
    if (mongoUri.includes('mongodb+srv://')) {
      // Check if database name exists (format: ...host/dbname?options or ...host/dbname)
      // Look for pattern: @host/ followed by something that's not ? or /
      const dbNamePattern = /@[^/]+\/([^/?]+)/;
      const hasDbName = dbNamePattern.test(mongoUri);
      
      if (!hasDbName) {
        // Split the URI at the query string
        const [baseUri, queryString] = mongoUri.split('?');
        
        // Remove trailing slash from base URI if present
        const cleanBase = baseUri.replace(/\/$/, '');
        
        // Construct new URI with database name
        if (queryString) {
          mongoUri = `${cleanBase}/fitlife?${queryString}`;
        } else {
          mongoUri = `${cleanBase}/fitlife`;
        }
      }
    }
    
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

