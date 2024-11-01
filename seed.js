const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  
    const user1 = await prisma.user.create({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          password: '123123', // Make sure to hash passwords in production
          image: 'https://example.com/image1.jpg',
          userInfo: {
            create: {
              email: 'john@example.com',
              streetAddress: '123 Main St',
              postalCode: '12345',
              city: 'Anytown',
              country: 'USA',
              phone: '555-123-4567',
              admin: false,
            },
          },
        },
      });
    
      const user2 = await prisma.user.create({
        data: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'anothersecurepassword', // Make sure to hash passwords in production
          image: 'https://example.com/image2.jpg',
          userInfo: {
            create: {
              email: 'jane@example.com',
              streetAddress: '456 Side St',
              postalCode: '67890',
              city: 'Othertown',
              country: 'Canada',
              phone: '555-987-6543',
              admin: true,
            },
          },
        },
      });
    


  const user3 = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'alicepassword', // Make sure to hash passwords in production
      image: 'https://example.com/image3.jpg',
      userInfo: {
        create: {
          email: 'alice@example.com',
          streetAddress: '789 Elm St',
          postalCode: '13579',
          city: 'Smalltown',
          country: 'UK',
          phone: '555-321-4567',
          admin: false,
        },
      },
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Bob Brown',
      email: 'bob@example.com',
      password: 'bobspassword', // Make sure to hash passwords in production
      image: 'https://example.com/image4.jpg',
      userInfo: {
        create: {
          email: 'bob@example.com',
          streetAddress: '101 Pine St',
          postalCode: '24680',
          city: 'Largetown',
          country: 'Australia',
          phone: '555-654-3210',
          admin: true,
        },
      },
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: 'Charlie Black',
      email: 'charlie@example.com',
      password: 'charliepassword', // Make sure to hash passwords in production
      image: 'https://example.com/image5.jpg',
      userInfo: {
        create: {
          email: 'charlie@example.com',
          streetAddress: '102 Oak St',
          postalCode: '86420',
          city: 'Midtown',
          country: 'USA',
          phone: '555-111-2222',
          admin: false,
        },
      },
    },
  });

  const user6 = await prisma.user.create({
    data: {
      name: 'Diana Prince',
      email: 'diana@example.com',
      password: 'dianapassword', // Make sure to hash passwords in production
      image: 'https://example.com/image6.jpg',
      userInfo: {
        create: {
          email: 'diana@example.com',
          streetAddress: '202 Maple St',
          postalCode: '54321',
          city: 'Downtown',
          country: 'Canada',
          phone: '555-222-3333',
          admin: true,
        },
      },
    },
  });

  const user7 = await prisma.user.create({
    data: {
      name: 'Edward Elric',
      email: 'edward@example.com',
      password: 'edwardpassword', // Make sure to hash passwords in production
      image: 'https://example.com/image7.jpg',
      userInfo: {
        create: {
          email: 'edward@example.com',
          streetAddress: '303 Birch St',
          postalCode: '98765',
          city: 'Easttown',
          country: 'UK',
          phone: '555-333-4444',
          admin: false,
        },
      },
    },
  });

  console.log({ user3, user4, user5, user6, user7 });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
