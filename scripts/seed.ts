import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { hashPassword } from 'better-auth/crypto';
import { nanoid } from 'nanoid';
import * as schema from '../db/schema';

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log('Seeding database...');

  // Create admin user
  const adminId = nanoid(21);
  const accountId = nanoid(36);
  const hashedPassword = await hashPassword('admin123');

  try {
    // Check if admin exists
    const existingUsers = await db.select().from(schema.users).limit(1);
    if (existingUsers.length > 0) {
      console.log('Admin user already exists, skipping...');
      return;
    }

    // Insert admin user
    await db.insert(schema.users).values({
      id: adminId,
      email: 'admin@example.com',
      name: 'Admin',
      role: 'admin',
      emailVerified: true,
    });

    // Insert account with password
    await db.insert(schema.accounts).values({
      id: accountId,
      userId: adminId,
      accountId: adminId,
      providerId: 'credential',
      password: hashedPassword,
    });

    console.log('Created admin user:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');

    // Create sample contact
    await db.insert(schema.contacts).values({
      slug: 'alex-morgan',
      nameEn: 'Alex Morgan',
      positionEn: 'Sales Director',
      location: 'Downtown Office, Dubai, UAE',
      phone: '+971 50 123 4567',
      email: 'alex@yourcompany.com',
      website: 'yourcompany.com',
    });

    console.log('Created sample contact: Alex Morgan');
  } catch (error) {
    console.error('Error seeding:', error);
    throw error;
  }

  console.log('Done!');
}

seed();
